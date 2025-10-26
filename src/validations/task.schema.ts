import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
