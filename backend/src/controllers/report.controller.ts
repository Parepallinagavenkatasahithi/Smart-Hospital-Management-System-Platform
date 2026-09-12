import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getExecutiveAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalRevenueObj,
      totalBeds,
      occupiedBeds,
      pendingLabRequests,
      lowStockMedicines
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.staff.count({ where: { user: { role: 'DOCTOR' } } }),
      prisma.appointment.count(),
      prisma.invoice.aggregate({ _sum: { paidAmount: true } }),
      prisma.bed.count(),
      prisma.bed.count({ where: { status: 'OCCUPIED' } }),
      prisma.labRequest.count({ where: { status: { in: ['ORDERED', 'PENDING', 'SAMPLE_COLLECTED', 'PROCESSING'] } } }),
      prisma.medicine.count({ where: { totalStock: { lte: 25 } } })
    ]);

    const revenue = totalRevenueObj._sum.paidAmount || 0;
    const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        revenue,
        totalBeds,
        occupiedBeds,
        occupancyRate,
        pendingLabRequests,
        lowStockMedicines,
        monthlyTrends: [
          { month: 'Jan', revenue: 45000, appointments: 120, admissions: 30 },
          { month: 'Feb', revenue: 52000, appointments: 145, admissions: 35 },
          { month: 'Mar', revenue: 61000, appointments: 170, admissions: 42 },
          { month: 'Apr', revenue: 58000, appointments: 160, admissions: 38 },
          { month: 'May', revenue: 67000, appointments: 190, admissions: 45 },
          { month: 'Jun', revenue: 73000, appointments: 210, admissions: 50 }
        ]
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
