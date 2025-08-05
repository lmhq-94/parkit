import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { logger } from '../utils/logger';

const router = Router();

// GET /api/reservations
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (userId) {
      where.userId = userId;
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: true,
          vehicle: true,
          parking: true,
          company: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.reservation.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: reservations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      }
    });
  } catch (error: any) {
    logger.error('Error obteniendo reservas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/reservations/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de reserva requerido',
        code: 'MISSING_RESERVATION_ID'
      });
      return;
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        vehicle: true,
        parking: true,
        company: true,
      },
    });

    if (!reservation) {
      res.status(404).json({
        success: false,
        message: 'Reserva no encontrada',
        code: 'RESERVATION_NOT_FOUND'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error: any) {
    logger.error('Error obteniendo reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/reservations
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      startTime,
      endTime,
      status,
      totalPrice,
      notes,
      userId,
      vehicleId,
      parkingId,
      companyId
    } = req.body;

    if (!startTime || !endTime || !userId || !vehicleId || !parkingId) {
      res.status(400).json({
        success: false,
        message: 'Campos requeridos faltantes',
        code: 'MISSING_REQUIRED_FIELDS'
      });
      return;
    }

    const reservation = await prisma.reservation.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: status || 'PENDING',
        totalPrice: totalPrice ? Number(totalPrice) : 0,
        notes,
        userId,
        vehicleId,
        parkingId,
        companyId,
      },
      include: {
        user: true,
        vehicle: true,
        parking: true,
        company: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente',
      data: reservation
    });
  } catch (error: any) {
    logger.error('Error creando reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/reservations/:id
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de reserva requerido',
        code: 'MISSING_RESERVATION_ID'
      });
      return;
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        vehicle: true,
        parking: true,
        company: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Reserva actualizada exitosamente',
      data: reservation
    });
  } catch (error: any) {
    logger.error('Error actualizando reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/reservations/:id
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de reserva requerido',
        code: 'MISSING_RESERVATION_ID'
      });
      return;
    }

    await prisma.reservation.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Reserva eliminada exitosamente'
    });
  } catch (error: any) {
    logger.error('Error eliminando reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router; 