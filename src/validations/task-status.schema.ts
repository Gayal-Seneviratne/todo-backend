import { z } from 'zod';

export const UpdateTaskStatusSchema = z.object({
  status: z.enum(['PENDING', 'DONE'])
});

export type UpdateTaskStatus = z.infer<typeof UpdateTaskStatusSchema>;
