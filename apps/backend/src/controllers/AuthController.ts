import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { logger } from '../utils/logger';

const router = Router();
const authService = new AuthService();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone, companyId, roleId } = req.body;

    // Validar campos requeridos
    if (!email || !password || !firstName || !lastName || !roleId) {
      res.status(400).json({
        success: false,
        message: 'Campos requeridos faltantes',
        code: 'MISSING_REQUIRED_FIELDS'
      });
      return;
    }

    const result = await authService.register({
      email,
      password,
      firstName,
      lastName,
      phone,
      companyId,
      roleId,
    });

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: result
    });
  } catch (error: any) {
    logger.error('Error en registro:', error);
    
    if (error.message === 'El usuario ya existe') {
      res.status(409).json({
        success: false,
        message: error.message,
        code: 'USER_ALREADY_EXISTS'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
        code: 'MISSING_CREDENTIALS'
      });
      return;
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: result
    });
  } catch (error: any) {
    logger.error('Error en login:', error);
    
    if (error.message === 'Credenciales inválidas' || error.message === 'Usuario inactivo') {
      res.status(401).json({
        success: false,
        message: error.message,
        code: 'INVALID_CREDENTIALS'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh token es requerido',
        code: 'MISSING_REFRESH_TOKEN'
      });
      return;
    }

    const result = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refrescado exitosamente',
      data: result
    });
  } catch (error: any) {
    logger.error('Error refrescando token:', error);
    
    res.status(401).json({
      success: false,
      message: 'Token de refresh inválido',
      code: 'INVALID_REFRESH_TOKEN'
    });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email es requerido',
        code: 'MISSING_EMAIL'
      });
      return;
    }

    await authService.forgotPassword(email);

    res.status(200).json({
      success: true,
      message: 'Si el email existe, se ha enviado un enlace de recuperación'
    });
  } catch (error: any) {
    logger.error('Error en forgot password:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Reset token y nueva contraseña son requeridos',
        code: 'MISSING_RESET_DATA'
      });
      return;
    }

    await authService.resetPassword(resetToken, newPassword);

    res.status(200).json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error: any) {
    logger.error('Error en reset password:', error);
    
    res.status(400).json({
      success: false,
      message: 'Token de reset inválido o expirado',
      code: 'INVALID_RESET_TOKEN'
    });
  }
});

// POST /api/auth/change-password
router.post('/change-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Contraseña actual y nueva contraseña son requeridas',
        code: 'MISSING_PASSWORD_DATA'
      });
      return;
    }

    await authService.changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Contraseña cambiada exitosamente'
    });
  } catch (error: any) {
    logger.error('Error cambiando contraseña:', error);
    
    if (error.message === 'Contraseña actual incorrecta') {
      res.status(400).json({
        success: false,
        message: error.message,
        code: 'INVALID_CURRENT_PASSWORD'
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router; 