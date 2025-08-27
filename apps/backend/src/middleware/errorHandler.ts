import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { AppError, isAppError, InternalServerError } from '@parkit/types/errors';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error no manejado:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
  });

  // Si es un error de la aplicación, usar su información
  if (isAppError(error)) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
      details: error.details,
      timestamp: error.timestamp,
      path: req.url,
    });
  }

  // Si es un error de Prisma
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      success: false,
      message: 'Error en la base de datos',
      code: 'DATABASE_ERROR',
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }

  if (error.name === 'PrismaClientValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación en la base de datos',
      code: 'DATABASE_VALIDATION_ERROR',
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }

  // Error interno del servidor por defecto
  const internalError = new InternalServerError('Error interno del servidor');
  return res.status(500).json({
    success: false,
    message: internalError.message,
    code: internalError.code,
    timestamp: internalError.timestamp,
    path: req.url,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    code: 'ENDPOINT_NOT_FOUND',
    timestamp: new Date().toISOString(),
    path: req.url,
  });
}; 