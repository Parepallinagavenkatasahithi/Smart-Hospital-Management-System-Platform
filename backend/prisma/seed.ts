import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  const passwordHash = await bcrypt.hash('password123', 10);

  // Departments
  const cardiology = await prisma.department.upsert({
    where: { name: 'Cardiology' },
    update: {},
    create: { name: 'Cardiology', description: 'Heart and cardiovascular diseases' },
  });
  
  const neurology = await prisma.department.upsert({
    where: { name: 'Neurology' },
    update: {},
    create: { name: 'Neurology', description: 'Disorders of the nervous system' },
  });

  const pediatrics = await prisma.department.upsert({
    where: { name: 'Pediatrics' },
    update: {},
    create: { name: 'Pediatrics', description: 'Medical care of infants, children, and adolescents' },
  });

  // Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@shms.com' },
    update: {},
    create: {
      email: 'admin@shms.com',
      passwordHash,
      role: Role.MANAGEMENT,
      firstName: 'System',
      lastName: 'Admin',
      phone: '1234567890'
    },
  });

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@shms.com' },
    update: {},
    create: {
      email: 'doctor@shms.com',
      passwordHash,
      role: Role.DOCTOR,
      firstName: 'Priya',
      lastName: 'Sharma',
      phone: '0987654321',
      staffProfile: {
        create: {
          departmentId: cardiology.id,
          specialization: 'Cardiologist',
          experience: 10,
          qualification: 'MD, DM Cardiology',
          consultationFee: 1000
        }
      }
    },
  });

  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@shms.com' },
    update: {},
    create: {
      email: 'patient@shms.com',
      passwordHash,
      role: Role.PATIENT,
      firstName: 'Mounika',
      lastName: 'Reddy',
      phone: '1122334455',
      patientProfile: {
        create: {
          dateOfBirth: new Date('1990-05-15'),
          gender: 'Female',
          address: 'Hyderabad, Telangana',
          bloodGroup: 'O+',
          emergencyContact: '9988776655'
        }
      }
    },
  });

  const pharmacistUser = await prisma.user.upsert({
    where: { email: 'pharmacist@shms.com' },
    update: {},
    create: {
      email: 'pharmacist@shms.com',
      passwordHash,
      role: Role.PHARMACIST,
      firstName: 'Ravi',
      lastName: 'Kumar',
      phone: '5566778899',
      staffProfile: {
        create: {
          specialization: 'Clinical Pharmacist',
          experience: 5
        }
      }
    },
  });

  // Medicines
  await prisma.medicine.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Paracetamol 500mg', category: 'Analgesic', quantity: 500, price: 10.0, expiryDate: new Date('2026-12-31') },
      { name: 'Amoxicillin 250mg', category: 'Antibiotic', quantity: 200, price: 25.0, expiryDate: new Date('2025-10-15') },
      { name: 'Aspirin 75mg', category: 'Blood Thinner', quantity: 300, price: 15.0, expiryDate: new Date('2026-05-20') }
    ]
  });

  // Lab Tests
  await prisma.labTest.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Complete Blood Count (CBC)', description: 'Evaluates overall health', price: 500.0 },
      { name: 'Lipid Profile', description: 'Measures cholesterol levels', price: 800.0 },
      { name: 'Fasting Blood Sugar', description: 'Diabetes screening', price: 200.0 }
    ]
  });

  // Rooms and Beds
  const room = await prisma.room.upsert({
    where: { number: '101' },
    update: {},
    create: {
      number: '101',
      type: 'General',
      ward: 'A',
      beds: {
        create: [
          { number: '101-A' },
          { number: '101-B' }
        ]
      }
    }
  });

  console.log('Seed completed successfully!');
  console.log('Demo Accounts:');
  console.log('Management: admin@shms.com / password123');
  console.log('Doctor: doctor@shms.com / password123');
  console.log('Patient: patient@shms.com / password123');
  console.log('Pharmacist: pharmacist@shms.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
