import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../entities/Task.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ quiet: true });

// Resolve the directory of this module both in TS (src) and compiled JS (dist)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_db',
  entities: [Task],
  synchronize: false,
  logging: false,
  // Support running migrations from TS in dev and JS in production
  migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
});


