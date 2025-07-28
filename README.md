# 🚗 Parkit - Sistema de Gestión de Parqueos

Sistema completo de gestión de parqueos con aplicaciones web y móvil, construido con tecnologías modernas.

## 🏗️ Arquitectura

- **Backend**: Node.js, Express, GraphQL, PostgreSQL
- **Frontend Web**: React, Next.js, Material-UI
- **Frontend Mobile**: React Native, Expo, React Native Paper
- **Monorepo**: Turbo, Yarn workspaces

## 🌟 Características Principales

### 🌍 Internacionalización
- **Idiomas**: Español (por defecto), Inglés
- **Detección automática**: Idioma del navegador/dispositivo
- **Persistencia**: Preferencias guardadas en localStorage/AsyncStorage
- **Traducciones completas**: Todas las cadenas de texto traducidas

### 🎨 Sistema de Temas
- **Temas**: Claro, Oscuro, Sistema
- **Detección automática**: Preferencias del sistema operativo
- **Transiciones suaves**: Cambio instantáneo entre temas
- **Consistencia**: Mismos colores en web y móvil

### 🛡️ Sistema de Permisos
- **Roles**: ADMIN, MANAGER, VALET, EMPLOYEE, CLIENT
- **Permisos granulares**: Control fino de funcionalidades
- **Rutas protegidas**: Acceso basado en permisos
- **UI adaptativa**: Interfaz que se adapta al rol del usuario

### 🚀 Backend Completo
- **API GraphQL** con Apollo Server y Express
- **Base de datos PostgreSQL** con Prisma ORM
- **Autenticación JWT** con refresh tokens
- **Sistema de permisos RBAC** completo
- **WebSockets** para funcionalidades en tiempo real
- **Upload de archivos** con validación y almacenamiento
- **Rate limiting** y medidas de seguridad
- **Logging estructurado** y sistema de monitoreo
- **Tests unitarios** e integración completos

### 📱 Pantallas Implementadas

#### Web App (React/Next.js)
- ✅ **Login** - Autenticación de usuarios
- ✅ **Dashboard** - Panel principal con estadísticas por rol
- ✅ **Companies** - Gestión de empresas
- ✅ **Users** - Gestión de usuarios
- ✅ **Parkings** - Gestión de espacios de parqueo
- ✅ **Reservations** - Gestión de reservas
- ✅ **Vehicles** - Gestión de vehículos
- ✅ **Payments** - Gestión de pagos
- ✅ **Events** - Registro de entradas/salidas
- ✅ **QR Scanner** - Escáner de códigos QR
- ✅ **Reports** - Reportes y análisis
- ✅ **Settings** - Configuración del sistema

#### Mobile App (React Native/Expo)
- ✅ **LoginScreen** - Autenticación móvil
- ✅ **DashboardScreen** - Dashboard adaptado para móvil
- ✅ **ParkingsScreen** - Gestión de parqueos móvil
- ✅ **ReservationsScreen** - Gestión de reservas móvil
- ✅ **VehiclesScreen** - Gestión de vehículos móvil
- ✅ **QRScannerScreen** - Escáner QR móvil
- ✅ **SettingsScreen** - Configuración móvil

## 🗄️ Base de Datos

### Entidades Principales
- **Users**: Usuarios del sistema con roles y permisos
- **Companies**: Empresas que usan el sistema
- **Parkings**: Espacios de parqueo disponibles
- **Vehicles**: Vehículos registrados
- **Reservations**: Reservas de parqueos
- **Payments**: Transacciones de pago
- **Events**: Registro de entradas y salidas

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- Yarn
- PostgreSQL 14+

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd parkit

# Instalar dependencias
yarn install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Inicializar base de datos
yarn db:setup

# Iniciar desarrollo
yarn dev
```

### Comandos Disponibles
```bash
# Desarrollo
yarn dev          # Inicia todos los servicios
yarn dev:web      # Solo aplicación web
yarn dev:mobile   # Solo aplicación móvil
yarn dev:backend  # Solo backend

# Construcción
yarn build        # Construye todas las aplicaciones
yarn build:web    # Construye solo web
yarn build:mobile # Construye solo móvil

# Base de datos
yarn db:setup     # Configura la base de datos
yarn db:migrate   # Ejecuta migraciones
yarn db:seed      # Pobla con datos de prueba

# Testing
yarn test         # Ejecuta todos los tests
yarn test:web     # Tests de la aplicación web
yarn test:mobile  # Tests de la aplicación móvil
```

## 🌐 URLs de Desarrollo

- **Web**: http://localhost:3000
- **Mobile**: Expo Go app (puerto 19000)
- **Backend**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql

## 📱 Aplicación Móvil

### Características Móviles
- **Escáner QR nativo** para registro de eventos
- **Notificaciones push** para eventos importantes
- **Modo offline** con sincronización automática
- **Geolocalización** para parqueos cercanos
- **Interfaz adaptativa** para diferentes tamaños de pantalla

### Tecnologías Móviles
- **React Native** con Expo
- **React Native Paper** para UI
- **AsyncStorage** para persistencia local
- **Expo Camera** para escaneo QR
- **Expo Notifications** para push notifications

## 🔧 Configuración

### Variables de Entorno
```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/parkit

# JWT
JWT_SECRET=your-secret-key

# Servicios externos
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...

# Configuración de la app
NEXT_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_API_URL=http://localhost:4000
```

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Arquitectura del monorepo
- [x] Sistema de autenticación JWT
- [x] Sistema de permisos basado en roles
- [x] Internacionalización completa
- [x] Sistema de temas dinámico
- [x] Todas las pantallas principales (Web + Mobile)
- [x] Base de datos y migraciones
- [x] API GraphQL básica
- [x] UI/UX moderna y responsive

### 🔄 En Progreso
- [ ] Integración completa con GraphQL
- [ ] Notificaciones push
- [ ] Funcionalidades offline
- [ ] Tests automatizados
- [ ] Optimización de rendimiento

### 📋 Pendiente
- [ ] Documentación de API
- [ ] Deploy en producción
- [ ] Monitoreo y analytics
- [ ] Backup automático
- [ ] CI/CD pipeline

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: [tu-email@ejemplo.com]
- **Proyecto**: [https://github.com/usuario/parkit](https://github.com/usuario/parkit)
