import fs from 'node:fs/promises';
import path from 'node:path';

async function createMigration(name: string): Promise<void> {
  if (!name) {
    console.error('Error: Migration name is required');
    console.error('Usage: npm run create-migration <name>');
    process.exit(1);
  }

  // Get next migration number
  const migrationsDir = path.join(process.cwd(), 'migrations');
  const files = await fs.readdir(migrationsDir).catch(() => []);

  let nextNumber = 1;
  if (files.length > 0) {
    const numbers = files
      .map((f) => {
        const match = f.match(/^(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => n > 0);
    nextNumber = Math.max(...numbers) + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, '0');
  const fileName = `${paddedNumber}_${name}.ts`;
  const filePath = path.join(migrationsDir, fileName);

  const template = `import { QueryResult } from 'pg';

export interface Migration {
  name: string;
  up(query: (sql: string, values?: unknown[]) => Promise<QueryResult>): Promise<void>;
  down(query: (sql: string, values?: unknown[]) => Promise<QueryResult>): Promise<void>;
}

export const migration: Migration = {
  name: '${fileName}',

  async up(query) {
    // TODO: Implement up migration
    // Example:
    // await query(\`
    //   ALTER TABLE notes ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    // \`);
  },

  async down(query) {
    // TODO: Implement down migration
    // Example:
    // await query(\`
    //   ALTER TABLE notes DROP COLUMN updated_at;
    // \`);
  },
};
`;

  await fs.writeFile(filePath, template, 'utf-8');
  console.log(`✓ Migration created: ${filePath}`);
  console.log('Remember to implement up() and down() functions');
}

const migrationName = process.argv[2];
createMigration(migrationName)
  .catch((error) => {
    console.error('Error creating migration:', error);
    process.exit(1);
  });
