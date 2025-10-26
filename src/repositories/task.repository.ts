import { Task } from '../entities/Task.js';

export interface TaskRepository {
  create(data: Pick<Task,'title'|'description'>): Promise<Task>;  
}
