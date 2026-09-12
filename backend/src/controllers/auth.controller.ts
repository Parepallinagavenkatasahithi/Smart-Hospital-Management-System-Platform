import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-for-shms-production';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Email and password are required' }
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        patientProfile: true,
        staffProfile: true
      }
    });

    if (!user || !user.isActive) {
      await prisma.loginAttempt.create({
        data: { email, success: false, ipAddress: req.ip }
      });
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      await prisma.loginAttempt.create({
        data: { userId: user.id, email, success: false, ipAddress: req.ip }
      });
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    await prisma.loginAttempt.create({
      data: { userId: user.id, email, success: true, ipAddress: req.ip }
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        resource: 'AUTH',
        ipAddress: req.ip,
        details: { role: user.role }
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          patientId: user.patientProfile?.id || null,
          staffId: user.staffProfile?.id || null,
          departmentId: user.staffProfile?.departmentId || null
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        patientProfile: true,
        staffProfile: { include: { department: true } }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        patientProfile: user.patientProfile,
        staffProfile: user.staffProfile
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone, role, dateOfBirth, gender } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: 'USER_EXISTS', message: 'User with this email already exists' }
      });
    }

    const passwordHash = await bcrypt.hash(password || 'password123', 10);
    const assignedRole = role && Object.values(Role).includes(role) ? role : Role.PATIENT;

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: assignedRole,
        firstName,
        lastName,
        phone,
        patientProfile: assignedRole === Role.PATIENT ? {
          create: {
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date('1990-01-01'),
            gender: gender || 'Unspecified',
            medicalRecordNo: `MRN-${Date.now()}`
          }
        } : undefined
      },
      include: { patientProfile: true, staffProfile: true }
    });

    return res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
