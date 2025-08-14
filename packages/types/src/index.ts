// Basic types for ParkIt application
// This file provides essential type definitions

// Base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'user' | 'admin' | 'business';
  phone?: string;
}

// Company types
export interface Company extends BaseEntity {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
}

// Parking types
export interface Parking extends BaseEntity {
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  hourlyRate: number;
  companyId: string;
}

// Reservation types
export interface Reservation extends BaseEntity {
  userId: string;
  parkingId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  totalCost: number;
}

// Vehicle types
export interface Vehicle extends BaseEntity {
  userId: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
}

// Payment types
export interface Payment extends BaseEntity {
  reservationId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'credit_card' | 'debit_card' | 'paypal';
}

// Event types
export interface Event extends BaseEntity {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
}

// Notification types
export interface Notification extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
}

// QR Code types
export interface QRCode extends BaseEntity {
  code: string;
  parkingId: string;
  expiresAt: Date;
  used: boolean;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// GraphQL types
export interface GraphQLContext {
  user?: User;
  isAuthenticated: boolean;
}

// UI types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
} 