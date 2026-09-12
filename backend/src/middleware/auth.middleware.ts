import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-for-shms-production';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Access token is missing or malformed' }
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Token is invalid or expired' }
    });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!roles.includes(req.user.role) && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: { code: 'INSUFFICIENT_PERMISSIONS', message: `Role ${req.user.role} does not have access to this resource` }
      });
    }

    next();
  };
};
