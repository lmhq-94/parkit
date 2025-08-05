import winston from 'winston';
import { config } from '../config';

// Configurar colores para los niveles de log
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Formato personalizado para los logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Formato para archivos (sin colores)
const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Configurar transportes
const transports: winston.transport[] = [
  // Consola
  new winston.transports.Console({
    format: logFormat,
    level: config.development.debug ? 'debug' : 'info',
  }),
];

// Agregar transporte de archivo en producción
if (config.app.isProduction) {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileLogFormat,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: fileLogFormat,
    }),
  );
}

// Crear logger
export const logger = winston.createLogger({
  level: config.monitoring.logLevel,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'parkit-backend' },
  transports,
  // No salir en caso de error
  exitOnError: false,
});

// Crear stream para Morgan
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Función helper para logging estructurado
export const logStructured = {
  info: (message: string, meta?: any) => {
    logger.info(message, meta);
  },
  error: (message: string, error?: any) => {
    logger.error(message, { error: error?.stack || error });
  },
  warn: (message: string, meta?: any) => {
    logger.warn(message, meta);
  },
  debug: (message: string, meta?: any) => {
    logger.debug(message, meta);
  },
  http: (message: string, meta?: any) => {
    logger.http(message, meta);
  },
};

// Función para logging de requests
export const logRequest = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id,
    };

    if (res.statusCode >= 400) {
      logger.warn('HTTP Request', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });

  next();
};

// Función para logging de errores
export const logError = (error: any, req?: any) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    code: error.code,
    url: req?.originalUrl,
    method: req?.method,
    userId: req?.user?.id,
    ip: req?.ip,
  };

  logger.error('Application Error', errorData);
};

export default logger; 