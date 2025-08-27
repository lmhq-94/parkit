import { z } from 'zod';

export const createParkingSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  address: z.string().min(10, 'La dirección debe tener al menos 10 caracteres'),
  capacity: z.number().int().positive('La capacidad debe ser un número positivo'),
  hourlyRate: z.number().positive('La tarifa por hora debe ser positiva'),
  isActive: z.boolean().default(true),
  companyId: z.string().uuid('ID de empresa inválido'),
});

export const updateParkingSchema = createParkingSchema.partial();

export const parkingSpotSchema = z.object({
  spotNumber: z.string().min(1, 'Número de espacio requerido'),
  floor: z.number().int().min(0, 'El piso debe ser un número entero no negativo'),
  section: z.string().min(1, 'Sección requerida'),
  isReserved: z.boolean().default(false),
  isMaintenance: z.boolean().default(false),
  parkingId: z.string().uuid('ID de parqueo inválido'),
});

export const parkingQuerySchema = z.object({
  companyId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
  capacity: z.number().int().positive().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type CreateParkingInput = z.infer<typeof createParkingSchema>;
export type UpdateParkingInput = z.infer<typeof updateParkingSchema>;
export type ParkingSpotInput = z.infer<typeof parkingSpotSchema>;
export type ParkingQueryInput = z.infer<typeof parkingQuerySchema>; 