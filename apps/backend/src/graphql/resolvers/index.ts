import { GraphQLScalarType, Kind } from 'graphql';
import { authService, userService, parkingService, reservationService, paymentService, notificationService } from '../../index';

// Scalar resolvers
const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize(value: any) {
    return value.toISOString();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'JSON custom scalar type',
  serialize(value: any) {
    return value;
  },
  parseValue(value: any) {
    return value;
  },
  parseLiteral(ast) {
    return ast;
  },
});

export const resolvers = {
  DateTime: DateTimeScalar,
  JSON: JSONScalar,

  Query: {
    // Auth
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return context.user;
    },

    // Users
    users: async (_parent: any, { page, limit, companyId }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await userService.getUsers(page, limit, companyId);
    },

    user: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await userService.getUserById(id);
    },

    // Parkings
    parkings: async (_parent: any, { page, limit, companyId }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await parkingService.getParkings(page, limit, companyId);
    },

    parking: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await parkingService.getParkingById(id);
    },

    // Reservations
    reservations: async (_parent: any, { page, limit, userId }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await reservationService.getReservations(page, limit, userId);
    },

    reservation: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await reservationService.getReservationById(id);
    },

    // Payments
    payments: async (_parent: any, { page, limit, userId }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await paymentService.getPayments(page, limit, userId);
    },

    payment: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await paymentService.getPaymentById(id);
    },

    // Notifications
    notifications: async (_parent: any, { page, limit }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await notificationService.getNotifications(page, limit, context.user.id);
    },

    notification: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await notificationService.getNotificationById(id);
    },

    unreadNotificationsCount: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await notificationService.getUnreadCount(context.user.id);
    },

    // Stats
    userStats: async (_parent: any, { userId }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await userService.getUserStats(userId);
    },
  },

  Mutation: {
    // Auth
    login: async (_parent: any, { input }: any) => {
      return await authService.login(input.email, input.password);
    },

    register: async (_parent: any, { input }: any) => {
      return await authService.register(input);
    },

    refreshToken: async (_parent: any, { refreshToken }: any) => {
      return await authService.refreshToken(refreshToken);
    },

    changePassword: async (_parent: any, { currentPassword, newPassword }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await authService.changePassword(context.user.id, currentPassword, newPassword);
      return true;
    },

    forgotPassword: async (_parent: any, { email }: any) => {
      await authService.forgotPassword(email);
      return true;
    },

    resetPassword: async (_parent: any, { resetToken, newPassword }: any) => {
      await authService.resetPassword(resetToken, newPassword);
      return true;
    },

    // Users
    createUser: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await userService.createUser(input);
    },

    updateUser: async (_parent: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await userService.updateUser(id, input);
    },

    deleteUser: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await userService.deleteUser(id);
      return true;
    },

    // Parkings
    createParking: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await parkingService.createParking(input);
    },

    updateParking: async (_parent: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await parkingService.updateParking(id, input);
    },

    deleteParking: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await parkingService.deleteParking(id);
      return true;
    },

    // Reservations
    createReservation: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await reservationService.createReservation(input);
    },

    updateReservation: async (_parent: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await reservationService.updateReservation(id, input);
    },

    deleteReservation: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await reservationService.deleteReservation(id);
      return true;
    },

    // Payments
    createPayment: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await paymentService.createPayment(input);
    },

    updatePayment: async (_parent: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await paymentService.updatePayment(id, input);
    },

    deletePayment: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await paymentService.deletePayment(id);
      return true;
    },

    // Notifications
    markNotificationAsRead: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return await notificationService.markAsRead(id);
    },

    markAllNotificationsAsRead: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await notificationService.markAllAsRead(context.user.id);
      return true;
    },

    deleteNotification: async (_parent: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      await notificationService.deleteNotification(id);
      return true;
    },
  },

  Subscription: {
    // Real-time updates (placeholder for now)
    parkingStatusChanged: {
      subscribe: () => {
        // TODO: Implement WebSocket subscription
        return null;
      },
    },
    reservationUpdated: {
      subscribe: () => {
        // TODO: Implement WebSocket subscription
        return null;
      },
    },
    notificationCreated: {
      subscribe: () => {
        // TODO: Implement WebSocket subscription
        return null;
      },
    },
  },
}; 