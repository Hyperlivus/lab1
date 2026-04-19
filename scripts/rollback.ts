import { Pool } from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';

import '../src/config';
import { dbConfig } from '../src/config';

const pool = new Pool(dbConfig);

interface Migration {
  name: string;
  up(query: (sql: string, values?: unknown[]) => Promise<any>): Promise<void>;
  down(query: (sql: string, values?: unknown[]) => Promise<any>): Promise<void>;
}

async function rollbackAllMigrations(): Promise<void> {
  const client = await pool.connect();

  try {
    console.log('Starting rollback of all migrations...');
    const tableCheckResult = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'schema_migrations'
      )
    `);

    if (!tableCheckResult.rows[0].exists) {
      console.log('⊘ No schema_migrations table found. Nothing to rollback.');
      return;
    }

    const result = await client.query(
      'SELECT name FROM schema_migrations ORDER BY id DESC'
    );

    if (result.rows.length === 0) {
      console.log('⊘ No migrations have been executed. Nothing to rollback.');
      return;
    }

    const migrationsDir = path.join(process.cwd(), 'migrations');
    const executedMigrations = result.rows.map((row) => row.name);

    for (const migrationName of executedMigrations) {
      console.log(`Rolling back: ${migrationName}`);

      try {
        const migrationModule = await import(path.join(migrationsDir, migrationName));
        const migration: Migration = migrationModule.migration;

        const queryWrapper = (sql: string, values?: unknown[]) => client.query(sql, values);

        await migration.down(queryWrapper);
        await client.query('DELETE FROM schema_migrations WHERE name = $1', [migrationName]);
        console.log(`✓ Rollback ${migrationName} completed`);
      } catch (error) {
        console.error(`✗ Rollback ${migrationName} failed:`, error);
        throw error;
      }
    }

    console.log('All migrations have been rolled back successfully');
  } catch (error) {
    console.error('Rollback failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

