import { CreateTaskDto } from '../dtos/create-task.dto.js';
import { Task } from '../entities/Task.js';

export interface TaskService {
  createTask(data: CreateTaskDto): Promise<Task>;  
}
