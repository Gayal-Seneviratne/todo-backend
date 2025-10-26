import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source.js';
import { Task } from '../../entities/Task.js';
import { TaskRepository } from '../task.repository.js';
import { CreateTaskDto } from '../../dtos/create-task.dto.js';


export class TaskRepositoryImpl implements TaskRepository {
    private repo: Repository<Task>;

    constructor() {
        this.repo = AppDataSource.getRepository(Task);
    }

    async create(data: CreateTaskDto): Promise<Task> {
        let task = new Task();
        task.title = data.title;
        task.description = data.description;
        
        return await this.repo.save(task);
    } 
}
