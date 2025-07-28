import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);

  // Handle GraphQL errors
  if (error.message.includes('GraphQL')) {
    return res.status(400).json({
      error: 'GraphQL Error',
      message: error.message
    });
  }

  // Handle authentication errors
  if (error.message.includes('Not authenticated')) {
    return res.status(401).json({
      error: 'Authentication Error',
      message: 'Not authenticated'
    });
  }

  // Handle authorization errors
  if (error.message.includes('Insufficient permissions')) {
    return res.status(403).json({
      error: 'Authorization Error',
      message: 'Insufficient permissions'
    });
  }

  // Default error
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
} 