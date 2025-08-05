import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export class ParkingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getParkings(page: number = 1, limit: number = 10, companyId?: string) {
    try {
      const skip = (page - 1) * limit;
      const where = companyId ? { companyId } : {};

      const [parkings, total] = await Promise.all([
        this.prisma.parking.findMany({
          where,
          skip,
          take: limit,
          include: {
            company: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.parking.count({ where }),
      ]);

      return {
        parkings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error obteniendo parqueos:', error);
      throw error;
    }
  }

  async getParkingById(id: string) {
    try {
      const parking = await this.prisma.parking.findUnique({
        where: { id },
        include: {
          company: true,
          reservations: {
            include: {
              user: true,
              vehicle: true,
            },
          },
        },
      });

      if (!parking) {
        throw new Error('Parqueo no encontrado');
      }

      return parking;
    } catch (error) {
      logger.error('Error obteniendo parqueo:', error);
      throw error;
    }
  }

  async createParking(parkingData: any) {
    try {
      const parking = await this.prisma.parking.create({
        data: parkingData,
        include: {
          company: true,
        },
      });

      return parking;
    } catch (error) {
      logger.error('Error creando parqueo:', error);
      throw error;
    }
  }

  async updateParking(id: string, parkingData: any) {
    try {
      const parking = await this.prisma.parking.update({
        where: { id },
        data: parkingData,
        include: {
          company: true,
        },
      });

      return parking;
    } catch (error) {
      logger.error('Error actualizando parqueo:', error);
      throw error;
    }
  }

  async deleteParking(id: string) {
    try {
      await this.prisma.parking.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error eliminando parqueo:', error);
      throw error;
    }
  }
} 