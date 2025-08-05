import request from 'supertest';
import { app } from '../../index';
import { prisma } from '../../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('AuthController', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    roleId: 'role-1'
  };

  beforeEach(async () => {
    // Clean database before each test
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    
    // Create test role
    await prisma.role.create({
      data: {
        id: 'role-1',
        name: 'CLIENT',
        description: 'Test role',
        permissions: ['read:own']
      }
    });
  });

  afterEach(async () => {
    // Clean after each test
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Usuario registrado exitosamente');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.email).toBe(testUser.email);
    });

    it('should return error for missing required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          // password missing
          firstName: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('MISSING_REQUIRED_FIELDS');
    });

    it('should return error for duplicate email', async () => {
      // Crear usuario primero
      await request(app)
        .post('/api/auth/register')
        .send(testUser);

      // Intentar crear otro con el mismo email
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('USER_ALREADY_EXISTS');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Crear usuario para login tests
      await request(app)
        .post('/api/auth/register')
        .send(testUser);
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should return error for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('INVALID_CREDENTIALS');
    });

    it('should return error for missing credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email
          // password missing
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('MISSING_CREDENTIALS');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Crear usuario y obtener refresh token
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      refreshToken = registerResponse.body.data.refreshToken;
    });

    it('should refresh token successfully', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should return error for invalid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('INVALID_REFRESH_TOKEN');
    });
  });
}); 