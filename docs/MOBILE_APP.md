# 📱 Aplicación Móvil - Parkit

## 🌟 Características Implementadas

### 🎨 Sistema de Temas Dinámico
- **Temas soportados**: Claro, Oscuro, Sistema
- **Detección automática**: Sigue las preferencias del sistema operativo
- **Persistencia**: Guarda la preferencia en AsyncStorage
- **Transiciones suaves**: Cambio instantáneo entre temas

### 🌍 Sistema de Internacionalización
- **Idiomas soportados**: Español (por defecto), Inglés
- **Detección automática**: Detecta el idioma del dispositivo
- **Persistencia**: Guarda la preferencia en AsyncStorage
- **Traducciones completas**: Todas las cadenas de texto traducidas

### 🔐 Sistema de Autenticación
- **JWT Tokens**: Autenticación segura con tokens
- **Persistencia**: Tokens guardados en AsyncStorage
- **Auto-login**: Restaura sesión automáticamente
- **Logout seguro**: Limpia tokens al cerrar sesión

### 🛡️ Sistema de Permisos
- **Roles diferenciados**: ADMIN, MANAGER, VALET, EMPLOYEE, CLIENT
- **Permisos granulares**: Control fino de funcionalidades
- **Rutas protegidas**: Acceso basado en permisos
- **UI adaptativa**: Interfaz que se adapta al rol

## 📁 Estructura de Archivos

```
apps/mobile/src/
├── components/
│   ├── LanguageSelector.tsx    # Selector de idioma
│   ├── ThemeSelector.tsx       # Selector de tema
│   └── ProtectedRoute.tsx      # Ruta protegida
├── contexts/
│   ├── AuthContext.tsx         # Contexto de autenticación
│   ├── LanguageContext.tsx     # Contexto de idioma
│   └── ThemeContext.tsx        # Contexto de tema
├── hooks/
│   └── usePermissions.ts       # Hook de permisos
├── screens/
│   ├── LoginScreen.tsx         # Pantalla de login
│   ├── DashboardScreen.tsx     # Dashboard principal
│   ├── SettingsScreen.tsx      # Configuración
│   └── ...                     # Otras pantallas
├── lib/
│   └── apollo.ts              # Configuración Apollo Client
└── theme.ts                   # Configuración de temas
```

## 🔧 Configuración

### Dependencias Principales

```json
{
  "@react-native-async-storage/async-storage": "1.18.2",
  "expo-localization": "~14.3.0",
  "react-native-paper": "^5.11.1",
  "@react-navigation/native": "^6.1.9",
  "@apollo/client": "^3.8.8"
}
```

### Configuración de Expo

```json
{
  "expo": {
    "userInterfaceStyle": "automatic",
    "plugins": [
      "expo-camera",
      "expo-location",
      "expo-localization"
    ]
  }
}
```

## 🎯 Uso de los Contextos

### Contexto de Idioma

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Text>{t('common.loading')}</Text>
  );
}
```

### Contexto de Tema

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { themeMode, setThemeMode, theme, isDark } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.onBackground }}>
        {isDark ? 'Modo oscuro' : 'Modo claro'}
      </Text>
    </View>
  );
}
```

### Hook de Permisos

```typescript
import { usePermissions } from '@/hooks/usePermissions';

function MyComponent() {
  const permissions = usePermissions();

  if (!permissions.canScanQR) {
    return <AccessDenied />;
  }

  return <QRScanner />;
}
```

## 🛡️ Rutas Protegidas

### Protección por Rol

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

<ProtectedRoute requiredRole="ADMIN">
  <AdminPanel />
</ProtectedRoute>
```

### Protección por Permisos

```typescript
<ProtectedRoute requiredPermissions={(p) => p.canManageUsers}>
  <UserManagement />
