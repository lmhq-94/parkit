import { PrismaClient } from '@parkit/database';
import { Request } from 'express';
import { AuthService, JWTPayload } from './utils/auth';
import { logger } from './utils/logger';
import { PermissionService } from './utils/permissions';

const prisma = new PrismaClient();

interface ContextParams {
  req: Request;
}

export interface Context {
  user: JWTPayload | null;
  prisma: PrismaClient;
  hasPermission: (resource: string, action: string) => boolean;
  checkPermission: (resource: string, action: string) => void;
}

export async function context({ req }: ContextParams): Promise<Context> {
  const startTime = Date.now();

  try {
    // Extract token from authorization header
    const token = AuthService.extractTokenFromHeader(req.headers.authorization);
    let user: JWTPayload | null = null;

    if (token) {
      try {
        // Verify the JWT token
        user = AuthService.verifyAccessToken(token);

        // Log successful authentication
        logger.logAuth(user.userId, 'token_verification', true, {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
        });
      } catch (error) {
        logger.logAuth('unknown', 'token_verification', false, {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          error: (error as Error).message,
        });
      }
    }

    const duration = Date.now() - startTime;

    // Log request
    logger.logRequest(req, 'graphql_request', duration);

    return {
      user,
      prisma,
      hasPermission: (resource: string, action: string) => {
        if (!user) return false;
        return PermissionService.hasPermission(user.role, resource, action);
      },
      checkPermission: (resource: string, action: string) => {
        if (!user) throw new Error('Authentication required');
        PermissionService.checkPermission(user.role, resource, action);
      },
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.logRequest(req, 'graphql_request', duration, error as Error);
    throw error;
  }
}
