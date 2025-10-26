import { Task } from '../../entities/Task.js';
import { CreateTaskDto } from '../../dtos/create-task.dto.js';
import { TaskRepository } from '../../repositories/task.repository.js';
import { TaskRepositoryImpl } from '../../repositories/impl/task.repository.impl.js';
import { TaskService } from '../task.service.js';
import { TaskStatus } from '../../enum/task-status.enum.js';
import { HttpError } from 'errors/http-error.js';

export class TaskServiceImpl implements TaskService {
    private repo: TaskRepository;

    constructor() {
        this.repo = new TaskRepositoryImpl(); 
    }  

    async createTask(data: CreateTaskDto): Promise<Task> {
        try {
            return await this.repo.create(data);
        } catch (error) {
            throw new HttpError('Failed to create task', 500, error);
        }
    }  

    async listRecentTasks(limit: number, status: TaskStatus = TaskStatus.PENDING): Promise<Task[]> {
        try {
            return await this.repo.listRecent(limit, status);
        } catch (error) {
            throw new HttpError('Failed to list tasks', 500, error);
        }
    }

    async markDone(id: string): Promise<Task> {
        try {
            const updated = await this.repo.updateStatus(id, TaskStatus.DONE);

            if (!updated) {
                throw new HttpError('Task not found', 404);
            }

            return updated;
        } catch (error) {            
            if (!(error instanceof HttpError)) {
                throw new HttpError('Failed to mark task as done', 500, error);
            }
            throw error;
        }
    }
}