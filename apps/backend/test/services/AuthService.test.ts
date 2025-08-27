import { AuthService } from '../../src/services/AuthService';
import { PrismaClient } from '@prisma/client';
import { ConflictError, AuthenticationError, NotFoundError, InternalServerError } from '@parkit/types/errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock Prisma
jest.mock('@prisma/client');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
} as unknown as PrismaClient;

const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();
    (authService as any).prisma = mockPrisma;
  });

  describe('register', () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      roleId: 'role-id',
    };

    const mockCreatedUser = {
      id: 'user-id',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: { name: 'USER', permissions: [] },
      companyId: null,
    };

    it('should register a new user successfully', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockBcrypt.hash.mockResolvedValue('hashedPassword' as never);
      mockPrisma.user.create.mockResolvedValue(mockCreatedUser as any);
      mockJwt.sign.mockReturnValue('token' as any);

      // Act
      const result = await authService.register(mockUserData);

      // Assert
      expect(result.user.email).toBe(mockUserData.email);
      expect(result.user.firstName).toBe(mockUserData.firstName);
      expect(result.user.lastName).toBe(mockUserData.lastName);
      expect(mockBcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 12);
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });

    it('should throw ConflictError if user already exists', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'existing-user' } as any);

      // Act & Assert
      await expect(authService.register(mockUserData)).rejects.toThrow(ConflictError);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(authService.register(mockUserData)).rejects.toThrow('Database error');
    });
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 'user-id',
      email: 'test@example.com',
      password: 'hashedPassword',
      isActive: true,
      role: { name: 'USER', permissions: [] },
      companyId: null,
    };

    it('should login user successfully with valid credentials', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);
      mockBcrypt.compare.mockResolvedValue(true as never);
      mockPrisma.user.update.mockResolvedValue(mockUser as any);
      mockJwt.sign.mockReturnValue('token' as any);

      // Act
      const result = await authService.login(mockCredentials.email, mockCredentials.password);

      // Assert
      expect(result.user.email).toBe(mockCredentials.email);
      expect(mockBcrypt.compare).toHaveBeenCalledWith(mockCredentials.password, mockUser.password);
      expect(mockPrisma.user.update).toHaveBeenCalled();
    });

    it('should throw AuthenticationError if user not found', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login(mockCredentials.email, mockCredentials.password))
        .rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError if user is inactive', async () => {
      // Arrange
      const inactiveUser = { ...mockUser, isActive: false };
      mockPrisma.user.findUnique.mockResolvedValue(inactiveUser as any);

      // Act & Assert
      await expect(authService.login(mockCredentials.email, mockCredentials.password))
        .rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError if password is invalid', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);
      mockBcrypt.compare.mockResolvedValue(false as never);

      // Act & Assert
      await expect(authService.login(mockCredentials.email, mockCredentials.password))
        .rejects.toThrow(AuthenticationError);
    });

    it('should update lastLogin timestamp on successful login', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);
      mockBcrypt.compare.mockResolvedValue(true as never);
      mockPrisma.user.update.mockResolvedValue(mockUser as any);
      mockJwt.sign.mockReturnValue('token' as any);

      // Act
      await authService.login(mockCredentials.email, mockCredentials.password);

      // Assert
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { lastLogin: expect.any(Date) },
      });
    });
  });

  describe('refreshToken', () => {
    const mockToken = 'refresh-token';
    const mockDecoded = {
      userId: 'user-id',
      email: 'test@example.com',
      role: 'USER',
    };

    it('should refresh token successfully with valid refresh token', async () => {
      // Arrange
      mockJwt.verify.mockReturnValue(mockDecoded as any);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        isActive: true,
        role: { name: 'USER', permissions: [] },
        companyId: null,
      } as any);
      mockJwt.sign.mockReturnValue('new-token' as any);

      // Act
      const result = await authService.refreshToken(mockToken);

      // Assert
      expect(result).toBeDefined();
      expect(mockJwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
    });

    it('should throw AuthenticationError if refresh token is invalid', async () => {
      // Arrange
      mockJwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act & Assert
      await expect(authService.refreshToken(mockToken)).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError if user is not found', async () => {
      // Arrange
      mockJwt.verify.mockReturnValue(mockDecoded as any);
      mockPrisma.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.refreshToken(mockToken)).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError if user is inactive', async () => {
      // Arrange
      mockJwt.verify.mockReturnValue(mockDecoded as any);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        isActive: false,
        role: { name: 'USER', permissions: [] },
      } as any);

      // Act & Assert
      await expect(authService.refreshToken(mockToken)).rejects.toThrow(AuthenticationError);
    });
  });

  describe('resetPassword', () => {
    const mockEmail = 'test@example.com';

    it('should generate reset token for existing user', async () => {
      // Arrange
      const mockUser = { id: 'user-id', email: mockEmail };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);
      mockJwt.sign.mockReturnValue('reset-token' as any);

      // Act
      await authService.resetPassword(mockEmail);

      // Assert
      expect(mockJwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id, type: 'reset' },
        expect.any(String),
        { expiresIn: '1h' }
      );
    });

    it('should not fail if user does not exist', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.resetPassword(mockEmail)).resolves.not.toThrow();
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(authService.resetPassword(mockEmail)).rejects.toThrow(InternalServerError);
    });
  });

  describe('changePassword', () => {
    const mockUserId = 'user-id';
    const mockPasswordData = {
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword',
    };

    it('should change password successfully with valid data', async () => {
      // Arrange
      const mockUser = { id: mockUserId, password: 'hashedOldPassword' };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);
      mockBcrypt.compare.mockResolvedValue(true as never);
      mockBcrypt.hash.mockResolvedValue('hashedNewPassword' as never);
      mockPrisma.user.update.mockResolvedValue(mockUser as any);

      // Act
      await authService.changePassword(mockUserId, mockPasswordData);

      // Assert
      expect(mockBcrypt.compare).toHaveBeenCalledWith(mockPasswordData.currentPassword, mockUser.password);
      expect(mockBcrypt.hash).toHaveBeenCalledWith(mockPasswordData.newPassword, 12);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUserId },
        data: { password: 'hashedNewPassword' },
      });
    });

    it('should throw NotFoundError if user not found', async () => {
      // Arrange
      mockPrisma.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.changePassword(mockUserId, mockPasswordData))
        .rejects.toThrow(NotFoundError);
    });

    it('should throw AuthenticationError if current password is incorrect', async () => {
      // Arrange
      const mockUser = { id: mockUserId, password: 'hashedOldPassword' };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser as any);
      mockBcrypt.compare.mockResolvedValue(false as never);

      // Act & Assert
      await expect(authService.changePassword(mockUserId, mockPasswordData))
        .rejects.toThrow(AuthenticationError);
    });
  });
}); 