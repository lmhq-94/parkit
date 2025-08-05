import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUsers(page: number = 1, limit: number = 10, companyId?: string) {
    try {
      const skip = (page - 1) * limit;
      
      const where = companyId ? { companyId } : {};

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          skip,
          take: limit,
          include: {
            role: true,
            company: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.user.count({ where }),
      ]);

      return {
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          isActive: user.isActive,
          isVerified: user.isVerified,
          lastLogin: user.lastLogin,
          role: user.role.name,
          company: user.company?.name,
          createdAt: user.createdAt,
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error obteniendo usuarios:', error);
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          role: true,
          company: true,
          vehicles: true,
        },
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        role: user.role.name,
        company: user.company?.name,
        vehicles: user.vehicles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      logger.error('Error obteniendo usuario:', error);
      throw error;
    }
  }

  async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    roleId: string;
    companyId?: string;
  }) {
    try {
      const user = await this.prisma.user.create({
        data: userData,
        include: {
          role: true,
          company: true,
        },
      });

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role.name,
        company: user.company?.name,
        createdAt: user.createdAt,
      };
    } catch (error) {
      logger.error('Error creando usuario:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    roleId?: string;
    isActive?: boolean;
  }) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: userData,
        include: {
          role: true,
          company: true,
        },
      });

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role.name,
        company: user.company?.name,
        isActive: user.isActive,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      logger.error('Error actualizando usuario:', error);
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error eliminando usuario:', error);
      throw error;
    }
  }

  async getUserStats(userId: string) {
    try {
      const [reservations, payments, vehicles] = await Promise.all([
        this.prisma.reservation.count({ where: { userId } }),
        this.prisma.payment.count({ where: { userId } }),
        this.prisma.vehicle.count({ where: { userId } }),
      ]);

      return {
        totalReservations: reservations,
        totalPayments: payments,
        totalVehicles: vehicles,
      };
    } catch (error) {
      logger.error('Error obteniendo estadísticas de usuario:', error);
      throw error;
    }
  }
} 