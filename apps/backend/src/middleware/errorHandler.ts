import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';

// Interfaz para errores personalizados
interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
}

// Middleware de manejo de errores
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log del error
  logError(error, req);

  // Determinar el código de estado
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  // En desarrollo, incluir stack trace
  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorResponse: any = {
    success: false,
    message,
    code: error.code || 'INTERNAL_ERROR',
  };

  if (isDevelopment) {
    errorResponse.stack = error.stack;
  }

  // Responder con el error
  res.status(statusCode).json(errorResponse);
};

// Clase para errores operacionales
export class OperationalError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = 'OPERATIONAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Clase para errores de validación
export class ValidationError extends OperationalError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

// Clase para errores de autenticación
export class AuthenticationError extends OperationalError {
  constructor(message: string = 'Error de autenticación') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

// Clase para errores de autorización
export class AuthorizationError extends OperationalError {
  constructor(message: string = 'Error de autorización') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

// Clase para errores de recurso no encontrado
export class NotFoundError extends OperationalError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404, 'NOT_FOUND_ERROR');
  }
}

// Clase para errores de conflicto
export class ConflictError extends OperationalError {
  constructor(message: string = 'Conflicto de datos') {
    super(message, 409, 'CONFLICT_ERROR');
  }
}

// Clase para errores de límite de tasa
export class RateLimitError extends OperationalError {
  constructor(message: string = 'Demasiadas requests') {
    super(message, 429, 'RATE_LIMIT_ERROR');
  }
}

// Middleware para manejar errores de sintaxis JSON
export const jsonErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({
      success: false,
      message: 'JSON inválido',
      code: 'INVALID_JSON',
    });
    return;
  }
  next(error);
};

// Middleware para manejar errores de timeout
export const timeoutErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
    res.status(408).json({
      success: false,
      message: 'Timeout de la request',
      code: 'TIMEOUT_ERROR',
    });
    return;
  }
  next(error);
};

// Middleware para manejar errores de conexión
export const connectionErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    res.status(503).json({
      success: false,
      message: 'Servicio no disponible',
      code: 'SERVICE_UNAVAILABLE',
    });
    return;
  }
  next(error);
};

// Middleware para manejar errores de base de datos
export const databaseErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error.code === 'P2002') {
    res.status(409).json({
      success: false,
      message: 'Conflicto de datos únicos',
      code: 'UNIQUE_CONSTRAINT_VIOLATION',
    });
    return;
  }

  if (error.code === 'P2025') {
    res.status(404).json({
      success: false,
      message: 'Registro no encontrado',
      code: 'RECORD_NOT_FOUND',
    });
    return;
  }

  if (error.code?.startsWith('P')) {
    res.status(500).json({
      success: false,
      message: 'Error de base de datos',
      code: 'DATABASE_ERROR',
    });
    return;
  }

  next(error);
};

// Middleware para manejar rutas no encontradas
export const notFoundHandler = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    code: 'ROUTE_NOT_FOUND',
  });
};

// Middleware para manejar errores asíncronos
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Función helper para crear errores
export const createError = {
  validation: (message: string) => new ValidationError(message),
  authentication: (message?: string) => new AuthenticationError(message),
  authorization: (message?: string) => new AuthorizationError(message),
  notFound: (message?: string) => new NotFoundError(message),
  conflict: (message: string) => new ConflictError(message),
  rateLimit: (message?: string) => new RateLimitError(message),
  internal: (message?: string) => new OperationalError(message || 'Error interno del servidor', 500),
};

// Función helper para manejar errores de Prisma
export const handlePrismaError = (error: any) => {
  if (error.code === 'P2002') {
    const field = error.meta?.target?.[0] || 'campo';
    throw createError.conflict(`${field} ya existe`);
  }
  
  if (error.code === 'P2025') {
    throw createError.notFound('Registro no encontrado');
  }
  
  if (error.code === 'P2003') {
    throw createError.validation('Error de referencia externa');
  }
  
  throw createError.internal('Error de base de datos');
};

// Función helper para validar IDs
export const validateId = (id: string) => {
  if (!id || typeof id !== 'string' || id.length === 0) {
    throw createError.validation('ID inválido');
  }
  
  // Validar formato UUID si es necesario
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw createError.validation('Formato de ID inválido');
  }
  
  return id;
};

// Función helper para validar paginación
export const validatePagination = (page?: string, limit?: string) => {
  const pageNum = page ? parseInt(page, 10) : 1;
  const limitNum = limit ? parseInt(limit, 10) : 10;
  
  if (pageNum < 1) {
    throw createError.validation('Número de página debe ser mayor a 0');
  }
  
  if (limitNum < 1 || limitNum > 100) {
    throw createError.validation('Límite debe estar entre 1 y 100');
  }
  
  return { page: pageNum, limit: limitNum };
}; 