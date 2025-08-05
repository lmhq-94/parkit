# 🚗 ParkIt - Sistema Inteligente de Gestión de Parqueos

Una aplicación multiplataforma completa para la gestión inteligente de parqueos, diseñada para empresas que necesitan administrar espacios de estacionamiento de manera eficiente.

## ✨ Características Principales

### 🎨 Sistema de Diseño Avanzado
- **5 Paletas de colores**: Ocean, Sunset, Forest, Royal, Midnight
- **Modo oscuro/claro** con transiciones suaves
- **Gradientes dinámicos** con 10 variaciones predefinidas
- **Efectos glassmorphism** con blur y transparencias
- **Tipografía profesional** con fuente Inter
- **Animaciones y micro-interacciones** fluidas

### 🔐 Autenticación Moderna
- **Múltiples métodos de login**: Email, teléfono, Google, Facebook, Apple
- **Verificación SMS** con countdown timer
- **JWT tokens** con refresh automático
- **Sistema de permisos RBAC** con 5 roles
- **Rate limiting** para seguridad

### 📊 Dashboard Interactivo
- **Gráficos en tiempo real** con MUI X Charts
- **Widgets personalizables** con efectos hover
- **Métricas dinámicas** con tendencias
- **Quick Actions** con animaciones
- **Recent Activity** timeline

### 🗺️ Mapa Interactivo
- **Visualización en tiempo real** de parqueos
- **Códigos de color** para diferentes estados
- **Filtros avanzados** por estado, tipo, precio
- **Búsqueda de espacios** específicos
- **Zoom y navegación** intuitiva

### 🔔 Notificaciones Inteligentes
- **Push notifications** en tiempo real
- **Categorización**: parking, payment, reservation, system, user
- **Sistema de prioridades**: low, medium, high
- **Drawer lateral** con lista completa
- **Configuración personalizada**

### 🌍 Internacionalización
- **Español** (idioma por defecto)
- **Inglés** (idioma secundario)
- **Detección automática** del idioma del dispositivo
- **Hook personalizado** useTranslations
- **Formateo de fechas** y números

## 🏗️ Arquitectura Moderna

### Monorepo con Turbo
```
parkit/
├── apps/
│   ├── web/          # Next.js 15 + React 19
│   ├── mobile/       # React Native 0.73 + Expo SDK 50
│   └── backend/      # Node.js + GraphQL + Prisma
├── packages/
│   ├── ui/           # Material-UI v7 + Sistema de diseño
│   ├── shared/       # Utilidades y i18n
│   ├── types/        # Tipos TypeScript
│   └── config/       # Configuraciones compartidas
└── turbo.json        # Configuración de Turbo
```

### Stack Tecnológico Moderno

#### Frontend
- **React 19** con hooks avanzados y concurrent features
- **Next.js 15** para SSR, App Router y optimización
- **React Native 0.73** con Expo SDK 50 para móvil
- **TypeScript 5.3** para tipado estático
- **Material-UI v7** para componentes web
- **React Native Paper** para componentes móviles
- **MUI X Charts** para visualización de datos
- **TanStack Query v5** para gestión de estado del servidor
- **Zustand** para gestión de estado local
- **Zod** para validación de esquemas

#### Backend
- **Node.js 18.17** con Express
- **GraphQL** con Apollo Server v4
- **Prisma** como ORM moderno
- **PostgreSQL 15** como base de datos
- **Redis 7** para caché y sesiones
- **JWT** para autenticación
- **WebSockets** para tiempo real
- **Bull** para colas de trabajo
- **Winston** para logging estructurado

#### Herramientas y DevOps
- **Turbo 1.11** para monorepo
- **Yarn 1.22** para gestión de dependencias
- **ESLint 8.55** con reglas modernas
- **Prettier 3.1** para formateo
- **Jest 29.7** para testing
- **Husky 8.0** para git hooks
- **Commitlint** para estándares de commits
- **Docker Compose** para desarrollo
- **GitHub Actions** para CI/CD

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js >= 18.17.0
- Yarn >= 1.22.0
- PostgreSQL >= 15
- Redis >= 7
- Docker >= 20.10 (opcional)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/parkit.git
cd parkit
```

2. **Instalar dependencias**
```bash
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Configurar base de datos**
```bash
yarn db:generate
yarn db:migrate
yarn db:seed
```

