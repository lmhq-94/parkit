import { PrismaClient } from '@parkit/database';
import {
  EventType,
  ParkingStatus,
  ReservationStatus,
  UserRole,
} from '@parkit/shared';
import { Context } from './context';
import { logger } from './utils/logger';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Auth
    me: async (_, __, { user, prisma }: Context) => {
      if (!user) throw new Error('Not authenticated');

      const startTime = Date.now();
      try {
        const result = await prisma.user.findUnique({
          where: { id: user.userId },
          include: { company: true },
        });

        logger.logDatabase('findUnique', 'users', Date.now() - startTime);
        return result;
      } catch (error) {
        logger.error('Error fetching user', error as Error);
        throw error;
      }
    },

    // Companies
    companies: async (_, { pagination = { page: 1, limit: 10 } }) => {
      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        prisma.company.findMany({
          skip,
          take: limit,
          where: { isActive: true },
        }),
        prisma.company.count({ where: { isActive: true } }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    company: async (_, { id }) => {
      return await prisma.company.findUnique({
        where: { id },
        include: {
          users: true,
          parkings: true,
          reservations: true,
          events: true,
          payments: true,
        },
      });
    },

    // Users
    users: async (
      _,
      { pagination = { page: 1, limit: 10 } },
      { user, prisma, checkPermission }: Context
    ) => {
      if (!user) throw new Error('Not authenticated');
      checkPermission('users', 'read');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const startTime = Date.now();
      try {
        const [data, total] = await Promise.all([
          prisma.user.findMany({
            skip,
            take: limit,
            where: { companyId: user.companyId },
            include: { company: true },
          }),
          prisma.user.count({ where: { companyId: user.companyId } }),
        ]);

        logger.logDatabase('findMany', 'users', Date.now() - startTime);

        return {
          data,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      } catch (error) {
        logger.error('Error fetching users', error as Error);
        throw error;
      }
    },

    user: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.user.findFirst({
        where: {
          id,
          companyId: user.companyId,
        },
        include: {
          company: true,
          vehicles: true,
          reservations: true,
          notifications: true,
        },
      });
    },

    // Vehicles
    vehicles: async (_, { pagination = { page: 1, limit: 10 } }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        prisma.vehicle.findMany({
          skip,
          take: limit,
          where: { user: { companyId: user.companyId } },
          include: { user: true },
        }),
        prisma.vehicle.count({
          where: { user: { companyId: user.companyId } },
        }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    vehicle: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.vehicle.findFirst({
        where: {
          id,
          user: { companyId: user.companyId },
        },
        include: { user: true },
      });
    },

    vehiclesByUser: async (_, { userId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.vehicle.findMany({
        where: {
          userId,
          user: { companyId: user.companyId },
        },
        include: { user: true },
      });
    },

    // Parkings
    parkings: async (
      _,
      { filter = {}, pagination = { page: 1, limit: 10 } },
      { user }
    ) => {
      if (!user) throw new Error('Not authenticated');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const where = {
        companyId: user.companyId,
        ...filter,
      };

      const [data, total] = await Promise.all([
        prisma.parking.findMany({
          skip,
          take: limit,
          where,
          include: { company: true },
        }),
        prisma.parking.count({ where }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    parking: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.parking.findFirst({
        where: {
          id,
          companyId: user.companyId,
        },
        include: { company: true },
      });
    },

    availableParkings: async (_, { companyId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.parking.findMany({
        where: {
          companyId: user.companyId,
          status: ParkingStatus.AVAILABLE,
          isActive: true,
        },
        include: { company: true },
      });
    },

    // Reservations
    reservations: async (
      _,
      { filter = {}, pagination = { page: 1, limit: 10 } },
      { user }
    ) => {
      if (!user) throw new Error('Not authenticated');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const where = {
        companyId: user.companyId,
        ...filter,
      };

      const [data, total] = await Promise.all([
        prisma.reservation.findMany({
          skip,
          take: limit,
          where,
          include: {
            user: true,
            vehicle: true,
            parking: true,
            company: true,
          },
          orderBy: { startTime: 'desc' },
        }),
        prisma.reservation.count({ where }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    reservation: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.reservation.findFirst({
        where: {
          id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
          events: true,
          payments: true,
        },
      });
    },

    reservationsByUser: async (_, { userId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.reservation.findMany({
        where: {
          userId,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
        orderBy: { startTime: 'desc' },
      });
    },

    // Events
    events: async (_, { pagination = { page: 1, limit: 10 } }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        prisma.event.findMany({
          skip,
          take: limit,
          where: { companyId: user.companyId },
          include: {
            user: true,
            vehicle: true,
            parking: true,
            reservation: true,
            company: true,
            evidences: true,
          },
          orderBy: { timestamp: 'desc' },
        }),
        prisma.event.count({ where: { companyId: user.companyId } }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    event: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.event.findFirst({
        where: {
          id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          reservation: true,
          company: true,
          evidences: true,
        },
      });
    },

    // Payments
    payments: async (_, { pagination = { page: 1, limit: 10 } }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        prisma.payment.findMany({
          skip,
          take: limit,
          where: { companyId: user.companyId },
          include: {
            user: true,
            reservation: true,
            company: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.payment.count({ where: { companyId: user.companyId } }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    payment: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.payment.findFirst({
        where: {
          id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          reservation: true,
          company: true,
        },
      });
    },

    // QR Codes
    qrCode: async (_, { code }) => {
      return await prisma.qRCode.findUnique({
        where: { code },
      });
    },

    qrCodesByType: async (_, { type }) => {
      return await prisma.qRCode.findMany({
        where: { type, isActive: true },
      });
    },

    // Notifications
    notifications: async (
      _,
      { pagination = { page: 1, limit: 10 } },
      { user }
    ) => {
      if (!user) throw new Error('Not authenticated');

      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        prisma.notification.findMany({
          skip,
          take: limit,
          where: { userId: user.id },
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.notification.count({ where: { userId: user.id } }),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },

    notification: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.notification.findFirst({
        where: {
          id,
          userId: user.id,
        },
        include: { user: true },
      });
    },

    notificationsByUser: async (_, { userId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.notification.findMany({
        where: { userId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    unreadNotifications: async (_, { userId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.notification.findMany({
        where: {
          userId,
          isRead: false,
        },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
    },
  },

  Mutation: {
    // Auth
    login: async (_, { input }) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: { email },
        include: { company: true },
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // In a real app, you would hash and compare passwords
      // For now, we'll just check if the password matches
      if (password !== 'user123') {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token (simplified)
      const token = `jwt_token_${user.id}`;

      return {
        token,
        user,
      };
    },

    register: async (_, { input }) => {
      const { email, password, firstName, lastName, role, companyId } = input;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          password, // In real app, hash this
          firstName,
          lastName,
          role,
          companyId,
        },
        include: { company: true },
      });

      // Generate JWT token
      const token = `jwt_token_${user.id}`;

      return {
        token,
        user,
      };
    },

    // Users
    createUser: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      if (user.role !== UserRole.ADMIN && user.role !== UserRole.MANAGER) {
        throw new Error('Insufficient permissions');
      }

      return await prisma.user.create({
        data: {
          ...input,
          companyId: user.companyId,
        },
        include: { company: true },
      });
    },

    updateUser: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.user.update({
        where: { id },
        data: input,
        include: { company: true },
      });
    },

    // Vehicles
    createVehicle: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.vehicle.create({
        data: {
          ...input,
          userId: user.id,
        },
        include: { user: true },
      });
    },

    updateVehicle: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.vehicle.update({
        where: { id },
        data: input,
        include: { user: true },
      });
    },

    // Parkings
    createParking: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      if (user.role !== UserRole.ADMIN && user.role !== UserRole.MANAGER) {
        throw new Error('Insufficient permissions');
      }

      return await prisma.parking.create({
        data: {
          ...input,
          companyId: user.companyId,
        },
        include: { company: true },
      });
    },

    updateParking: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.parking.update({
        where: { id },
        data: input,
        include: { company: true },
      });
    },

    updateParkingStatus: async (_, { id, status }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.parking.update({
        where: { id },
        data: { status },
        include: { company: true },
      });
    },

    // Reservations
    createReservation: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.reservation.create({
        data: {
          ...input,
          userId: user.id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
      });
    },

    updateReservation: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.reservation.update({
        where: { id },
        data: input,
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
      });
    },

    cancelReservation: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.reservation.update({
        where: { id },
        data: { status: ReservationStatus.CANCELLED },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
      });
    },

    confirmReservation: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.reservation.update({
        where: { id },
        data: { status: ReservationStatus.CONFIRMED },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
      });
    },

    // Events
    createEvent: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.event.create({
        data: {
          ...input,
          userId: user.id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          reservation: true,
          company: true,
          evidences: true,
        },
      });
    },

    recordEntry: async (_, { parkingId, vehicleId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      // Update parking status
      await prisma.parking.update({
        where: { id: parkingId },
        data: { status: ParkingStatus.OCCUPIED },
      });

      return await prisma.event.create({
        data: {
          type: EventType.ENTRY,
          description: 'Vehicle entered parking',
          parkingId,
          vehicleId,
          userId: user.id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
          evidences: true,
        },
      });
    },

    recordExit: async (_, { parkingId, vehicleId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      // Update parking status
      await prisma.parking.update({
        where: { id: parkingId },
        data: { status: ParkingStatus.AVAILABLE },
      });

      return await prisma.event.create({
        data: {
          type: EventType.EXIT,
          description: 'Vehicle exited parking',
          parkingId,
          vehicleId,
          userId: user.id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
          evidences: true,
        },
      });
    },

    // Payments
    createPayment: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.payment.create({
        data: {
          ...input,
          userId: user.id,
          companyId: user.companyId,
        },
        include: {
          user: true,
          reservation: true,
          company: true,
        },
      });
    },

    updatePaymentStatus: async (_, { id, status }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.payment.update({
        where: { id },
        data: { status },
        include: {
          user: true,
          reservation: true,
          company: true,
        },
      });
    },

    // QR Codes
    generateQRCode: async (_, { type, referenceId }) => {
      const code = `PARKIT_${type}_${referenceId}_${Date.now()}`;

      return await prisma.qRCode.create({
        data: {
          code,
          type,
          referenceId,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      });
    },

    deactivateQRCode: async (_, { id }) => {
      await prisma.qRCode.update({
        where: { id },
        data: { isActive: false },
      });
      return true;
    },

    // Notifications
    markNotificationAsRead: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      return await prisma.notification.update({
        where: { id },
        data: { isRead: true },
        include: { user: true },
      });
    },

    markAllNotificationsAsRead: async (_, { userId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });
      return true;
    },

    deleteNotification: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      await prisma.notification.delete({
        where: { id },
      });
      return true;
    },
  },
};
