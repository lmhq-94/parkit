import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // This middleware is optional for GraphQL since we handle auth in the context
  // But it can be useful for REST endpoints if we add them later
  next();
} 