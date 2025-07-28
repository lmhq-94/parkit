# Arquitectura de Parkit

## Visión General

Parkit es una aplicación multiplataforma para la gestión inteligente de parqueos, construida con una arquitectura modular y escalable.

## Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │    Web App      │    │   Tablet App    │
│  (React Native) │    │    (React)      │    │  (React Web)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  GraphQL API    │
                    │ (Apollo Server) │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (Prisma)      │
                    └─────────────────┘
```

## Estructura del Monorepo

```
parkit/
├── apps/
│   ├── backend/          # GraphQL API Server
│   ├── mobile/           # React Native App
│   └── web/              # React Web App
├── packages/
│   ├── database/         # Prisma Schema & Migrations
│   ├── shared/           # Tipos y utilidades compartidas
│   └── ui/               # Componentes UI compartidos
└── docs/                 # Documentación
```

## Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **GraphQL** - API Query Language
- **Apollo Server** - GraphQL Server
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos principal
- **JWT** - Autenticación
- **Express** - Framework web

### Frontend
- **React** - Framework de UI para web
- **React Native** - Framework para apps móviles
- **TypeScript** - Tipado estático
- **Material-UI** - Componentes UI para web
- **React Native Paper** - Componentes UI para móvil

### Herramientas
- **Turbo** - Build system para monorepo
- **Yarn Workspaces** - Gestión de dependencias
- **ESLint** - Linting de código
- **Jest** - Testing framework

## Modelo de Datos

### Entidades Principales

1. **Company** - Empresas que usan el sistema
2. **User** - Usuarios del sistema (empleados, clientes, valets)
3. **Vehicle** - Vehículos registrados
4. **Parking** - Espacios de estacionamiento
5. **Reservation** - Reservas de espacios
6. **Event** - Eventos del sistema (entrada, salida, etc.)
7. **Payment** - Pagos realizados
8. **Evidence** - Evidencias fotográficas
9. **QRCode** - Códigos QR para identificación
10. **Notification** - Notificaciones del sistema

### Relaciones Clave

- Una **Company** tiene muchos **Users**, **Parkings**, **Reservations**, etc.
- Un **User** puede tener muchos **Vehicles** y **Reservations**
- Un **Parking** puede tener muchas **Reservations** y **Events**
- Un **Reservation** está asociado a un **User**, **Vehicle** y **Parking**

## Flujos Principales

### 1. Reserva de Parqueo
```
Usuario → Selecciona fecha/hora → Elige vehículo → 
Selecciona espacio → Confirma reserva → Paga → 
Recibe confirmación
```

### 2. Entrada de Vehículo
```
Valet escanea QR → Registra entrada → Toma foto → 
Actualiza estado de parqueo → Notifica al usuario
```

### 3. Salida de Vehículo
```
Valet escanea QR → Registra salida → Calcula tarifa → 
Procesa pago → Libera espacio → Notifica al usuario
```

## Seguridad

### Autenticación
- JWT tokens para autenticación
- Roles de usuario (ADMIN, EMPLOYEE, CLIENT, VALET, MANAGER)
- Autenticación por empresa (multi-tenant)

### Autorización
- Control de acceso basado en roles
- Validación de permisos por operación
- Filtrado de datos por empresa

### Validación
- Validación de entrada con Zod
- Sanitización de datos
- Rate limiting para APIs

## Escalabilidad

### Horizontal
- Múltiples instancias del servidor
- Load balancing
- Base de datos con replicación

### Vertical
- Optimización de consultas GraphQL
- Caching con Redis
- Compresión de respuestas

## Monitoreo y Logging

### Métricas
- Tiempo de respuesta de APIs
- Uso de recursos del servidor
- Errores y excepciones

### Logging
- Logs estructurados
- Diferentes niveles (debug, info, warn, error)
- Rotación de logs

## Deployment

### Desarrollo
- Docker Compose para servicios locales
- Hot reloading para desarrollo
- Base de datos local con Prisma

### Producción
- Docker containers
- Kubernetes para orquestación
- CI/CD con GitHub Actions
- Base de datos PostgreSQL en la nube

## Consideraciones de Rendimiento

### Base de Datos
- Índices optimizados
- Consultas eficientes
- Paginación para listas grandes

### API
- Resolvers optimizados
- DataLoader para evitar N+1 queries
- Caching de respuestas frecuentes

### Frontend
- Lazy loading de componentes
- Optimización de imágenes
- Service workers para cache offline 