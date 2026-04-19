"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const dal = {
    async getAll() {
        const result = await db_1.db.query('SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC');
        return result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            content: row.content,
            created_at: row.created_at.toISOString(),
        }));
    },
    async findById(id) {
        const result = await db_1.db.query('SELECT id, title, content, created_at FROM notes WHERE id = $1', [id]);
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
    async create(title, content) {
        const result = await db_1.db.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at', [title, content]);
        const row = result.rows[0];
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            created_at: row.created_at.toISOString(),
        };
    },
};
exports.default = dal;
