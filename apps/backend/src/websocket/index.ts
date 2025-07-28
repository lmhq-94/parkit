import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { AuthService } from '../utils/auth';
import { logger } from '../utils/logger';

export function createWebSocketServer(httpServer: any, schema: any) {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer(
    {
      schema,
      onConnect: async ctx => {
        logger.info('WebSocket client connected', {
          connectionParams: ctx.connectionParams,
        });
      },
      onSubscribe: async (ctx, msg) => {
        // Authenticate subscription requests
        const token = ctx.connectionParams?.authorization as string;
        if (token) {
          try {
            const payload = AuthService.verifyAccessToken(token);
            (ctx.extra as any).user = payload;
            logger.info('WebSocket subscription authenticated', {
              userId: payload.userId,
            });
          } catch (error) {
            logger.warn('WebSocket authentication failed', {
              error: (error as Error).message,
            });
            throw new Error('Authentication failed');
          }
        }
      },
      onNext: async (ctx, msg, args, result) => {
        logger.debug('WebSocket message sent', {
          operationId: (msg as any).payload?.id,
        });
      },
      onError: async (ctx, msg, errors) => {
        logger.error(
          'WebSocket error: ' + errors.map((e: any) => e.message).join(', ')
        );
      },
      onComplete: async (ctx, msg) => {
        logger.debug('WebSocket operation completed', {
          operationId: (msg as any).payload?.id,
        });
      },
    },
    wsServer
  );

  logger.info('WebSocket server started');
  return wsServer;
}
