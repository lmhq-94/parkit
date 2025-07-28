import { UserRole } from '@parkit/shared';

export interface Permission {
  resource: string;
  action: string;
  roles: UserRole[];
}

export const PERMISSIONS: Permission[] = [
  // User Management
  { resource: 'users', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'users', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'users', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'users', action: 'delete', roles: [UserRole.ADMIN] },

  // Company Management
  { resource: 'companies', action: 'read', roles: [UserRole.ADMIN] },
  { resource: 'companies', action: 'create', roles: [UserRole.ADMIN] },
  { resource: 'companies', action: 'update', roles: [UserRole.ADMIN] },
  { resource: 'companies', action: 'delete', roles: [UserRole.ADMIN] },

  // Parking Management
  { resource: 'parkings', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'parkings', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'parkings', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'parkings', action: 'delete', roles: [UserRole.ADMIN] },

  // Reservation Management
  { resource: 'reservations', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'reservations', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'reservations', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET] },
  { resource: 'reservations', action: 'delete', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'reservations', action: 'cancel', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.CLIENT] },

  // Vehicle Management
  { resource: 'vehicles', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'vehicles', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'vehicles', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'vehicles', action: 'delete', roles: [UserRole.ADMIN, UserRole.MANAGER] },

  // Event Management
  { resource: 'events', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'events', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET] },
  { resource: 'events', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET] },

  // Payment Management
  { resource: 'payments', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'payments', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET] },
  { resource: 'payments', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER] },

  // QR Code Management
  { resource: 'qrcodes', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET] },
  { resource: 'qrcodes', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'qrcodes', action: 'scan', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET] },

  // Reports
  { resource: 'reports', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'reports', action: 'export', roles: [UserRole.ADMIN, UserRole.MANAGER] },

  // Notifications
  { resource: 'notifications', action: 'read', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET, UserRole.EMPLOYEE, UserRole.CLIENT] },
  { resource: 'notifications', action: 'create', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { resource: 'notifications', action: 'update', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.VALET, UserRole.EMPLOYEE, UserRole.CLIENT] },
];

export class PermissionService {
  static hasPermission(userRole: UserRole, resource: string, action: string): boolean {
    const permission = PERMISSIONS.find(
      p => p.resource === resource && p.action === action
    );

    if (!permission) {
      return false;
    }

    return permission.roles.includes(userRole);
  }

  static checkPermission(userRole: UserRole, resource: string, action: string): void {
    if (!this.hasPermission(userRole, resource, action)) {
      throw new Error(`Insufficient permissions: ${action} on ${resource}`);
    }
  }

  static getUserPermissions(userRole: UserRole): Permission[] {
    return PERMISSIONS.filter(permission => permission.roles.includes(userRole));
  }
}
