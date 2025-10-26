import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';

const router = Router();

router.post('/', TaskController.create); // POST /api/tasks
router.get('/', TaskController.listRecent);          // GET /api/tasks?limit=5

export { router as default };
