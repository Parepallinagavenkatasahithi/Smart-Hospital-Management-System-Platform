import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getDepartments = async (req: AuthRequest, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        _count: { select: { staff: true, appointments: true } }
      },
      orderBy: { name: 'asc' }
    });

    return res.status(200).json({ success: true, data: departments });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
