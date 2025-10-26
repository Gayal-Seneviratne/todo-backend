import { TaskStatus } from '@enum/task-status.enum.js';
import { Task } from '../entities/Task.js';
import { CreateTaskDto } from '@dtos/create-task.dto.js';

export interface TaskRepository {
  create(data: CreateTaskDto): Promise<Task>;  
  listRecent(limit: number, status?: TaskStatus): Promise<Task[]>;
  updateStatus(id: string, status: TaskStatus): Promise<Task | null>;
  findById(id: string): Promise<Task | null>;
}