5. **Ejecutar en desarrollo**
```bash
# Todas las aplicaciones
yarn dev

# Solo web
yarn dev:web

# Solo móvil
yarn dev:mobile

# Solo backend
yarn dev:backend
```

### Docker (Opcional)
```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 📱 Aplicaciones

### Web (Next.js 15)
- **Dashboard** con gráficos avanzados
- **Login** con efectos glassmorphism
- **Gestión de empresas** y usuarios
- **Mapa interactivo** de parqueos
- **Gestión de reservas** y pagos
- **QR Scanner** para escaneo web
- **Reportes** y análisis

### Móvil (React Native 0.73 + Expo SDK 50)
- **Splash Screen** con animaciones avanzadas
- **Login** multi-método con transiciones
- **Dashboard** adaptado para móvil
- **Mapa interactivo** con geolocalización
- **Escáner QR** nativo
- **Notificaciones push**
- **Modo offline** con sincronización

### Backend (Node.js + GraphQL)
- **API GraphQL** completa con Apollo Server v4
- **Autenticación JWT** con refresh
- **Sistema de permisos** RBAC
- **WebSockets** para tiempo real
- **Upload de archivos** con validación
- **Rate limiting** y seguridad
- **Logging** estructurado con Winston

## 🎨 Sistema de Temas

### Paletas de Colores
```typescript
// Ocean - Azul profesional
ocean: {
  primary: '#0066CC',
  secondary: '#00BFFF',
  accent: '#00CED1'
}

// Sunset - Naranja vibrante
sunset: {
  primary: '#FF6B35',
  secondary: '#FF8E53',
  accent: '#FFB347'
}

// Forest - Verde natural
forest: {
  primary: '#2E7D32',
  secondary: '#66BB6A',
  accent: '#8BC34A'
}

// Royal - Púrpura elegante
royal: {
  primary: '#6A1B9A',
  secondary: '#AB47BC',
  accent: '#E1BEE7'
}

// Midnight - Azul oscuro
midnight: {
  primary: '#1A237E',
  secondary: '#5C6BC0',
  accent: '#9FA8DA'
}
```

### Uso del Tema
```typescript
import { createParkitTheme, useTheme } from '@parkit/ui';

// Crear tema personalizado
const theme = createParkitTheme('ocean', 'light');

// Hook para usar tema
const { theme, toggleTheme, currentPalette } = useTheme();
```

## 🌍 Internacionalización

### Configuración
```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Cambiar idioma
i18n.changeLanguage('en');

// Usar traducciones
t('auth.login') // "Iniciar Sesión" / "Login"
```

### Estructura de Traducciones
```typescript
{
  common: { loading: 'Cargando...' },
  auth: { login: 'Iniciar Sesión' },
  parking: { title: 'Parqueos' },
  reservation: { title: 'Reservas' },
  dashboard: { title: 'Panel Principal' },
  notifications: { title: 'Notificaciones' },
  payment: { title: 'Pagos' }
}
```

## 🔐 Sistema de Autenticación

### Roles de Usuario
- **ADMIN**: Acceso completo al sistema
- **MANAGER**: Gestión de operaciones
- **VALET**: Registro de entradas/salidas
- **EMPLOYEE**: Acceso limitado
- **CLIENT**: Usuario final con reservas

### Métodos de Login
- Email y contraseña
- Teléfono con verificación SMS
- Google OAuth
- Facebook OAuth
- Apple Sign-In

## 📊 Base de Datos

### Entidades Principales
- **Company**: Empresas que usan el sistema
- **User**: Usuarios con roles y permisos
- **Vehicle**: Vehículos registrados
- **Parking**: Espacios de estacionamiento
- **Reservation**: Reservas de espacios
- **Event**: Registro de entradas/salidas
- **Payment**: Transacciones de pago
- **Notification**: Sistema de notificaciones
- **QRCode**: Códigos QR para identificación

## 🚀 Scripts Disponibles

```bash
# Desarrollo
yarn dev              # Todas las aplicaciones
yarn dev:web          # Solo web
yarn dev:mobile       # Solo móvil
yarn dev:backend      # Solo backend

