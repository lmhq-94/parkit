import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export class PaymentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getPayments(page: number = 1, limit: number = 10, userId?: string) {
    try {
      const skip = (page - 1) * limit;
      const where = userId ? { userId } : {};

      const [payments, total] = await Promise.all([
        this.prisma.payment.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: true,
            reservation: {
              include: {
                parking: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.payment.count({ where }),
      ]);

      return {
        payments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error obteniendo pagos:', error);
      throw error;
    }
  }

  async getPaymentById(id: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { id },
        include: {
          user: true,
          reservation: {
            include: {
              parking: true,
            },
          },
        },
      });

      if (!payment) {
        throw new Error('Pago no encontrado');
      }

      return payment;
    } catch (error) {
      logger.error('Error obteniendo pago:', error);
      throw error;
    }
  }

  async createPayment(paymentData: any) {
    try {
      const payment = await this.prisma.payment.create({
        data: paymentData,
        include: {
          user: true,
          reservation: {
            include: {
              parking: true,
            },
          },
        },
      });

      return payment;
    } catch (error) {
      logger.error('Error creando pago:', error);
      throw error;
    }
  }

  async updatePayment(id: string, paymentData: any) {
    try {
      const payment = await this.prisma.payment.update({
        where: { id },
        data: paymentData,
        include: {
          user: true,
          reservation: {
            include: {
              parking: true,
            },
          },
        },
      });

      return payment;
    } catch (error) {
      logger.error('Error actualizando pago:', error);
      throw error;
    }
  }

  async deletePayment(id: string) {
    try {
      await this.prisma.payment.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error eliminando pago:', error);
      throw error;
    }
  }
} 