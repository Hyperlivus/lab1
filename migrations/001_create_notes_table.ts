import { QueryResult } from 'pg';

export interface Migration {
  name: string;
  up(query: (sql: string, values?: unknown[]) => Promise<QueryResult>): Promise<void>;
  down(query: (sql: string, values?: unknown[]) => Promise<QueryResult>): Promise<void>;
}

export const migration: Migration = {
  name: '001_create_notes_table.ts',

  async up(query) {
    await query(`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(64) NOT NULL,
        content VARCHAR(10000) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  },

  async down(query) {
    await query('DROP TABLE IF EXISTS notes');
  },
};
