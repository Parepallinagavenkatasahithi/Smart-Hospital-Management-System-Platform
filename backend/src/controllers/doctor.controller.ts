import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getDoctors = async (req: AuthRequest, res: Response) => {
  try {
    const departmentId = req.query.departmentId as string;
    const search = req.query.search as string;

    const where: any = {
      user: { role: 'DOCTOR' }
    };
    if (departmentId) where.departmentId = departmentId;
    if (search) {
      where.OR = [
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
        { specialization: { contains: search, mode: 'insensitive' } }
      ];
    }

    const doctors = await prisma.staff.findMany({
      where,
      include: {
        user: true,
        department: true
      },
      orderBy: { user: { firstName: 'asc' } }
    });

    return res.status(200).json({ success: true, data: doctors });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
