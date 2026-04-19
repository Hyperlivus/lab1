"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.dbConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const CONFIG_PATH = '/etc/mywebapp/config.env';
const LOCAL_CONFIG_PATH = node_path_1.default.join(process.cwd(), 'etc', 'mywebapp', 'config.env');
dotenv_1.default.config({ path: CONFIG_PATH });
if (!process.env.DB_HOST) {
    dotenv_1.default.config({ path: LOCAL_CONFIG_PATH });
}
exports.dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'notes_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
};
exports.appConfig = {
    port: Number(process.env.PORT || '8080'),
};
