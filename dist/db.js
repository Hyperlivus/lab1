"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
const pool = new pg_1.Pool(config_1.dbConfig);
exports.db = {
    async connect() {
        const client = await pool.connect();
        try {
            await client.query('SELECT NOW()');
        }
        finally {
            client.release();
        }
    },
    async disconnect() {
        await pool.end();
    },
    query(sql, values) {
        return pool.query(sql, values);
    },
};
