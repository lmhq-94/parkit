import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Configuración de la aplicación
  app: {
    name: process.env.APP_NAME || 'ParkIt Backend',
    version: process.env.APP_VERSION || '1.0.0',
    port: parseInt(process.env.PORT || '4000', 10),
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
  },

  // Configuración de la base de datos
  database: {
    url: process.env.DATABASE_URL || 'postgresql://parkit_user:parkit_password@localhost:5432/parkit_db',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    name: process.env.DATABASE_NAME || 'parkit_db',
    user: process.env.DATABASE_USER || 'parkit_user',
    password: process.env.DATABASE_PASSWORD || 'parkit_password',
  },

  // Configuración de Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
  },

  // Configuración de JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // Configuración de autenticación
  auth: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '3600000', 10), // 1 hora
  },

  // Configuración de correo electrónico
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@parkit.com',
  },

  // Configuración de SMS (Twilio)
  sms: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },

  // Configuración de pagos (Stripe)
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // Configuración de OAuth
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID || '',
      appSecret: process.env.FACEBOOK_APP_SECRET || '',
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || '',
      teamId: process.env.APPLE_TEAM_ID || '',
      privateKey: process.env.APPLE_PRIVATE_KEY || '',
    },
  },

  // Configuración de almacenamiento (AWS S3)
  storage: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || 'parkit-uploads',
  },

  // Configuración de monitoreo
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN || '',
    logLevel: process.env.LOG_LEVEL || 'info',
  },

  // Configuración de CORS
  corsOrigins: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8081', // Expo
  ],

  // Configuración de rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutos
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // Configuración de desarrollo
  development: {
    debug: process.env.DEBUG === 'true',
    logRequests: process.env.LOG_REQUESTS === 'true',
    enableSwagger: process.env.ENABLE_SWAGGER === 'true',
    enableGraphQLPlayground: process.env.ENABLE_GRAPHQL_PLAYGROUND === 'true',
  },
};

// Validar configuración requerida
export function validateConfig() {
  const requiredEnvVars = [
    'JWT_SECRET',
    'DATABASE_URL',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Variables de entorno requeridas faltantes: ${missingVars.join(', ')}`);
  }
}

// Exportar tipos
export type Config = typeof config; 