# 🚗 Parkit - Sistema de Gestión de Parqueos Inteligente

Sistema completo de gestión de parqueos con aplicaciones web y móvil, construido con tecnologías modernas y diseño profesional.

## 🌟 Características Principales

### 🎨 **Diseño Moderno y Profesional**

- **Glassmorphism**: Efectos de cristal con blur y transparencias
- **Gradientes Dinámicos**: Paletas de colores personalizables (Ocean, Sunset, Forest, Royal, Midnight)
- **Animaciones Suaves**: Micro-interacciones y transiciones fluidas
- **Efectos 3D**: Sombras dinámicas y efectos de profundidad
- **Responsive Design**: Adaptable a todos los dispositivos

### 🔐 **Sistema de Autenticación Moderno**

- **Splash Screen Avanzado**: Animaciones fluidas con gradientes dinámicos
- **Login Multi-Método**: Email, teléfono y redes sociales
- **Autenticación por Teléfono**: Verificación SMS con countdown
- **Social Login**: Google, Facebook, Apple y Twitter/X
- **Validación en Tiempo Real**: Verificación instantánea de datos
- **Transiciones Animadas**: Efectos suaves entre pantallas
- **Estados de Carga**: Indicadores visuales durante procesos
- **Diseño Tipo DiDi**: Footer fijo y contenido centrado

### 🎨 **Sistema de Fuentes Profesionales**

- **Fuente Inter**: Estándar de la industria para aplicaciones digitales
- **Familia Completa**: 9 pesos desde Thin hasta Black
- **Jerarquía Tipográfica**: Sistema consistente de títulos y texto
- **Optimización Pantalla**: Diseñada específicamente para dispositivos móviles
- **Carga Eficiente**: Hook personalizado para gestión de fuentes
- **Consistencia Visual**: Tipografía uniforme en toda la aplicación

### 📊 **Dashboard Interactivo Avanzado**

- **Gráficos en Tiempo Real**: MUI X Charts con múltiples tipos de visualización
- **Widgets Personalizables**: Cards con efectos hover y animaciones
- **Indicadores de Rendimiento**: Métricas con gradientes y tendencias
- **Quick Actions**: Acciones rápidas con animaciones
- **Recent Activity**: Timeline de actividades recientes
- **Floating Action Button**: Botón flotante con efectos

### 🔔 **Sistema de Notificaciones Inteligente**

- **Notificaciones Push**: Sistema de alertas en tiempo real
- **Categorización**: Notificaciones por tipo (parking, payment, reservation, system, user)
- **Prioridades**: Sistema de prioridades (low, medium, high)
- **Acciones Integradas**: Botones de acción en las notificaciones
- **Drawer de Notificaciones**: Panel lateral con gestión completa
- **Toast Notifications**: Alertas temporales con animaciones

### 🗺️ **Mapa Interactivo de Parqueos**

- **Visualización en Tiempo Real**: Estado actual de cada parqueo
- **Filtros Avanzados**: Por estado, tipo, precio y búsqueda
- **Tooltips Informativos**: Información detallada al hacer hover
- **Zoom y Navegación**: Controles de zoom y pantalla completa
- **Leyenda Interactiva**: Explicación de símbolos y estados
- **Detalles de Parqueo**: Modal con información completa

### 🎨 **Tema Dinámico y Personalizable**

- **5 Paletas de Colores**: Ocean, Sunset, Forest, Royal, Midnight
- **Modo Oscuro/Claro**: Transiciones suaves entre temas
- **Gradientes Predefinidos**: 10 gradientes profesionales
- **Efectos de Sombra**: Sistema de sombras personalizado
- **Animaciones CSS**: Keyframes para efectos especiales
- **Tipografía Mejorada**: Inter font con jerarquías claras

### 🚀 **Funcionalidades Innovadoras**

- **Gamificación**: Sistema de puntos y logros
- **Análisis Predictivo**: Predicciones de ocupación
- **Integración IoT**: Sensores de parqueo inteligentes
- **Geolocalización**: Búsqueda de parqueos cercanos
- **Pagos Integrados**: Stripe y múltiples métodos de pago
- **Reportes Avanzados**: Analytics y métricas detalladas

## 🏗️ Arquitectura

- **Backend**: Node.js, Express, GraphQL, PostgreSQL
- **Frontend Web**: React, Next.js, Material-UI v7
- **Frontend Mobile**: React Native, Expo, React Native Paper
- **Monorepo**: Turbo, Yarn workspaces
- **Gráficos**: MUI X Charts
- **Notificaciones**: Sistema personalizado con WebSockets
- **Mapas**: Componente interactivo personalizado

