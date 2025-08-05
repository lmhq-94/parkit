import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export class NotificationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getNotifications(page: number = 1, limit: number = 10, userId: string) {
    try {
      const skip = (page - 1) * limit;

      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where: { userId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.notification.count({ where: { userId } }),
      ]);

      return {
        notifications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error obteniendo notificaciones:', error);
      throw error;
    }
  }

  async getNotificationById(id: string) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });

      if (!notification) {
        throw new Error('Notificación no encontrada');
      }

      return notification;
    } catch (error) {
      logger.error('Error obteniendo notificación:', error);
      throw error;
    }
  }

  async createNotification(notificationData: any) {
    try {
      const notification = await this.prisma.notification.create({
        data: notificationData,
      });

      return notification;
    } catch (error) {
      logger.error('Error creando notificación:', error);
      throw error;
    }
  }

  async markAsRead(id: string) {
    try {
      const notification = await this.prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });

      return notification;
    } catch (error) {
      logger.error('Error marcando notificación como leída:', error);
      throw error;
    }
  }

  async markAllAsRead(userId: string) {
    try {
      await this.prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error marcando todas las notificaciones como leídas:', error);
      throw error;
    }
  }

  async deleteNotification(id: string) {
    try {
      await this.prisma.notification.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error eliminando notificación:', error);
      throw error;
    }
  }

  async getUnreadCount(userId: string) {
    try {
      const count = await this.prisma.notification.count({
        where: { userId, isRead: false },
      });

      return count;
    } catch (error) {
      logger.error('Error obteniendo conteo de notificaciones no leídas:', error);
      throw error;
    }
  }
} 