</ProtectedRoute>
```

## 🎨 Temas Disponibles

### Tema Claro
- **Colores principales**: Azul (#1976d2), Rojo (#dc004e)
- **Fondo**: Blanco (#ffffff)
- **Texto**: Gris oscuro (#212121)

### Tema Oscuro
- **Colores principales**: Azul claro (#90caf9), Rosa claro (#f48fb1)
- **Fondo**: Gris muy oscuro (#121212)
- **Texto**: Blanco (#ffffff)

### Tema Sistema
- **Comportamiento**: Sigue las preferencias del SO
- **Detección**: Usa `useColorScheme` de React Native
- **Transición**: Automática al cambiar preferencias

## 🌍 Idiomas Soportados

### Español (es)
- **Bandera**: 🇪🇸
- **Nombre**: Español
- **Por defecto**: Sí

### Inglés (en)
- **Bandera**: 🇺🇸
- **Nombre**: English
- **Detección**: Automática del dispositivo

## 📱 Pantallas Principales

### Dashboard
- **Contenido dinámico**: Basado en rol del usuario
- **Métricas**: Estadísticas relevantes
- **Acciones rápidas**: Funciones más usadas

### Configuración
- **Selector de idioma**: Con banderas y nombres
- **Selector de tema**: Con iconos y nombres
- **Configuración de notificaciones**: Switches interactivos
- **Información de cuenta**: Datos del usuario

### QR Scanner
- **Cámara integrada**: Escaneo de códigos QR
- **Entrada manual**: Códigos ingresados manualmente
- **Historial**: Eventos recientes

## 🔄 Flujo de Datos

1. **Inicio de la app**: Carga preferencias desde AsyncStorage
2. **Detección automática**: Idioma y tema del dispositivo
3. **Aplicación de configuraciones**: Contextos inicializados
4. **Autenticación**: Verificación de tokens existentes
5. **Navegación**: Rutas basadas en permisos

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
yarn install

# Iniciar desarrollo
yarn start

# Ejecutar en Android
yarn android

# Ejecutar en iOS
yarn ios

# Linting
yarn lint

# Formateo
yarn format
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```bash
# .env
EXPO_PUBLIC_API_URL=http://localhost:4000/graphql
```

### TypeScript
- **Configuración**: `tsconfig.json` optimizado para Expo
- **Paths**: Alias `@/` para imports limpios
- **Tipos**: Completamente tipado

### ESLint y Prettier
- **Configuración**: Consistente con el resto del proyecto
- **Reglas**: Específicas para React Native
- **Formateo**: Automático en commit

## 📊 Estado de Implementación

### ✅ Completado
- [x] Sistema de temas dinámico
- [x] Sistema de internacionalización
- [x] Contextos de idioma y tema
- [x] Hook de permisos
- [x] Rutas protegidas
- [x] Pantalla de configuración
- [x] Selectores de idioma y tema
- [x] Persistencia con AsyncStorage
- [x] Detección automática de preferencias
- [x] **Todas las pantallas principales implementadas**:
  - [x] LoginScreen - Pantalla de inicio de sesión
  - [x] DashboardScreen - Dashboard principal con contenido dinámico por rol
  - [x] ParkingsScreen - Gestión de parqueos con filtros y estadísticas
  - [x] ReservationsScreen - Gestión de reservas con menús contextuales
  - [x] VehiclesScreen - Gestión de vehículos con búsqueda y filtros
  - [x] QRScannerScreen - Escáner QR y entrada manual de eventos
  - [x] SettingsScreen - Configuración de idioma, tema y preferencias

### 🔄 En Progreso
- [ ] Integración con GraphQL
- [ ] Notificaciones push
- [ ] Funcionalidades offline
- [ ] Navegación entre pantallas
- [ ] Implementación de cámara real para QR

### 📋 Pendiente
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Optimización de rendimiento
- [ ] Accesibilidad
- [ ] Documentación de API

## 🎯 Próximos Pasos

1. **Implementar navegación** entre pantallas con React Navigation
2. **Integrar con GraphQL** para datos reales desde el backend
3. **Agregar notificaciones push** para eventos importantes
4. **Implementar funcionalidades offline** con cache local
5. **Implementar cámara real** para escaneo de códigos QR
6. **Optimizar rendimiento** y experiencia de usuario
7. **Agregar tests** para garantizar calidad
8. **Mejorar accesibilidad** para usuarios con discapacidades
