// src/middlewares/error-handler.ts
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../errors/http-error.js';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const env = process.env.NODE_ENV ?? 'development';

  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      data: null,
      error: 'Validation failed',
      statusCode: 422,
      details: err.flatten(),
    });
  }
  
  if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in (err as any)) {
    return res.status(400).json({
      success: false,
      data: null,
      error: 'Invalid JSON payload',
      statusCode: 400,
    });
  }

  // Defaults
  let status = 500;
  let message = 'Internal Server Error';
  let details: any = undefined;

  // Our domain/business errors
  if (err instanceof HttpError) {
    status = err.status ?? 500;
    message = err.message || message;
    details = err.details;
  }

  // Common DB error (TypeORM)
  else if ((err as any)?.name === 'QueryFailedError') {
    status = 400;
    message = 'Database query failed';
    details = {
      code: (err as any).code,
      query: env !== 'production' ? (err as any).query : undefined,
    };
  }

  // Anything else
  else if (err instanceof Error) {
    message = err.message || message;
  }

  // Only expose stack in non-prod
  if (env !== 'production' && err instanceof Error) {
    details = { ...(details || {}), stack: err.stack };
  }

  return res.status(status).json({
    success: false,
    data: null,
    error: message,
    statusCode: status,
    details,
  });
}
