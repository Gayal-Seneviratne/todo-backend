import * as dotenv from 'dotenv';
import app from './app.js';
import { AppDataSource } from './config/data-source.js';
import mysql from 'mysql2/promise';


dotenv.config({ quiet: true });

const port = process.env.PORT || 4000;

async function ensureDatabaseExists(): Promise<void> {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USERNAME || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'todo_db';

  let conn;
  try {
    conn = await mysql.createConnection({ host, port, user, password });
    
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    console.log(`Database ensured: ${database}`);
  } catch (err) {
    console.error('Error ensuring database exists:', err);
    
    throw err;
  } finally {
    if (conn) {
      try { await conn.end(); } catch {}
    }
  }
}

(async () => {
  try {
    await ensureDatabaseExists();
  } catch (err) {
    console.warn('Proceeding despite error creating database. You may need to create it manually.');
  }

  AppDataSource.initialize()
    .then(() => {
      console.log('Data source initialized');
    })
    .catch((err) => {
      console.error('Failed to initialize data source:', err);      
    })
    .finally(() => {
      app.listen(port, () => {
        console.log(`API listening at http://localhost:${port}`);
      });
    });
})();
