import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getPatients = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || '';
    const skip = (page - 1) * limit;

    const where: any = search ? {
      OR: [
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { medicalRecordNo: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.patient.count({ where })
    ]);

    return res.status(200).json({
      success: true,
      data: patients,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const getPatientById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        user: true,
        allergies: true,
        conditions: true,
        vitals: { orderBy: { recordedAt: 'desc' }, take: 10 },
        appointments: { include: { doctor: { include: { user: true } }, department: true }, orderBy: { appointmentDate: 'desc' }, take: 5 },
        medicalRecords: { include: { doctor: { include: { user: true } } }, orderBy: { visitDate: 'desc' }, take: 5 },
        prescriptions: { include: { items: { include: { medicine: true } } }, orderBy: { createdAt: 'desc' }, take: 5 },
        labRequests: { include: { test: true }, orderBy: { createdAt: 'desc' }, take: 5 },
        invoices: { orderBy: { createdAt: 'desc' }, take: 5 }
      }
    });

    if (!patient) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Patient not found' } });
    }

    return res.status(200).json({ success: true, data: patient });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const createPatient = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, email, phone, dateOfBirth, gender, bloodGroup, address, emergencyContact, allergies, medicalHistory } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: { code: 'USER_EXISTS', message: 'Email already registered' } });
    }

    const patient = await prisma.patient.create({
      data: {
        medicalRecordNo: `MRN-${Date.now()}`,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bloodGroup,
        address,
        emergencyContact,
        allergies,
        medicalHistory,
        user: {
          create: {
            email,
            passwordHash: '$2b$10$e8w.W6w/6T6W8L.6k9m.e.Yn6z.X7y8u9v0', // Default initial hash
            role: 'PATIENT',
            firstName,
            lastName,
            phone
          }
        }
      },
      include: { user: true }
    });

    return res.status(201).json({ success: true, data: patient });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
