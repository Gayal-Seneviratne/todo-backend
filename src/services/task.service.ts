import { TaskStatus } from '@enum/task-status.enum.js';
import { CreateTaskDto } from '../dtos/create-task.dto.js';
import { Task } from '../entities/Task.js';

export interface TaskService {
  createTask(data: CreateTaskDto): Promise<Task>;  
  listRecentTasks(limit: number, status?: TaskStatus): Promise<Task[]>;
  markDone(id: string): Promise<Task>;
}
