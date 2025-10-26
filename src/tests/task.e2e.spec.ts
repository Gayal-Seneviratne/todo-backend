import request from 'supertest';
import app from '../app.js';
import { AppDataSource } from '../config/data-source.js';

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe('Tasks API', () => {
    let createdId: string;

    it('POST /api/tasks should create a task', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'Test Task', description: 'Hello' });
      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
      createdId = res.body.data.id;
    });  
});
