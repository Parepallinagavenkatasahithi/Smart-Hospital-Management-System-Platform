import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getMedicines = async (req: AuthRequest, res: Response) => {
  try {
    const search = req.query.search as string;
    const category = req.query.category as string;

    const where: any = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { genericName: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } }
      ];
    }

    const medicines = await prisma.medicine.findMany({
      where,
      include: { batches: true },
      orderBy: { name: 'asc' }
    });

    return res.status(200).json({ success: true, data: medicines });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const addMedicine = async (req: AuthRequest, res: Response) => {
  try {
    const { name, genericName, category, manufacturer, unitPrice, totalStock, reorderLevel } = req.body;
    const medicine = await prisma.medicine.create({
      data: {
        code: `MED-${Date.now()}`,
        name,
        genericName,
        category,
        manufacturer,
        unitPrice: parseFloat(unitPrice),
        totalStock: parseInt(totalStock) || 0,
        reorderLevel: parseInt(reorderLevel) || 20
      }
    });

    return res.status(201).json({ success: true, data: medicine });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
