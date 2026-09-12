import { Response } from 'express';
import { PrismaClient, InvoiceStatus } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const patientId = req.query.patientId as string;
    const status = req.query.status as string;

    const where: any = {};
    if (patientId) where.patientId = patientId;
    if (status) where.status = status;

    if (req.user?.role === 'PATIENT') {
      const p = await prisma.patient.findUnique({ where: { userId: req.user.userId } });
      if (p) where.patientId = p.id;
    }

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        patient: { include: { user: true } },
        items: true,
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ success: true, data: invoices });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const createInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, items, dueDate } = req.body;

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.unitPrice * (item.quantity || 1)), 0);
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: `INV-${Date.now()}`,
        patientId,
        totalAmount,
        finalAmount: totalAmount,
        paidAmount: 0,
        status: InvoiceStatus.PENDING,
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 86400000),
        items: {
          create: items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity || 1,
            unitPrice: parseFloat(item.unitPrice),
            amount: parseFloat(item.unitPrice) * (item.quantity || 1)
          }))
        }
      },
      include: { items: true }
    });

    return res.status(201).json({ success: true, data: invoice });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const recordPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { invoiceId, amount, paymentMethod } = req.body;

    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Invoice not found' } });
    }

    const newPaidAmount = invoice.paidAmount + parseFloat(amount);
    const newStatus = newPaidAmount >= invoice.finalAmount ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;

    const payment = await prisma.payment.create({
      data: {
        receiptNo: `RCP-${Date.now()}`,
        invoiceId,
        amount: parseFloat(amount),
        paymentMethod: paymentMethod || 'CASH'
      }
    });

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus
      }
    });

    return res.status(201).json({ success: true, data: payment });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
