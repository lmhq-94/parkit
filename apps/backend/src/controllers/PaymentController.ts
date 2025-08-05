import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { logger } from '../utils/logger';

const router = Router();

// GET /api/payments
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

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: true,
          reservation: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: payments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      }
    });
  } catch (error: any) {
    logger.error('Error obteniendo pagos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/payments/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de pago requerido',
        code: 'MISSING_PAYMENT_ID'
      });
      return;
    }

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: true,
        reservation: true,
      },
    });

    if (!payment) {
      res.status(404).json({
        success: false,
        message: 'Pago no encontrado',
        code: 'PAYMENT_NOT_FOUND'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error: any) {
    logger.error('Error obteniendo pago:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/payments
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      amount,
      currency,
      method,
      status,
      transactionId,
      description,
      metadata,
      userId,
      reservationId
    } = req.body;

    if (!amount || !currency || !method || !userId) {
      res.status(400).json({
        success: false,
        message: 'Monto, moneda, método y usuario son requeridos',
        code: 'MISSING_REQUIRED_FIELDS'
      });
      return;
    }

    const payment = await prisma.payment.create({
      data: {
        amount: Number(amount),
        currency,
        method,
        status: status || 'PENDING',
        transactionId,
        description,
        metadata: metadata || {},
        userId,
        reservationId,
      },
      include: {
        user: true,
        reservation: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Pago creado exitosamente',
      data: payment
    });
  } catch (error: any) {
    logger.error('Error creando pago:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/payments/:id
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de pago requerido',
        code: 'MISSING_PAYMENT_ID'
      });
      return;
    }

    const payment = await prisma.payment.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        reservation: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Pago actualizado exitosamente',
      data: payment
    });
  } catch (error: any) {
    logger.error('Error actualizando pago:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/payments/:id
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de pago requerido',
        code: 'MISSING_PAYMENT_ID'
      });
      return;
    }

    await prisma.payment.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Pago eliminado exitosamente'
    });
  } catch (error: any) {
    logger.error('Error eliminando pago:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router; 