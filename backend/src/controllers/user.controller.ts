import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const role = req.query.role as string;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (role) where.role = role;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          phone: true,
          isActive: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    return res.status(200).json({
      success: true,
      data: users,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const toggleUserStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive }
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
