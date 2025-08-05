import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';
import { logger } from '../utils/logger';

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  companyId?: string | null;
  roleId: string;
}

interface UserWithRole {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  companyId: string | null;
  password: string | null;
  isActive: boolean;
  isVerified: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  roleId: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
  company?: {
    id: string;
    name: string;
  } | null;
}

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async register(userData: UserData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(userData.password, config.auth.bcryptRounds);

      // Crear el usuario
      const user = await this.prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || null,
          companyId: userData.companyId || null,
          roleId: userData.roleId,
        },
        include: {
          role: true,
          company: true,
        },
      });

      // Generar tokens
      const tokens = this.generateTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.name,
          companyId: user.companyId,
        },
        ...tokens,
      };
    } catch (error) {
      logger.error('Error en registro:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      // Buscar usuario
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          role: true,
          company: true,
        },
      });

      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      if (!user.isActive) {
        throw new Error('Usuario inactivo');
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password || '');
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      // Actualizar último login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      // Generar tokens
      const tokens = this.generateTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.name,
          companyId: user.companyId,
        },
        ...tokens,
      };
    } catch (error) {
      logger.error('Error en login:', error);
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          role: true,
          company: true,
        },
      });

      if (!user || !user.isActive) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        companyId: user.companyId,
        permissions: user.role.permissions,
      };
    } catch (error) {
      logger.error('Error verificando token:', error);
      return null;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.secret) as any;
      
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          role: true,
          company: true,
        },
      });

      if (!user || !user.isActive) {
        throw new Error('Usuario no encontrado o inactivo');
      }

      const tokens = this.generateTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.name,
          companyId: user.companyId,
        },
        ...tokens,
      };
    } catch (error) {
      logger.error('Error refrescando token:', error);
      throw error;
    }
  }

  private generateTokens(user: UserWithRole) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role.name,
      companyId: user.companyId,
    };

    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpiresIn,
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar contraseña actual
      const isValidPassword = await bcrypt.compare(currentPassword, user.password || '');
      if (!isValidPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      // Hashear nueva contraseña
      const hashedNewPassword = await bcrypt.hash(newPassword, config.auth.bcryptRounds);

      // Actualizar contraseña
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error cambiando contraseña:', error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // No revelar si el usuario existe o no
        return { success: true };
      }

      // Generar token de reset
      const resetToken = jwt.sign(
        { userId: user.id, type: 'password_reset' },
        config.jwt.secret,
        { expiresIn: '1h' }
      );

      // TODO: Enviar email con token de reset
      logger.info(`Token de reset para ${email}: ${resetToken}`);

      return { success: true };
    } catch (error) {
      logger.error('Error en forgot password:', error);
      throw error;
    }
  }

  async resetPassword(resetToken: string, newPassword: string) {
    try {
      const decoded = jwt.verify(resetToken, config.jwt.secret) as any;
      
      if (decoded.type !== 'password_reset') {
        throw new Error('Token inválido');
      }

      const hashedPassword = await bcrypt.hash(newPassword, config.auth.bcryptRounds);

      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error en reset password:', error);
      throw error;
    }
  }
} 