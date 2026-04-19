import { Pool } from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';

// Import config from src
import '../src/config';
import { dbConfig } from '../src/config';

const pool = new Pool(dbConfig);

interface Migration {
  name: string;
  up(query: (sql: string, values?: unknown[]) => Promise<any>): Promise<void>;
  down(query: (sql: string, values?: unknown[]) => Promise<any>): Promise<void>;
}

async function runMigrations(): Promise<void> {
  const client = await pool.connect();

  try {
    console.log('Starting migrations...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const migrationsDir = path.join(process.cwd(), 'migrations');
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files
      .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
      .sort();

    for (const file of migrationFiles) {
      const result = await client.query('SELECT name FROM schema_migrations WHERE name = $1', [file]);

      if (result.rows.length === 0) {
        console.log(`Executing migration: ${file}`);

        try {
          const migrationModule = await import(path.join(migrationsDir, file));
          const migration: Migration = migrationModule.migration;

          const queryWrapper = (sql: string, values?: unknown[]) => client.query(sql, values);

          await migration.up(queryWrapper);
          await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
          console.log(`✓ Migration ${file} completed`);
        } catch (error) {
          console.error(`✗ Migration ${file} failed:`, error);
          throw error;
        }
      } else {
        console.log(`⊘ Migration ${file} already executed`);
      }
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}
