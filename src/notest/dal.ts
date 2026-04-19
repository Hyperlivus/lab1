import { Note } from '../types';
import { db } from '../db';


const dal = {
  async getAll(): Promise<Note[]> {
    const result = await db.query(
      'SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC'
    );
    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      created_at: row.created_at.toISOString(),
    }));
  },

  async findById(id: string): Promise<Note | undefined> {
    const result = await db.query(
      'SELECT id, title, content, created_at FROM notes WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return undefined;
    }
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      created_at: row.created_at.toISOString(),
    };
  },

  async create(title: string, content: string): Promise<Note> {
    const result = await db.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at',
      [title, content]
    );
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      created_at: row.created_at.toISOString(),
    };
  },
};


export default dal;