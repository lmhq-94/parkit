# 🚀 Backend Documentation - Parkit

## 📋 Overview

El backend de Parkit es una API GraphQL construida con Node.js, Express, Apollo Server y Prisma. Proporciona todas las funcionalidades necesarias para gestionar el sistema de parqueos.

## 🏗️ Architecture

### Stack Tecnológico
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + bcrypt
- **Real-time**: WebSockets (graphql-ws)
- **File Upload**: Multer
- **Validation**: Zod
- **Logging**: Custom structured logger
- **Rate Limiting**: Custom implementation

### Estructura de Directorios
```
apps/backend/
├── src/
│   ├── middleware/          # Middlewares de Express
│   ├── utils/              # Utilidades y servicios
│   ├── tests/              # Tests unitarios e integración
│   ├── websocket/          # Configuración WebSocket
│   ├── context.ts          # Contexto GraphQL
│   ├── resolvers.ts        # Resolvers GraphQL
│   ├── schema.ts           # Schema GraphQL
│   └── index.ts            # Punto de entrada
├── uploads/                # Archivos subidos
└── package.json
```

## 🔐 Authentication & Authorization

### JWT Implementation
- **Access Token**: 15 minutos de duración
- **Refresh Token**: 7 días de duración
- **Secrets**: Configurables via variables de entorno

### Role-Based Access Control (RBAC)
Roles implementados:
- **ADMIN**: Acceso completo al sistema
- **MANAGER**: Gestión de usuarios y operaciones
- **VALET**: Gestión de entradas/salidas y QR
- **EMPLOYEE**: Operaciones básicas
- **CLIENT**: Acceso limitado a sus datos

### Permissions System
Cada operación requiere permisos específicos:
```typescript
// Ejemplo de verificación de permisos
checkPermission('users', 'read');    // Verificar lectura de usuarios
checkPermission('parkings', 'create'); // Verificar creación de parqueos
```

## 📊 Database Schema

### Entidades Principales
- **Company**: Empresas que usan el sistema
- **User**: Usuarios con roles y permisos
- **Vehicle**: Vehículos registrados
- **Parking**: Espacios de parqueo
- **Reservation**: Reservas de parqueos
- **Event**: Registro de entradas/salidas
- **Payment**: Transacciones de pago
- **QRCode**: Códigos QR para acceso
- **Notification**: Sistema de notificaciones
- **Evidence**: Evidencias fotográficas

## 🔌 API Endpoints

### GraphQL
- **URL**: `http://localhost:4000/graphql`
- **WebSocket**: `ws://localhost:4000/graphql`
- **Playground**: Disponible en desarrollo

### REST Endpoints
- **Health Check**: `GET /health`
- **File Upload**: `POST /upload`
- **Static Files**: `GET /uploads/*`

## 📡 Real-time Features

### WebSocket Subscriptions
- **parkingStatusChanged**: Cambios de estado de parqueos
- **reservationCreated**: Nuevas reservas
- **reservationUpdated**: Actualizaciones de reservas
- **eventCreated**: Nuevos eventos
- **notificationCreated**: Nuevas notificaciones

## 📁 File Upload System

### Configuración
- **Max File Size**: 5MB
- **Allowed Types**: JPEG, PNG, GIF, WebP, PDF
- **Storage**: Local filesystem
- **Organization**: Por tipo de archivo

### Endpoints
```typescript
// Subir evidencia
POST /upload/evidence
// Subir avatar
POST /upload/avatar
// Subir QR code
POST /upload/qrcode
```

## 🛡️ Security Features

### Rate Limiting
- **API**: 100 requests/minute
- **Auth**: 5 attempts/15 minutes
- **Upload**: 10 files/minute

### Input Validation
- **GraphQL**: Validación automática de tipos
- **File Upload**: Validación de tipo y tamaño
- **Custom**: Validación con Zod

### Logging
- **Structured Logging**: JSON format
- **Request Logging**: Método, URL, duración
- **Auth Logging**: Intentos de autenticación
- **Database Logging**: Operaciones y duración

## 🧪 Testing

### Test Structure
```
tests/
├── setup.ts           # Configuración de tests
├── auth.test.ts       # Tests de autenticación
├── resolvers.test.ts  # Tests de resolvers
└── integration.test.ts # Tests de integración
```

### Running Tests
```bash
# Tests unitarios
yarn test

# Tests con coverage
yarn test --coverage

# Tests en modo watch
yarn test --watch
```

## 🚀 Deployment

### Environment Variables
```bash
# Required
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Optional
PORT=4000
NODE_ENV=production
LOG_LEVEL=info
BASE_URL=https://your-domain.com
```

### Production Checklist
- [ ] Cambiar secrets de JWT
- [ ] Configurar base de datos de producción
- [ ] Configurar logging apropiado
- [ ] Configurar rate limiting
- [ ] Configurar CORS
- [ ] Configurar SSL/TLS
- [ ] Configurar monitoreo

## 📈 Monitoring & Health

### Health Check
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 12345678,
    "heapTotal": 9876543,
    "heapUsed": 5432109
  }
}
```

### Metrics
- **Uptime**: Tiempo de funcionamiento
- **Memory Usage**: Uso de memoria
- **Request Count**: Número de requests
- **Error Rate**: Tasa de errores
- **Response Time**: Tiempo de respuesta

## 🔧 Development

### Setup Local
```bash
# Instalar dependencias
yarn install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones
yarn db:migrate

# Ejecutar seed
yarn db:seed

# Iniciar en desarrollo
yarn dev
```

### Scripts Disponibles
```bash
yarn dev          # Desarrollo con hot reload
yarn build        # Compilar TypeScript
yarn start        # Iniciar en producción
yarn test         # Ejecutar tests
yarn lint         # Linting
yarn format       # Formatear código
```

## 📚 API Examples

### Authentication
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      role
    }
  }
}
```

### Create Parking
```graphql
mutation CreateParking($input: CreateParkingInput!) {
  createParking(input: $input) {
    id
    name
    status
    hourlyRate
  }
}
```

### Subscribe to Events
```graphql
subscription ParkingStatusChanged($parkingId: ID!) {
  parkingStatusChanged(parkingId: $parkingId) {
    id
    status
    updatedAt
  }
}
```

## 🐛 Troubleshooting

### Common Issues
1. **Database Connection**: Verificar DATABASE_URL
2. **JWT Errors**: Verificar secrets
3. **File Upload**: Verificar permisos de directorio
4. **WebSocket**: Verificar configuración de proxy

### Logs
- **Error Level**: Errores críticos
- **Warn Level**: Advertencias
- **Info Level**: Información general
- **Debug Level**: Información detallada

## 🔄 Updates & Maintenance

### Database Migrations
```bash
# Crear migración
yarn db:migrate:create

# Ejecutar migraciones
yarn db:migrate

# Revertir migración
yarn db:migrate:rollback
```

### Backup Strategy
- **Automated**: Backups diarios
- **Manual**: Antes de cambios importantes
- **Retention**: 30 días

---

**¿Necesitas ayuda con alguna funcionalidad específica del backend?**
