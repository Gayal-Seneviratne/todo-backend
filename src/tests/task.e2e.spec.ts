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

    it('GET /api/tasks should list recent tasks (pending)', async () => {
      const res = await request(app).get('/api/tasks?limit=5');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });


    it('PATCH /api/tasks/:id/done should mark task as done', async () => {
      const res = await request(app).patch(`/api/tasks/${createdId}/done`).send();
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('DONE');
    });
});
