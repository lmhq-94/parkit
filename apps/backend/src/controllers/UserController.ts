import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { logger } from '../utils/logger';

const router = Router();

// GET /api/users/profile
router.get('/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        company: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
        code: 'USER_NOT_FOUND'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role.name,
        company: user.company,
        isActive: user.isActive,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (error: any) {
    logger.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/users/profile
router.put('/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { firstName, lastName, phone } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
      },
      include: {
        role: true,
        company: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        role: updatedUser.role.name,
        company: updatedUser.company,
      }
    });
  } catch (error: any) {
    logger.error('Error actualizando perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/users
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = search ? {
      OR: [
        { firstName: { contains: String(search), mode: 'insensitive' as const } },
        { lastName: { contains: String(search), mode: 'insensitive' as const } },
        { email: { contains: String(search), mode: 'insensitive' as const } },
      ]
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          role: true,
          company: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role.name,
        company: user.company,
        isActive: user.isActive,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      }
    });
  } catch (error: any) {
    logger.error('Error obteniendo usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario requerido',
        code: 'MISSING_USER_ID'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        company: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
        code: 'USER_NOT_FOUND'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role.name,
        company: user.company,
        isActive: user.isActive,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (error: any) {
    logger.error('Error obteniendo usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router; 