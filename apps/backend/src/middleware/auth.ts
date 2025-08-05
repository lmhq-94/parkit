import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from '../utils/logger';
import { prisma } from '../index';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Tipos para el token JWT
interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  companyId?: string;
  iat: number;
  exp: number;
}

// Middleware de autenticación
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Token de acceso requerido',
        code: 'TOKEN_REQUIRED'
      });
      return;
    }

    const token = authHeader.substring(7); // Remover 'Bearer '

    // Verificar token
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
    
    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        company: true,
        role: true,
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Usuario no encontrado',
        code: 'USER_NOT_FOUND'
      });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Usuario inactivo',
        code: 'USER_INACTIVE'
      });
      return;
    }

    // Agregar usuario al request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      companyId: user.companyId,
      permissions: user.role.permissions,
    };

    next();
  } catch (error) {
    logger.error('Error en autenticación:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Token inválido',
        code: 'INVALID_TOKEN'
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token expirado',
        code: 'TOKEN_EXPIRED'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
    return;
  }
};

// Middleware para verificar roles específicos
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Permisos insuficientes',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
      return;
    }

    next();
  };
};

// Middleware para verificar permisos específicos
export const requirePermission = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = permissions.some(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      res.status(403).json({
        success: false,
        message: 'Permisos insuficientes',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
      return;
    }

    next();
  };
};

// Middleware para verificar propiedad del recurso
export const requireOwnership = (resourceType: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    const resourceId = req.params.id;
    
    if (!resourceId) {
      res.status(400).json({
        success: false,
        message: 'ID de recurso requerido',
        code: 'RESOURCE_ID_REQUIRED'
      });
      return;
    }
    
    try {
      let resource;
      
      switch (resourceType) {
        case 'reservation':
          resource = await prisma.reservation.findUnique({
            where: { id: resourceId },
            include: { user: true }
          });
          break;
        case 'vehicle':
          resource = await prisma.vehicle.findUnique({
            where: { id: resourceId },
            include: { user: true }
          });
          break;
        case 'payment':
          resource = await prisma.payment.findUnique({
            where: { id: resourceId },
            include: { user: true }
          });
          break;
        default:
          res.status(400).json({
            success: false,
            message: 'Tipo de recurso no válido',
            code: 'INVALID_RESOURCE_TYPE'
          });
          return;
      }

      if (!resource) {
        res.status(404).json({
          success: false,
          message: 'Recurso no encontrado',
          code: 'RESOURCE_NOT_FOUND'
        });
        return;
      }

      // Verificar si el usuario es propietario o admin
      if (resource.userId !== req.user.id && req.user.role !== 'ADMIN') {
        res.status(403).json({
          success: false,
          message: 'Acceso denegado',
          code: 'ACCESS_DENIED'
        });
        return;
      }

      next();
    } catch (error) {
      logger.error('Error verificando propiedad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        code: 'INTERNAL_ERROR'
      });
      return;
    }
  };
};

// Middleware opcional de autenticación
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        company: true,
        role: true,
      },
    });

    if (user && user.isActive) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role.name,
        companyId: user.companyId,
        permissions: user.role.permissions,
      };
    }

    next();
  } catch (error) {
    // En autenticación opcional, no fallamos si hay error
    next();
  }
};

// Función helper para generar tokens
export const generateTokens = (user: any) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role.name,
    companyId: user.companyId,
  };

  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);

  const refreshToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiresIn,
  } as jwt.SignOptions);

  return { accessToken, refreshToken };
};

// Función helper para verificar tokens
export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwt.secret) as JWTPayload;
}; 