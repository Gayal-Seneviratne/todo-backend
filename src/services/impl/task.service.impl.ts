import { Task } from '../../entities/Task.js';
import { CreateTaskDto } from '../../dtos/create-task.dto.js';
import { TaskRepository } from '../../repositories/task.repository.js';
import { TaskRepositoryImpl } from '../../repositories/impl/task.repository.impl.js';
import { TaskService } from '../task.service.js';
import { TaskStatus } from '../../enum/task-status.enum.js';


export class TaskServiceImpl implements TaskService {
    private repo:TaskRepository;

    constructor() {
        this.repo = new TaskRepositoryImpl(); 
    }  

    async createTask(data: CreateTaskDto): Promise<Task> {
        return await this.repo.create(data);
    }  

    async listRecentTasks(limit: number, status: TaskStatus = TaskStatus.PENDING): Promise<Task[]> {
        return await this.repo.listRecent(limit, status);
    }
}
