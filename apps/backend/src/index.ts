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
import { errorHandler } from './middleware/errorHandler';
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
    // Crear aplicación Express
    const app = express();
    const httpServer = createServer(app);

    // Configurar middleware de seguridad
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

    // Configurar CORS
    app.use(cors({
      origin: config.corsOrigins,
      credentials: true,
    }));

    // Configurar compresión
    app.use(compression() as any);

    // Configurar rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 requests por ventana
      message: 'Demasiadas requests desde esta IP',
      standardHeaders: true,
      legacyHeaders: false,
    });
    app.use('/api/', limiter);

    // Configurar parsing de JSON
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Middleware de logging
    app.use(requestLogger);

    // Crear schema GraphQL
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    // Crear Apollo Server
    const server = new ApolloServer<Context>({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            logger.info('🚀 Apollo Server iniciando...');
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

    // Iniciar Apollo Server
    await server.start();

    // Configurar middleware de GraphQL
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

    // TODO: Agregar WebSocket para GraphQL subscriptions cuando se resuelvan los problemas de tipos
    // const wsServer = new WebSocketServer({
    //   server: httpServer,
    //   path: '/graphql',
    // });

    // Rutas de salud
    app.get('/health', (_req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      });
    });

    // Rutas de autenticación
    app.use('/api/auth', require('./controllers/AuthController').default);
    app.use('/api/users', require('./controllers/UserController').default);
    app.use('/api/parkings', require('./controllers/ParkingController').default);
    app.use('/api/reservations', require('./controllers/ReservationController').default);
    app.use('/api/payments', require('./controllers/PaymentController').default);

    // Middleware de autenticación para rutas protegidas
    app.use('/api/protected', authMiddleware);

    // Middleware de manejo de errores
    app.use(errorHandler);

    // Iniciar servidor
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
      logger.info(`🚀 Servidor iniciado en puerto ${PORT}`);
      logger.info(`📊 GraphQL Playground: http://localhost:${PORT}/graphql`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
    });

    // Manejo de señales de terminación
    process.on('SIGTERM', async () => {
      logger.info('🛑 Recibida señal SIGTERM, cerrando servidor...');
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('🛑 Recibida señal SIGINT, cerrando servidor...');
      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    logger.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
}

// Iniciar servidor
startServer(); 