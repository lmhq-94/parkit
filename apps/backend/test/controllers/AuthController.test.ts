import request from 'supertest';
import express from 'express';
import { AuthController } from '../../src/controllers/AuthController';
import { AuthService } from '../../src/services/AuthService';
import { ValidationError, ConflictError, AuthenticationError } from '@parkit/types/errors';

// Mock AuthService
jest.mock('../../src/services/AuthService');

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  refreshToken: jest.fn(),
  resetPassword: jest.fn(),
  changePassword: jest.fn(),
} as jest.Mocked<AuthService>;

describe('AuthController', () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    
    // Mock the AuthService in the controller
    const authController = new AuthController();
    (authController as any).authService = mockAuthService;
    
    app.use('/api/auth', authController.router);
  });

  describe('POST /api/auth/register', () => {
    const validUserData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      roleId: 'role-id',
    };

    it('should register user successfully with valid data', async () => {
      // Arrange
      const mockResult = {
        user: { id: 'user-id', email: 'test@example.com' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      mockAuthService.register.mockResolvedValue(mockResult);

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Usuario registrado exitosamente');
      expect(response.body.data).toEqual(mockResult);
      expect(mockAuthService.register).toHaveBeenCalledWith(validUserData);
    });

    it('should return 400 for invalid email format', async () => {
      // Arrange
      const invalidData = { ...validUserData, email: 'invalid-email' };

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 409 when user already exists', async () => {
      // Arrange
      mockAuthService.register.mockRejectedValue(new ConflictError('El usuario ya existe'));

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData);

      // Assert
      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('CONFLICT_ERROR');
    });

    it('should return 500 for internal server errors', async () => {
      // Arrange
      mockAuthService.register.mockRejectedValue(new Error('Database connection failed'));

      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('INTERNAL_SERVER_ERROR');
    });
  });

  describe('POST /api/auth/login', () => {
    const validCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should login user successfully with valid credentials', async () => {
      // Arrange
      const mockResult = {
        user: { id: 'user-id', email: 'test@example.com' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      mockAuthService.login.mockResolvedValue(mockResult);

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(validCredentials);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login exitoso');
      expect(response.body.data).toEqual(mockResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(validCredentials.email, validCredentials.password);
    });

    it('should return 400 for invalid email format', async () => {
      // Arrange
      const invalidCredentials = { ...validCredentials, email: 'invalid-email' };

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidCredentials);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 401 for invalid credentials', async () => {
      // Arrange
      mockAuthService.login.mockRejectedValue(new AuthenticationError('Credenciales inválidas'));

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send(validCredentials);

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('AUTHENTICATION_ERROR');
    });
  });

  describe('POST /api/auth/refresh', () => {
    const validRefreshData = {
      refreshToken: 'valid-refresh-token',
    };

    it('should refresh token successfully with valid refresh token', async () => {
      // Arrange
      const mockResult = {
        user: { id: 'user-id', email: 'test@example.com' },
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      };
      mockAuthService.refreshToken.mockResolvedValue(mockResult);

      // Act
      const response = await request(app)
        .post('/api/auth/refresh')
        .send(validRefreshData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Token refrescado exitosamente');
      expect(response.body.data).toEqual(mockResult);
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(validRefreshData.refreshToken);
    });

    it('should return 400 for missing refresh token', async () => {
      // Arrange
      const invalidData = {};

      // Act
      const response = await request(app)
        .post('/api/auth/refresh')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 401 for invalid refresh token', async () => {
      // Arrange
      mockAuthService.refreshToken.mockRejectedValue(new AuthenticationError('Token inválido'));

      // Act
      const response = await request(app)
        .post('/api/auth/refresh')
        .send(validRefreshData);

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('AUTHENTICATION_ERROR');
    });
  });

  describe('POST /api/auth/reset-password', () => {
    const validResetData = {
      email: 'test@example.com',
    };

    it('should process reset password request successfully', async () => {
      // Arrange
      mockAuthService.resetPassword.mockResolvedValue(undefined);

      // Act
      const response = await request(app)
        .post('/api/auth/reset-password')
        .send(validResetData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Instrucciones de restablecimiento enviadas al email');
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(validResetData.email);
    });

    it('should return 400 for invalid email format', async () => {
      // Arrange
      const invalidData = { email: 'invalid-email' };

      // Act
      const response = await request(app)
        .post('/api/auth/reset-password')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/auth/change-password', () => {
    const validChangeData = {
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword',
    };

    it('should change password successfully with valid data', async () => {
      // Arrange
      mockAuthService.changePassword.mockResolvedValue(undefined);

      // Mock user in request
      app.use('/api/auth/change-password', (req, res, next) => {
        req.user = { id: 'user-id' };
        next();
      });

      // Act
      const response = await request(app)
        .post('/api/auth/change-password')
        .send(validChangeData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Contraseña cambiada exitosamente');
      expect(mockAuthService.changePassword).toHaveBeenCalledWith('user-id', validChangeData);
    });

    it('should return 400 for password mismatch', async () => {
      // Arrange
      const invalidData = {
        ...validChangeData,
        confirmPassword: 'differentPassword',
      };

      // Act
      const response = await request(app)
        .post('/api/auth/change-password')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for short new password', async () => {
      // Arrange
      const invalidData = {
        ...validChangeData,
        newPassword: '123',
        confirmPassword: '123',
      };

      // Act
      const response = await request(app)
        .post('/api/auth/change-password')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });
  });
}); 