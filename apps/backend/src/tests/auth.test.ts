import { UserRole } from '@parkit/shared';
import { AuthService } from '../utils/auth';
import { TestUser, TestUtils } from './setup';

describe('Authentication', () => {
  let testUser: TestUser;

  beforeAll(async () => {
    testUser = await TestUtils.createTestUser(UserRole.EMPLOYEE);
  });

  afterAll(async () => {
    await TestUtils.cleanupTestData();
  });

  describe('Password Hashing', () => {
    it('should hash passwords correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await AuthService.hashPassword(password);

      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword).toHaveLength(60); // bcrypt hash length
    });

    it('should verify passwords correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await AuthService.hashPassword(password);

      const isValid = await AuthService.comparePassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect passwords', async () => {
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword123';
      const hashedPassword = await AuthService.hashPassword(password);

      const isValid = await AuthService.comparePassword(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });
  });

  describe('JWT Tokens', () => {
    it('should generate valid access tokens', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: UserRole.EMPLOYEE,
        companyId: 'test-company-id',
      };

      const token = AuthService.generateAccessToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate valid refresh tokens', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: UserRole.EMPLOYEE,
        companyId: 'test-company-id',
      };

      const token = AuthService.generateRefreshToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate token pairs', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: UserRole.EMPLOYEE,
        companyId: 'test-company-id',
      };

      const tokenPair = AuthService.generateTokenPair(payload);
      expect(tokenPair.accessToken).toBeDefined();
      expect(tokenPair.refreshToken).toBeDefined();
      expect(tokenPair.accessToken).not.toBe(tokenPair.refreshToken);
    });

    it('should verify valid access tokens', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
        role: UserRole.EMPLOYEE,
        companyId: 'test-company-id',
      };

      const token = AuthService.generateAccessToken(payload);
      const verifiedPayload = AuthService.verifyAccessToken(token);

      expect(verifiedPayload.userId).toBe(payload.userId);
      expect(verifiedPayload.email).toBe(payload.email);
      expect(verifiedPayload.role).toBe(payload.role);
    });

    it('should reject invalid tokens', () => {
      expect(() => {
        AuthService.verifyAccessToken('invalid-token');
      }).toThrow('Invalid or expired access token');
    });
  });

  describe('Token Extraction', () => {
    it('should extract token from valid authorization header', () => {
      const token = 'valid-jwt-token';
      const authHeader = `Bearer ${token}`;

      const extractedToken = AuthService.extractTokenFromHeader(authHeader);
      expect(extractedToken).toBe(token);
    });

    it('should return null for invalid authorization header', () => {
      const authHeader = 'InvalidHeader';

      const extractedToken = AuthService.extractTokenFromHeader(authHeader);
      expect(extractedToken).toBeNull();
    });

    it('should return null for missing authorization header', () => {
      const extractedToken = AuthService.extractTokenFromHeader();
      expect(extractedToken).toBeNull();
    });
  });
});
