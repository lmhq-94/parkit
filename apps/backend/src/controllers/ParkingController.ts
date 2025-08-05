import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { logger } from '../utils/logger';

const router = Router();

// GET /api/parkings
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, zone } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (zone) {
      where.zone = { contains: String(zone), mode: 'insensitive' as const };
    }

    const [parkings, total] = await Promise.all([
      prisma.parking.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          company: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.parking.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: parkings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      }
    });
  } catch (error: any) {
    logger.error('Error obteniendo parqueos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// GET /api/parkings/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de parqueo requerido',
        code: 'MISSING_PARKING_ID'
      });
      return;
    }

    const parking = await prisma.parking.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!parking) {
      res.status(404).json({
        success: false,
        message: 'Parqueo no encontrado',
        code: 'PARKING_NOT_FOUND'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: parking
    });
  } catch (error: any) {
    logger.error('Error obteniendo parqueo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// POST /api/parkings
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      address,
      latitude,
      longitude,
      floor,
      section,
      spot,
      zone,
      status,
      capacity,
      price,
      currency,
      companyId
    } = req.body;

    if (!name || !address || !companyId) {
      res.status(400).json({
        success: false,
        message: 'Nombre, dirección y empresa son requeridos',
        code: 'MISSING_REQUIRED_FIELDS'
      });
      return;
    }

    const parking = await prisma.parking.create({
      data: {
        name,
        description,
        address,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        floor: floor ? Number(floor) : null,
        section,
        spot,
        zone,
        status: status || 'AVAILABLE',
        capacity: capacity ? Number(capacity) : 1,
        price: price ? Number(price) : 0,
        currency: currency || 'USD',
        companyId,
      },
      include: {
        company: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Parqueo creado exitosamente',
      data: parking
    });
  } catch (error: any) {
    logger.error('Error creando parqueo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// PUT /api/parkings/:id
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de parqueo requerido',
        code: 'MISSING_PARKING_ID'
      });
      return;
    }

    const parking = await prisma.parking.update({
      where: { id },
      data: updateData,
      include: {
        company: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Parqueo actualizado exitosamente',
      data: parking
    });
  } catch (error: any) {
    logger.error('Error actualizando parqueo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// DELETE /api/parkings/:id
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID de parqueo requerido',
        code: 'MISSING_PARKING_ID'
      });
      return;
    }

    await prisma.parking.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Parqueo eliminado exitosamente'
    });
  } catch (error: any) {
    logger.error('Error eliminando parqueo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router; 