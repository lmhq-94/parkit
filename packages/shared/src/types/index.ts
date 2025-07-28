import { z } from 'zod';

// ========================================
// ENUMS
// ========================================

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
  VALET = 'VALET',
  MANAGER = 'MANAGER',
}

export enum ParkingStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
  DISABLED = 'DISABLED',
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

export enum EventType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
  RESERVATION_CREATED = 'RESERVATION_CREATED',
  RESERVATION_CANCELLED = 'RESERVATION_CANCELLED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  EVIDENCE_ADDED = 'EVIDENCE_ADDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

// ========================================
// ZOD SCHEMAS
// ========================================

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean(),
  companyId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  logo: z.string().optional(),
  taxId: z.string().optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const VehicleSchema = z.object({
  id: z.string(),
  licensePlate: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().optional(),
  color: z.string().optional(),
  vin: z.string().optional(),
  isActive: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ParkingSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  location: z.string(),
  floor: z.string().optional(),
  section: z.string().optional(),
  spotNumber: z.string(),
  isActive: z.boolean(),
  status: z.nativeEnum(ParkingStatus),
  hourlyRate: z.number(),
  dailyRate: z.number(),
  companyId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ReservationSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.nativeEnum(ReservationStatus),
  notes: z.string().optional(),
  userId: z.string(),
  vehicleId: z.string(),
  parkingId: z.string(),
  companyId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const EventSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(EventType),
  description: z.string().optional(),
  timestamp: z.date(),
  metadata: z.record(z.any()).optional(),
  userId: z.string().optional(),
  vehicleId: z.string().optional(),
  parkingId: z.string().optional(),
  reservationId: z.string().optional(),
  companyId: z.string(),
  createdAt: z.date(),
});

export const PaymentSchema = z.object({
  id: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.nativeEnum(PaymentStatus),
  method: z.nativeEnum(PaymentMethod),
  transactionId: z.string().optional(),
  description: z.string().optional(),
  userId: z.string(),
  reservationId: z.string().optional(),
  companyId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ========================================
// INPUT SCHEMAS
// ========================================

export const CreateUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  role: z.nativeEnum(UserRole),
  companyId: z.string().optional(),
});

export const CreateReservationInputSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
  notes: z.string().optional(),
  vehicleId: z.string(),
  parkingId: z.string(),
});

export const UpdateReservationInputSchema = z.object({
  status: z.nativeEnum(ReservationStatus).optional(),
  notes: z.string().optional(),
});

export const CreateEventInputSchema = z.object({
  type: z.nativeEnum(EventType),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  vehicleId: z.string().optional(),
  parkingId: z.string().optional(),
  reservationId: z.string().optional(),
});

// ========================================
// RESPONSE TYPES
// ========================================

export type User = z.infer<typeof UserSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type Parking = z.infer<typeof ParkingSchema>;
export type Reservation = z.infer<typeof ReservationSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Payment = z.infer<typeof PaymentSchema>;

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type CreateReservationInput = z.infer<typeof CreateReservationInputSchema>;
export type UpdateReservationInput = z.infer<typeof UpdateReservationInputSchema>;
export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;

// ========================================
// API RESPONSES
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ========================================
// UTILITIES
// ========================================

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => any;
}

export interface QRCodeData {
  code: string;
  type: string;
  referenceId: string;
  expiresAt?: Date;
} 