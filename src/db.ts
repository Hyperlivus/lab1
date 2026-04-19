import { Pool, QueryResult } from 'pg';
import { dbConfig } from './config';

const pool = new Pool(dbConfig);

export const db = {
  async connect(): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('SELECT NOW()');
    } finally {
      client.release();
    }
  },

  async disconnect(): Promise<void> {
    await pool.end();
  },

  query(sql: string, values?: unknown[]): Promise<QueryResult> {
    return pool.query(sql, values);
  },
};
