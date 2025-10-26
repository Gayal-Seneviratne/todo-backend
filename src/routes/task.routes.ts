import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';

const router = Router();

router.post('/', TaskController.create); // POST /api/tasks

export { router as default };
