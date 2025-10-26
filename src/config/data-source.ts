import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../entities/Task.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ quiet: true });

const currentDirname = path.join(process.cwd(), 'src/config');

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
  migrations: [currentDirname + '/../migrations/*.ts'],
});


