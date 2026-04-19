import dotenv from 'dotenv';
import path from 'node:path';

const CONFIG_PATH = '/etc/mywebapp/config.env';
const LOCAL_CONFIG_PATH = path.join(process.cwd(), 'etc', 'mywebapp', 'config.env');

dotenv.config({ path: CONFIG_PATH });
if (!process.env.DB_HOST) {
  dotenv.config({ path: LOCAL_CONFIG_PATH });
}

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'notes_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

export const appConfig = {
  port: Number(process.env.PORT || '8080'),
};
