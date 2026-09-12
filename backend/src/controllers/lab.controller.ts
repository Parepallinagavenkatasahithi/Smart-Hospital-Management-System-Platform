import { Response } from 'express';
import { PrismaClient, LabStatus } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getLabRequests = async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string;
    const patientId = req.query.patientId as string;
    const where: any = {};
    if (status) where.status = status;
    if (patientId) where.patientId = patientId;

    if (req.user?.role === 'PATIENT') {
      const p = await prisma.patient.findUnique({ where: { userId: req.user.userId } });
      if (p) where.patientId = p.id;
    }

    const requests = await prisma.labRequest.findMany({
      where,
      include: {
        patient: { include: { user: true } },
        test: true,
        samples: true,
        results: true,
        report: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ success: true, data: requests });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const createLabRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, doctorId, testId, notes } = req.body;
    let docId = doctorId;
    if (req.user?.role === 'DOCTOR') {
      const staff = await prisma.staff.findUnique({ where: { userId: req.user.userId } });
      if (staff) docId = staff.id;
    }

    const labRequest = await prisma.labRequest.create({
      data: {
        requestNo: `LR-${Date.now()}`,
        patientId,
        doctorId: docId,
        testId,
        notes,
        status: LabStatus.ORDERED
      },
      include: { test: true }
    });

    return res.status(201).json({ success: true, data: labRequest });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const updateLabStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, resultData } = req.body;

    const labRequest = await prisma.labRequest.update({
      where: { id },
      data: {
        status: status as LabStatus,
        resultData: resultData || undefined
      }
    });

    return res.status(200).json({ success: true, data: labRequest });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
