import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service.js';
import { TaskServiceImpl } from '../services/impl/task.service.impl.js';
import { CreateTaskSchema } from '../validations/task.schema.js';
import { CreateTaskDto } from '../dtos/create-task.dto.js';


const taskService:TaskService  = new TaskServiceImpl();

export class TaskController { 
  
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
        const parsed = CreateTaskSchema.parse(req.body);
        const createTaskDto = new CreateTaskDto(parsed.title, parsed.description);
        const task = await taskService.createTask(createTaskDto);

        res.status(201).json({ data: task });
        } catch (err) {
            next(err);
        }
    }  

    static async listRecent(req: Request, res: Response, next: NextFunction) {
        try {
        const limit = Number(req.query.limit || 5);
        const tasks = await taskService.listRecentTasks(limit);
        res.json({ data: tasks });
        } catch (err) { next(err); }
    }
}
