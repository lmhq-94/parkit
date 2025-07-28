import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@parkit/shared';

export interface Permission {
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

export function usePermissions(): Permission {
  const { user } = useAuth();

  if (!user) {
    return {
      canViewDashboard: false,
      canManageUsers: false,
      canManageCompanies: false,
      canManageParkings: false,
      canManageReservations: false,
      canManageVehicles: false,
      canManagePayments: false,
      canManageEvents: false,
      canViewReports: false,
      canScanQR: false,
      canCreateReservations: false,
      canCancelReservations: false,
      canViewOwnReservations: false,
      canViewAllReservations: false,
    };
  }

  const { role } = user;

  switch (role) {
    case UserRole.ADMIN:
      return {
        canViewDashboard: true,
        canManageUsers: true,
        canManageCompanies: true,
        canManageParkings: true,
        canManageReservations: true,
        canManageVehicles: true,
        canManagePayments: true,
        canManageEvents: true,
        canViewReports: true,
        canScanQR: true,
        canCreateReservations: true,
        canCancelReservations: true,
        canViewOwnReservations: true,
        canViewAllReservations: true,
      };

    case UserRole.MANAGER:
      return {
        canViewDashboard: true,
        canManageUsers: false,
        canManageCompanies: false,
        canManageParkings: true,
        canManageReservations: true,
        canManageVehicles: false,
        canManagePayments: true,
        canManageEvents: true,
        canViewReports: true,
        canScanQR: true,
        canCreateReservations: true,
        canCancelReservations: true,
        canViewOwnReservations: true,
        canViewAllReservations: true,
      };

    case UserRole.VALET:
      return {
        canViewDashboard: true,
        canManageUsers: false,
        canManageCompanies: false,
        canManageParkings: false,
        canManageReservations: false,
        canManageVehicles: false,
        canManagePayments: false,
        canManageEvents: true,
        canViewReports: false,
        canScanQR: true,
        canCreateReservations: false,
        canCancelReservations: false,
        canViewOwnReservations: false,
        canViewAllReservations: true,
      };

    case UserRole.EMPLOYEE:
      return {
        canViewDashboard: true,
        canManageUsers: false,
        canManageCompanies: false,
        canManageParkings: false,
        canManageReservations: false,
        canManageVehicles: true,
        canManagePayments: false,
        canManageEvents: false,
        canViewReports: false,
        canScanQR: false,
        canCreateReservations: true,
        canCancelReservations: true,
        canViewOwnReservations: true,
        canViewAllReservations: false,
      };

    case UserRole.CLIENT:
      return {
        canViewDashboard: true,
        canManageUsers: false,
        canManageCompanies: false,
        canManageParkings: false,
        canManageReservations: false,
        canManageVehicles: true,
        canManagePayments: false,
        canManageEvents: false,
        canViewReports: false,
        canScanQR: false,
        canCreateReservations: true,
        canCancelReservations: true,
        canViewOwnReservations: true,
        canViewAllReservations: false,
      };

    default:
      return {
        canViewDashboard: false,
        canManageUsers: false,
        canManageCompanies: false,
        canManageParkings: false,
        canManageReservations: false,
        canManageVehicles: false,
        canManagePayments: false,
        canManageEvents: false,
        canViewReports: false,
        canScanQR: false,
        canCreateReservations: false,
        canCancelReservations: false,
        canViewOwnReservations: false,
        canViewAllReservations: false,
      };
  }
}
