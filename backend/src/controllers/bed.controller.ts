import { Response } from 'express';
import { PrismaClient, BedStatus } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getWards = async (req: AuthRequest, res: Response) => {
  try {
    const wards = await prisma.ward.findMany({
      include: {
        department: true,
        rooms: { include: { beds: true } }
      }
    });

    return res.status(200).json({ success: true, data: wards });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const updateBedStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const bed = await prisma.bed.update({
      where: { id },
      data: { status: status as BedStatus }
    });

    return res.status(200).json({ success: true, data: bed });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
