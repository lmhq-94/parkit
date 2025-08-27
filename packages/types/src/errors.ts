export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
  timestamp: string;
  path?: string;
}

export class ValidationError extends Error implements AppError {
  public readonly code = 'VALIDATION_ERROR';
  public readonly statusCode = 400;
  public readonly timestamp: string;
  public readonly details?: Record<string, any>;

  constructor(message: string, details?: Record<string, any>) {
    super(message);
    this.name = 'ValidationError';
    this.timestamp = new Date().toISOString();
    this.details = details;
  }
}

export class AuthenticationError extends Error implements AppError {
  public readonly code = 'AUTHENTICATION_ERROR';
  public readonly statusCode = 401;
  public readonly timestamp: string;

  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
    this.timestamp = new Date().toISOString();
  }
}

export class AuthorizationError extends Error implements AppError {
  public readonly code = 'AUTHORIZATION_ERROR';
  public readonly statusCode = 403;
  public readonly timestamp: string;

  constructor(message: string = 'Insufficient permissions') {
    super(message);
    this.name = 'AuthorizationError';
    this.timestamp = new Date().toISOString();
  }
}

export class NotFoundError extends Error implements AppError {
  public readonly code = 'NOT_FOUND_ERROR';
  public readonly statusCode = 404;
  public readonly timestamp: string;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.timestamp = new Date().toISOString();
  }
}

export class ConflictError extends Error implements AppError {
  public readonly code = 'CONFLICT_ERROR';
  public readonly statusCode = 409;
  public readonly timestamp: string;

  constructor(message: string = 'Resource conflict') {
    super(message);
    this.name = 'ConflictError';
    this.timestamp = new Date().toISOString();
  }
}

export class InternalServerError extends Error implements AppError {
  public readonly code = 'INTERNAL_SERVER_ERROR';
  public readonly statusCode = 500;
  public readonly timestamp: string;

  constructor(message: string = 'Internal server error') {
    super(message);
    this.name = 'InternalServerError';
    this.timestamp = new Date().toISOString();
  }
}

export const isAppError = (error: any): error is AppError => {
  return error && typeof error === 'object' && 'code' in error && 'statusCode' in error;
}; 