import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Importar configuraciones
import { config } from './config';
import { logger } from './utils/logger';

// Importar middleware
import { authMiddleware } from './middleware/auth';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

// Importar GraphQL
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';

// Importar servicios
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { ParkingService } from './services/ParkingService';
import { ReservationService } from './services/ReservationService';
import { PaymentService } from './services/PaymentService';
import { NotificationService } from './services/NotificationService';

// Configurar variables de entorno
dotenv.config();

// Inicializar Prisma
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Inicializar servicios
export const authService = new AuthService();
export const userService = new UserService();
export const parkingService = new ParkingService();
export const reservationService = new ReservationService();
export const paymentService = new PaymentService();
export const notificationService = new NotificationService();

// Definir tipos para el contexto
interface Context {
  user?: any;
  prisma: PrismaClient;
  services: {
    auth: AuthService;
    user: UserService;
    parking: ParkingService;
    reservation: ReservationService;
    payment: PaymentService;
    notification: NotificationService;
  };
}

async function startServer() {
  try {
    // Create Express application
    const app = express();
    const httpServer = createServer(app);

    // Configure security middleware
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // Configure CORS
    app.use(cors({
      origin: config.corsOrigins,
      credentials: true,
    }));

    // Configure compression
    app.use(compression() as any);

    // Configure rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // maximum 100 requests per window
      message: 'Too many requests from this IP',
      standardHeaders: true,
      legacyHeaders: false,
    });
    app.use('/api/', limiter);

    // Configure JSON parsing
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging middleware
    app.use(requestLogger);

    // Create GraphQL schema
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    // Create Apollo Server
    const server = new ApolloServer<Context>({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            logger.info('🚀 Apollo Server starting...');
          },
        },
      ],
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        };
      },
    });

    // Start Apollo Server
    await server.start();

    // Configure GraphQL middleware
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }): Promise<Context> => {
          const token = req.headers.authorization?.replace('Bearer ', '');
          const user = token ? await authService.verifyToken(token) : null;
          
          return {
            user,
            prisma,
            services: {
              auth: authService,
              user: userService,
              parking: parkingService,
              reservation: reservationService,
              payment: paymentService,
              notification: notificationService,
            },
          };
        },
      })
    );

    // TODO: Add WebSocket for GraphQL subscriptions when type issues are resolved
    // const wsServer = new WebSocketServer({
    //   server: httpServer,
    //   path: '/graphql',
    // });

    // Health routes
    app.get('/health', (_req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      });
    });

    // Authentication routes
    app.use('/api/auth', require('./controllers/AuthController').default);
    app.use('/api/users', require('./controllers/UserController').default);
    app.use('/api/parkings', require('./controllers/ParkingController').default);
    app.use('/api/reservations', require('./controllers/ReservationController').default);
    app.use('/api/payments', require('./controllers/PaymentController').default);

    // Authentication middleware for protected routes
    app.use('/api/protected', authMiddleware);

    // 404 handler - must be before error handler
    app.use(notFoundHandler);

    // Error handling middleware - must be last
    app.use(errorHandler);

    // Start server
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server started on port ${PORT}`);
      logger.info(`📊 GraphQL Playground: http://localhost:${PORT}/graphql`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', async () => {
      logger.info('🛑 Received SIGTERM signal, shutting down server...');
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('🛑 Received SIGINT signal, shutting down server...');
      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    logger.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

// Start server
startServer(); 