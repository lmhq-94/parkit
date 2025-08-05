import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export class ReservationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getReservations(page: number = 1, limit: number = 10, userId?: string) {
    try {
      const skip = (page - 1) * limit;
      const where = userId ? { userId } : {};

      const [reservations, total] = await Promise.all([
        this.prisma.reservation.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: true,
            vehicle: true,
            parking: true,
            company: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.reservation.count({ where }),
      ]);

      return {
        reservations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error obteniendo reservas:', error);
      throw error;
    }
  }

  async getReservationById(id: string) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
          payments: true,
        },
      });

      if (!reservation) {
        throw new Error('Reserva no encontrada');
      }

      return reservation;
    } catch (error) {
      logger.error('Error obteniendo reserva:', error);
      throw error;
    }
  }

  async createReservation(reservationData: any) {
    try {
      const reservation = await this.prisma.reservation.create({
        data: reservationData,
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
      });

      return reservation;
    } catch (error) {
      logger.error('Error creando reserva:', error);
      throw error;
    }
  }

  async updateReservation(id: string, reservationData: any) {
    try {
      const reservation = await this.prisma.reservation.update({
        where: { id },
        data: reservationData,
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
      });

      return reservation;
    } catch (error) {
      logger.error('Error actualizando reserva:', error);
      throw error;
    }
  }

  async deleteReservation(id: string) {
    try {
      await this.prisma.reservation.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error eliminando reserva:', error);
      throw error;
    }
  }
} 