# Construcción
yarn build            # Construir todo
yarn build:web        # Construir web
yarn build:mobile     # Construir móvil
yarn build:backend    # Construir backend

# Linting y formateo
yarn lint             # Lint todo el código
yarn lint:fix         # Lint con auto-fix
yarn format           # Formatear código
yarn format:check     # Verificar formato
yarn check-types      # Verificar tipos

# Testing
yarn test             # Ejecutar tests
yarn test:watch       # Tests en modo watch
yarn test:coverage    # Tests con cobertura

# Base de datos
yarn db:generate      # Generar cliente Prisma
yarn db:migrate       # Ejecutar migraciones
yarn db:seed          # Poblar base de datos
yarn db:studio        # Abrir Prisma Studio

# Storybook
yarn storybook        # Abrir Storybook
yarn build:storybook  # Construir Storybook

# Limpieza
yarn clean            # Limpiar builds
```

## 📈 Estado del Proyecto

### ✅ Completado (100%)
- [x] Arquitectura del monorepo con Turbo
- [x] Sistema de autenticación JWT moderno
- [x] Sistema de permisos RBAC
- [x] Internacionalización completa
- [x] Sistema de temas dinámico
- [x] Dashboard interactivo con gráficos
- [x] Sistema de notificaciones avanzado
- [x] Mapa interactivo de parqueos
- [x] Todas las pantallas principales (Web + Mobile)
- [x] Base de datos y migraciones con Prisma
- [x] API GraphQL con Apollo Server v4
- [x] UI/UX moderna y responsive
- [x] Efectos glassmorphism y animaciones
- [x] Paletas de colores personalizables
- [x] Componentes reutilizables avanzados
- [x] Splash Screen avanzado con animaciones
- [x] Sistema de login multi-método
- [x] Autenticación por teléfono con verificación SMS
- [x] Social login (Google, Facebook, Apple, Twitter)
- [x] Validación en tiempo real y transiciones animadas
- [x] Diseño tipo DiDi con footer fijo
- [x] Sistema de fuentes profesionales (Inter)
- [x] Jerarquía tipográfica consistente
- [x] Configuración moderna de ESLint y Prettier
- [x] Testing con Jest y Testing Library
- [x] CI/CD con GitHub Actions
- [x] Docker Compose para desarrollo
- [x] Git hooks con Husky y Commitlint

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
- [ ] Integración con IoT
- [ ] Sistema de gamificación
- [ ] Análisis predictivo

## 🧪 Testing

### Cobertura de Tests
```bash
# Ejecutar tests con cobertura
yarn test:coverage

# Resultados esperados:
# - Branches: 80%
# - Functions: 80%
# - Lines: 80%
# - Statements: 80%
```

### Tipos de Tests
- **Unit Tests**: Componentes y utilidades
- **Integration Tests**: APIs y servicios
- **E2E Tests**: Flujos completos
- **Visual Tests**: Storybook

## 🔒 Seguridad

### Implementaciones de Seguridad
- **JWT** con refresh tokens
- **Rate limiting** para APIs
- **CORS** configurado
- **Helmet** para headers de seguridad
- **Input validation** con Zod
- **SQL injection** prevention con Prisma
- **XSS protection** con sanitización
- **CSRF protection** con tokens

## 🚀 Performance

### Optimizaciones
- **Code splitting** automático
- **Lazy loading** de componentes
- **Image optimization** con Next.js
- **Bundle analysis** con webpack-bundle-analyzer
- **Caching** con Redis
- **CDN** para assets estáticos
- **Service Workers** para PWA

## 🤝 Contribuir

### Estándares de Contribución
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios siguiendo Conventional Commits (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Conventional Commits
```bash
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
perf: mejoras de performance
test: agregar o modificar tests
build: cambios en build system
ci: cambios en CI/CD
chore: tareas de mantenimiento
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Diseñador UX/UI**: [Nombre del Diseñador]
- **DevOps**: [Nombre del DevOps]

## 📞 Soporte

- 📧 Email: soporte@parkit.com
- 💬 Discord: [Link del Discord]
- 📱 WhatsApp: [Número de WhatsApp]
- 🌐 Website: https://parkit.com

---

**ParkIt** - Transformando la gestión de parqueos con tecnología moderna y diseño excepcional. 🚗✨
