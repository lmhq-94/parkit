# Sistema de Vistas por Roles - Parkit

## 📋 Visión General

Parkit implementa un sistema de vistas diferenciadas basado en roles de usuario, donde cada tipo de usuario tiene acceso a funcionalidades específicas según sus permisos y responsabilidades.

## 👥 Roles de Usuario

### 1. **ADMIN** - Administrador del Sistema
- **Acceso completo** a todas las funcionalidades
- **Gestión de usuarios** y empresas
- **Configuración del sistema**
- **Reportes y analytics**

### 2. **MANAGER** - Gerente de Empresa
- **Gestión de parqueos** de su empresa
- **Gestión de reservas** y pagos
- **Reportes** de su empresa
- **Escáner QR** para eventos

### 3. **VALET** - Valet Parking
- **Registro de eventos** (entrada/salida)
- **Escáner QR** para vehículos
- **Visualización de reservas** activas
- **Interfaz simplificada** para operaciones rápidas

### 4. **EMPLOYEE** - Empleado
- **Gestión de sus vehículos**
- **Creación de reservas** propias
- **Visualización de sus reservas**
- **Dashboard personal**

### 5. **CLIENT** - Cliente
- **Gestión de vehículos** propios
- **Creación de reservas**
- **Historial de reservas**
- **Interfaz de autoservicio**

## 🎯 Sistema de Permisos

### Hook `usePermissions()`

```typescript
interface Permission {
  canViewDashboard: boolean;
  canManageUsers: boolean;
  canManageCompanies: boolean;
  canManageParkings: boolean;
  canManageReservations: boolean;
  canManageVehicles: boolean;
  canManagePayments: boolean;
  canManageEvents: boolean;
  canViewReports: boolean;
  canScanQR: boolean;
  canCreateReservations: boolean;
  canCancelReservations: boolean;
  canViewOwnReservations: boolean;
  canViewAllReservations: boolean;
}
```

### Matriz de Permisos por Rol

| Permiso | ADMIN | MANAGER | VALET | EMPLOYEE | CLIENT |
|---------|-------|---------|-------|----------|--------|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gestión Usuarios | ✅ | ❌ | ❌ | ❌ | ❌ |
| Gestión Empresas | ✅ | ❌ | ❌ | ❌ | ❌ |
| Gestión Parqueos | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gestión Reservas | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gestión Vehículos | ✅ | ❌ | ❌ | ✅ | ✅ |
| Gestión Pagos | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gestión Eventos | ✅ | ✅ | ✅ | ❌ | ❌ |
| Reportes | ✅ | ✅ | ❌ | ❌ | ❌ |
| Escáner QR | ✅ | ✅ | ✅ | ❌ | ❌ |
| Crear Reservas | ✅ | ✅ | ❌ | ✅ | ✅ |
| Cancelar Reservas | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ver Propias Reservas | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ver Todas Reservas | ✅ | ✅ | ✅ | ❌ | ❌ |

## 🧭 Navegación por Roles

### ADMIN
```
Dashboard
├── Usuarios
├── Empresas
├── Parqueos
├── Reservas
├── Vehículos
├── Pagos
├── Eventos
├── Escáner QR
├── Reportes
└── Configuración
```

### MANAGER
```
Dashboard
├── Parqueos
├── Reservas
├── Pagos
├── Eventos
├── Escáner QR
└── Reportes
```

### VALET
```
Dashboard
├── Eventos
└── Escáner QR
```

### EMPLOYEE
```
Dashboard
├── Reservas
└── Vehículos
```

### CLIENT
```
Dashboard
├── Reservas
└── Vehículos
```

## 🛡️ Protección de Rutas

### Componente `ProtectedRoute`

```typescript
<ProtectedRoute
  requiredPermissions={(p) => p.canManageUsers}
  requiredRole="ADMIN"
>
  <UsersPage />
</ProtectedRoute>
```

### Tipos de Protección

1. **Por Permisos**: Verifica permisos específicos
2. **Por Rol**: Verifica rol exacto
3. **Combinada**: Permisos + Rol
4. **Fallback Personalizado**: Mensaje de error personalizado

## 🎨 Interfaces Específicas

### Dashboard Diferenciado

- **ADMIN**: Métricas completas del sistema
- **MANAGER**: Métricas de su empresa
- **VALET**: Eventos recientes y escáner
- **EMPLOYEE/CLIENT**: Sus reservas y vehículos

### Menús Contextuales

- **Sidebar dinámico** según permisos
- **Acciones específicas** por rol
- **Información de usuario** con rol visible

### Componentes Adaptativos

- **Tablas con filtros** por empresa/usuario
- **Formularios con campos** específicos
- **Botones de acción** según permisos

## 📱 Experiencia de Usuario

### Flujo de Autenticación

1. **Login** con email/password
2. **Verificación** de rol y permisos
3. **Redirección** al dashboard apropiado
4. **Navegación** limitada por permisos

### Mensajes Contextuales

- **Alertas informativas** por rol
- **Guías de uso** específicas
- **Mensajes de error** claros

### Responsive Design

- **Mobile-first** para valets
- **Desktop optimizado** para administradores
- **Tablet friendly** para gerentes

## 🔧 Implementación Técnica

### Estructura de Archivos

```
src/
├── hooks/
│   └── usePermissions.ts          # Hook de permisos
├── components/
│   ├── Layout.tsx                 # Layout con navegación
│   └── ProtectedRoute.tsx         # Protección de rutas
├── pages/
│   ├── dashboard.tsx              # Dashboard por rol
│   ├── users.tsx                  # Solo ADMIN
│   ├── qr-scanner.tsx             # VALET + ADMIN/MANAGER
│   └── ...
└── contexts/
    └── AuthContext.tsx            # Contexto de autenticación
```

### Configuración de Rutas

```typescript
// Ejemplo de ruta protegida
export default function UsersPage() {
  return (
    <ProtectedRoute requiredPermissions={(p) => p.canManageUsers}>
      <UsersManagement />
    </ProtectedRoute>
  );
}
```

## 🚀 Beneficios

### Para el Usuario
- **Interfaz clara** y relevante
- **Funcionalidades específicas** a su rol
- **Experiencia optimizada** por tipo de usuario

### Para el Sistema
- **Seguridad mejorada** con control de acceso
- **Mantenibilidad** con código modular
- **Escalabilidad** para nuevos roles

### Para el Negocio
- **Eficiencia operativa** con interfaces específicas
- **Reducción de errores** con permisos claros
- **Experiencia profesional** por tipo de usuario

## 🔮 Futuras Mejoras

1. **Roles personalizados** con permisos granulares
2. **Vistas móviles** optimizadas por rol
3. **Analytics** de uso por tipo de usuario
4. **Temas visuales** diferenciados por rol
5. **Notificaciones** específicas por permisos
