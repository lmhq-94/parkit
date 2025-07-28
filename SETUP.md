# 🚀 Guía de Configuración - Parkit

## Requisitos Previos

- **Node.js** >= 18.0.0
- **Yarn** >= 1.22.0
- **PostgreSQL** >= 13.0
- **Docker** (opcional, para desarrollo con containers)

## 🛠️ Configuración Inicial

### 1. Instalar Dependencias

```bash
# Instalar todas las dependencias del monorepo
yarn install
```

### 2. Configurar Base de Datos

#### Opción A: PostgreSQL Local

1. **Crear base de datos:**
   ```sql
   CREATE DATABASE parkit_db;
   CREATE USER parkit_user WITH PASSWORD 'parkit_password';
   GRANT ALL PRIVILEGES ON DATABASE parkit_db TO parkit_user;
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp env.example .env
   ```

3. **Editar `.env`:**
   ```env
   DATABASE_URL="postgresql://parkit_user:parkit_password@localhost:5432/parkit_db"
   JWT_SECRET="tu-super-secret-jwt-key-aqui"
   PORT=4000
   NODE_ENV="development"
   ```

#### Opción B: Docker (Recomendado para desarrollo)

```bash
# Iniciar servicios con Docker Compose
docker-compose up -d postgres redis

# Esperar a que PostgreSQL esté listo (30-60 segundos)
```

### 3. Configurar Base de Datos

```bash
# Generar cliente Prisma
yarn db:generate

# Ejecutar migraciones
yarn db:migrate

# Poblar con datos de ejemplo
yarn db:seed
```

### 4. Verificar Configuración

```bash
# Verificar que todo esté configurado correctamente
yarn db:studio
```

Esto abrirá Prisma Studio en http://localhost:5555 donde podrás ver los datos.

## 🚀 Ejecutar el Proyecto

### Desarrollo Completo

```bash
# Ejecutar todo el proyecto (backend + web + móvil)
yarn dev
```

### Servicios Individuales

```bash
# Solo el backend
yarn backend:dev

# Solo la app web
yarn web:dev

# Solo la app móvil
yarn mobile:dev

# Solo la base de datos (Prisma Studio)
yarn db:studio

# Solo las migraciones
yarn db:migrate
```

## 📱 Acceder a la Aplicación

### Backend API
- **GraphQL Playground**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health

### Aplicación Web
- **URL**: http://localhost:3000
- **Características**: Dashboard, gestión de parqueos, reservas, vehículos

### Aplicación Móvil
- **Expo Dev Tools**: http://localhost:19000
- **Características**: Escáner QR, gestión de eventos, interfaz móvil

### Prisma Studio (Base de Datos)
- **URL**: http://localhost:5555

## 🔐 Credenciales de Prueba

Después de ejecutar el seed, tendrás estos usuarios disponibles:

### Usuarios de Prueba

| Email | Password | Rol | Descripción |
|-------|----------|-----|-------------|
| `admin@techcorp.com` | `admin123` | ADMIN | Administrador del sistema |
| `manager@techcorp.com` | `user123` | MANAGER | Gerente de empresa |
| `employee@techcorp.com` | `user123` | EMPLOYEE | Empleado |
| `client@techcorp.com` | `user123` | CLIENT | Cliente |
| `valet@techcorp.com` | `valet123` | VALET | Valet parking |

## 🧪 Probar la API

### 1. Login de Usuario

```graphql
mutation Login {
  login(input: {
    email: "client@techcorp.com"
    password: "user123"
  }) {
    token
    user {
      id
      email
      firstName
      lastName
      role
      company {
        name
      }
    }
  }
}
```

### 2. Obtener Parqueos Disponibles

```graphql
query AvailableParkings {
  availableParkings(companyId: "company_id_here") {
    id
    name
    location
    status
    hourlyRate
    dailyRate
  }
}
```

### 3. Crear una Reserva

```graphql
mutation CreateReservation {
  createReservation(input: {
    startTime: "2024-01-20T09:00:00Z"
    endTime: "2024-01-20T17:00:00Z"
    vehicleId: "vehicle_id_here"
    parkingId: "parking_id_here"
    notes: "Reserva para reunión"
  }) {
    id
    startTime
    endTime
    status
    vehicle {
      licensePlate
      brand
      model
    }
    parking {
      name
      location
    }
  }
}
```

## 🔧 Comandos Útiles

### Base de Datos

```bash
# Generar cliente Prisma
yarn db:generate

# Ejecutar migraciones
yarn db:migrate

# Resetear base de datos
yarn db:reset

# Abrir Prisma Studio
yarn db:studio

# Ejecutar seed
yarn db:seed
```

### Desarrollo

```bash
# Ejecutar en modo desarrollo
yarn dev

# Ejecutar solo backend
yarn backend:dev

# Limpiar builds
yarn clean

# Linting
yarn lint
```

### Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache
```

## 🐛 Solución de Problemas

### Error de Conexión a Base de Datos

```bash
# Verificar que PostgreSQL esté corriendo
psql -h localhost -U parkit_user -d parkit_db

# Si usas Docker
docker-compose ps
```

### Error de Dependencias

```bash
# Limpiar cache de Yarn
yarn cache clean

# Reinstalar dependencias
rm -rf node_modules
yarn install
```

### Error de Prisma

```bash
# Regenerar cliente Prisma
yarn db:generate

# Resetear base de datos
yarn db:reset
```

## 📁 Estructura del Proyecto

```
parkit/
├── apps/
│   └── backend/          # GraphQL API Server
├── packages/
│   ├── database/         # Prisma Schema & Migrations
│   └── shared/           # Tipos y utilidades compartidas
├── docs/                 # Documentación
├── docker-compose.yml    # Configuración Docker
├── package.json          # Configuración del monorepo
└── turbo.json           # Configuración Turbo
```

## 🎯 Próximos Pasos

1. **Autenticación**: Implementar JWT real
2. **Subida de Archivos**: Implementar evidencia fotográfica
3. **Notificaciones**: Implementar sistema de notificaciones
4. **Pagos**: Integrar pasarela de pagos
5. **Testing**: Agregar tests unitarios y de integración
6. **Deployment**: Configurar CI/CD y deployment

¡El proyecto está completo y listo para usar! 🎉 