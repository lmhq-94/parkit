import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Interfaz para información de la request
interface RequestInfo {
  method: string;
  url: string;
  statusCode: number;
  duration: number;
  userAgent?: string;
  ip?: string;
  userId?: string;
  timestamp: string;
}

// Middleware de logging de requests
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  // Capturar información de la request
  const requestInfo: Partial<RequestInfo> = {
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  };

  // Agregar propiedades opcionales solo si existen
  const userAgent = req.get('User-Agent');
  if (userAgent) {
    requestInfo.userAgent = userAgent;
  }

  const ip = req.ip || req.connection.remoteAddress;
  if (ip) {
    requestInfo.ip = ip;
  }

  const userId = (req as any).user?.id;
  if (userId) {
    requestInfo.userId = userId;
  }

  // Log de inicio de request
  logger.info('Request iniciada', requestInfo);

  // Interceptar el final de la response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const responseInfo: RequestInfo = {
      ...requestInfo,
      statusCode: res.statusCode,
      duration,
    } as RequestInfo;

    // Log basado en el código de estado
    if (res.statusCode >= 400) {
      logger.warn('Request completada con error', responseInfo);
    } else {
      logger.info('Request completada exitosamente', responseInfo);
    }
  });

  next();
};

// Middleware para logging de errores específicos
export const errorLogger = (error: Error, req: Request, _res: Response, next: NextFunction): void => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    url: req.originalUrl,
    method: req.method,
    userId: (req as any).user?.id,
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString(),
  };

  logger.error('Error en request', errorInfo);
  next(error);
};

// Middleware para logging de requests lentas
export const slowRequestLogger = (thresholdMs: number = 1000) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      
      if (duration > thresholdMs) {
        const slowRequestInfo: Partial<RequestInfo> = {
          method: req.method,
          url: req.originalUrl,
          statusCode: res.statusCode,
          duration,
          timestamp: new Date().toISOString(),
        };

        const userAgent = req.get('User-Agent');
        if (userAgent) {
          slowRequestInfo.userAgent = userAgent;
        }

        const ip = req.ip || req.connection.remoteAddress;
        if (ip) {
          slowRequestInfo.ip = ip;
        }

        const userId = (req as any).user?.id;
        if (userId) {
          slowRequestInfo.userId = userId;
        }

        logger.warn('Request lenta detectada', slowRequestInfo);
      }
    });

    next();
  };
};

// Middleware para logging de requests de autenticación
export const authRequestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  const authInfo = {
    method: req.method,
    url: req.originalUrl,
    hasAuthHeader: !!req.headers.authorization,
    authType: req.headers.authorization?.split(' ')[0] || 'none',
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString(),
  };

  logger.info('Request de autenticación', authInfo);
  next();
};

// Middleware para logging de requests de API
export const apiRequestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  const apiInfo = {
    method: req.method,
    url: req.originalUrl,
    contentType: req.get('Content-Type'),
    accept: req.get('Accept'),
    ip: req.ip || req.connection.remoteAddress,
    userId: (req as any).user?.id,
    timestamp: new Date().toISOString(),
  };

  logger.info('Request de API', apiInfo);
  next();
};

// Función helper para crear logs estructurados
export const createRequestLog = {
  info: (message: string, req: Request, meta?: any) => {
    const logData = {
      message,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.connection.remoteAddress,
      userId: (req as any).user?.id,
      ...meta,
    };
    logger.info(logData);
  },
  
  warn: (message: string, req: Request, meta?: any) => {
    const logData = {
      message,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.connection.remoteAddress,
      userId: (req as any).user?.id,
      ...meta,
    };
    logger.warn(logData);
  },
  
  error: (message: string, req: Request, error?: any) => {
    const logData = {
      message,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.connection.remoteAddress,
      userId: (req as any).user?.id,
      error: error?.stack || error,
    };
    logger.error(logData);
  },
}; 