## 🌍 Internacionalización

- **Idiomas**: Español (por defecto), Inglés
- **Detección automática**: Idioma del navegador/dispositivo
- **Persistencia**: Preferencias guardadas en localStorage/AsyncStorage
- **Traducciones completas**: Todas las cadenas de texto traducidas

## 🛡️ Sistema de Permisos

- **Roles**: ADMIN, MANAGER, VALET, EMPLOYEE, CLIENT
- **Permisos granulares**: Control fino de funcionalidades
- **Rutas protegidas**: Acceso basado en permisos
- **UI adaptativa**: Interfaz que se adapta al rol del usuario

## 🚀 Backend Completo

- **API GraphQL** con Apollo Server y Express
- **Base de datos PostgreSQL** con Prisma ORM
- **Autenticación JWT** con refresh tokens
- **Sistema de permisos RBAC** completo
- **WebSockets** para funcionalidades en tiempo real
- **Upload de archivos** con validación y almacenamiento
- **Rate limiting** y medidas de seguridad
- **Logging estructurado** y sistema de monitoreo
- **Tests unitarios** e integración completos

## 📱 Pantallas Implementadas

### Web App (React/Next.js)

- ✅ **Dashboard Avanzado** - Panel principal con gráficos y métricas
- ✅ **Login** - Autenticación de usuarios con animaciones
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

### Mobile App (React Native/Expo)

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
- [x] Dashboard interactivo con gráficos
- [x] Sistema de notificaciones avanzado
- [x] Mapa interactivo de parqueos
- [x] Todas las pantallas principales (Web + Mobile)
- [x] Base de datos y migraciones
- [x] API GraphQL básica
- [x] UI/UX moderna y responsive
- [x] Efectos glassmorphism y animaciones
- [x] Paletas de colores personalizables
- [x] Componentes reutilizables avanzados
- [x] **Splash Screen avanzado con animaciones**
- [x] **Sistema de login multi-método (Email, Teléfono, Social)**
- [x] **Autenticación por teléfono con verificación SMS**
- [x] **Social login (Google, Facebook, Apple, Twitter)**
- [x] **Validación en tiempo real y transiciones animadas**
- [x] **Diseño tipo DiDi con footer fijo**
- [x] **Sistema de fuentes profesionales (Inter)**
- [x] **Jerarquía tipográfica consistente**
- [x] **Carga eficiente de fuentes con hooks personalizados**

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

## 🎨 Características de Diseño

### Efectos Visuales

- **Glassmorphism**: Efectos de cristal con blur
- **Gradientes Dinámicos**: 10 gradientes predefinidos
- **Sombras Personalizadas**: Sistema de sombras avanzado
- **Animaciones CSS**: Keyframes para efectos especiales
- **Micro-interacciones**: Hover effects y transiciones

### Paletas de Colores

- **Ocean**: Azules y turquesas
- **Sunset**: Naranjas y rojos
- **Forest**: Verdes y naturales
- **Royal**: Púrpuras y magentas
- **Midnight**: Azules oscuros y grises

### Componentes Avanzados

- **Cards con Efectos**: Hover, sombras y animaciones
- **Botones Interactivos**: Gradientes y micro-animaciones
- **Progress Bars**: Animadas con gradientes
- **Modales**: Con efectos de blur y transiciones
- **Tooltips**: Informativos con animaciones

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Desarrollador**: Luis Herrera Quesada
- **Email**: [luis.herrera506@gmail.com]
- **Proyecto**: [https://github.com/usuario/parkit](https://github.com/usuario/parkit)

---

## 🚀 Próximas Características

### Fase 2 - Funcionalidades Avanzadas

- [ ] **IA y Machine Learning**: Predicción de ocupación
- [ ] **Blockchain**: Pagos descentralizados
- [ ] **Realidad Aumentada**: Navegación AR en parqueos
- [ ] **IoT Avanzado**: Sensores inteligentes
- [ ] **Chatbot**: Asistente virtual integrado

### Fase 3 - Escalabilidad

- [ ] **Microservicios**: Arquitectura distribuida
- [ ] **Kubernetes**: Orquestación de contenedores
- [ ] **Redis**: Cache distribuido
- [ ] **Elasticsearch**: Búsqueda avanzada
- [ ] **Kafka**: Streaming de eventos

---

**¡Parkit - Transformando la gestión de parqueos con tecnología de vanguardia! 🚗✨**
