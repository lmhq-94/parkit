import { z } from 'zod';

export const createReservationSchema = z.object({
  startTime: z.string().datetime('Fecha de inicio inválida'),
  endTime: z.string().datetime('Fecha de fin inválida'),
  vehicleId: z.string().uuid('ID de vehículo inválido'),
  parkingSpotId: z.string().uuid('ID de espacio de parqueo inválido'),
  userId: z.string().uuid('ID de usuario inválido'),
});

export const updateReservationSchema = createReservationSchema.partial();

export const reservationQuerySchema = z.object({
  userId: z.string().uuid().optional(),
  parkingId: z.string().uuid().optional(),
  status: z.enum(['pending', 'active', 'completed', 'cancelled']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const reservationStatusSchema = z.object({
  status: z.enum(['pending', 'active', 'completed', 'cancelled']),
  notes: z.string().optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;
export type ReservationQueryInput = z.infer<typeof reservationQuerySchema>;
export type ReservationStatusInput = z.infer<typeof reservationStatusSchema>; 