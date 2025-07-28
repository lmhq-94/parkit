import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { apiRateLimiter, authRateLimiter } from './middleware/rateLimit';
import { logger } from './utils/logger';
import { createWebSocketServer } from './websocket';

import { context } from './context';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error: any) => {
      logger.error('GraphQL Error', error);
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    },
  });

  // Start Apollo Server
  await server.start();

  // Create WebSocket server for subscriptions
  createWebSocketServer(httpServer, { typeDefs, resolvers });

  // Middleware
  app.use(cors());
  app.use(json());
  app.use(authMiddleware);

  // Rate limiting
  app.use('/graphql', apiRateLimiter);
  app.use('/auth', authRateLimiter);

  // GraphQL endpoint
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }: { req: any }) => await context({ req }),
    })
  );

  // File upload endpoint
  app.use('/uploads', express.static('uploads'));

  // Health check endpoint
  app.get('/health', (req: any, res: any) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  });

  // Error handling
  app.use(errorHandler);

  // Start server
  httpServer.listen(PORT, () => {
    logger.info(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    logger.info(`🏥 Health check at http://localhost:${PORT}/health`);
    logger.info(`📡 WebSocket ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
