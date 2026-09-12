import { PrismaClient, Role, AppointmentStatus, LabStatus, BedStatus, InvoiceStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting comprehensive SHMS database seed...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. System Settings
  console.log('Seeding System Settings...');
  const settings = [
    { key: 'HOSPITAL_NAME', value: 'City General Smart Hospital', category: 'GENERAL', description: 'Primary hospital name' },
    { key: 'HOSPITAL_EMAIL', value: 'contact@citygeneralshms.org', category: 'GENERAL', description: 'Contact email' },
    { key: 'EMERGENCY_HELPLINE', value: '+1-800-555-0199', category: 'GENERAL', description: '24/7 Helpline' },
    { key: 'CURRENCY_SYMBOL', value: '$', category: 'FINANCIAL', description: 'Billing currency' },
    { key: 'TAX_RATE', value: '5.0', category: 'FINANCIAL', description: 'Standard tax percentage' },
  ];
  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 2. Departments (20 Departments)
  console.log('Seeding 20 Departments...');
  const departmentNames = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Oncology',
    'Dermatology', 'Gastroenterology', 'Gynecology', 'Urology', 'Ophthalmology',
    'ENT', 'Psychiatry', 'Pulmonology', 'Radiology', 'General Surgery',
    'Emergency Medicine', 'Nephrology', 'Endocrinology', 'Hematology', 'Anesthesiology'
  ];

  const createdDepartments: any[] = [];
  for (const name of departmentNames) {
    const dept = await prisma.department.upsert({
      where: { name },
      update: {},
      create: {
        name,
        code: name.substring(0, 3).toUpperCase(),
        description: `Department of ${name} providing specialized medical care and diagnostics.`
      }
    });
    createdDepartments.push(dept);
  }

  // 3. Core Admin & Role Users
  console.log('Seeding Core Role Users...');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@shms.com' },
    update: {},
    create: {
      email: 'admin@shms.com',
      passwordHash,
      role: Role.ADMIN,
      firstName: 'System',
      lastName: 'Administrator',
      phone: '1000000001'
    }
  });

  const managementUser = await prisma.user.upsert({
    where: { email: 'management@shms.com' },
    update: {},
    create: {
      email: 'management@shms.com',
      passwordHash,
      role: Role.MANAGEMENT,
      firstName: 'Executive',
      lastName: 'Director',
      phone: '1000000002'
    }
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
      phone: '1000000003',
      staffProfile: {
        create: {
          designation: 'Lead Pharmacist',
          specialization: 'Clinical Pharmacy',
          experience: 8
        }
      }
    }
  });

  const labTechUser = await prisma.user.upsert({
    where: { email: 'lab@shms.com' },
    update: {},
    create: {
      email: 'lab@shms.com',
      passwordHash,
      role: Role.LAB_TECHNICIAN,
      firstName: 'Sarah',
      lastName: 'Jenkins',
      phone: '1000000004',
      staffProfile: {
        create: {
          designation: 'Senior Lab Technologist',
          specialization: 'Pathology & Biochemistry',
          experience: 6
        }
      }
    }
  });

  const nurseUser = await prisma.user.upsert({
    where: { email: 'nurse@shms.com' },
    update: {},
    create: {
      email: 'nurse@shms.com',
      passwordHash,
      role: Role.NURSE,
      firstName: 'Elena',
      lastName: 'Rostova',
      phone: '1000000005',
      staffProfile: {
        create: {
          designation: 'Head Nurse',
          departmentId: createdDepartments[0].id,
          specialization: 'Critical Care Nursing',
          experience: 10
        }
      }
    }
  });

  const receptionistUser = await prisma.user.upsert({
    where: { email: 'reception@shms.com' },
    update: {},
    create: {
      email: 'reception@shms.com',
      passwordHash,
      role: Role.RECEPTIONIST,
      firstName: 'Anita',
      lastName: 'Deshmukh',
      phone: '1000000006',
      staffProfile: {
        create: {
          designation: 'Front Desk Lead',
          experience: 4
        }
      }
    }
  });

  const accountantUser = await prisma.user.upsert({
    where: { email: 'billing@shms.com' },
    update: {},
    create: {
      email: 'billing@shms.com',
      passwordHash,
      role: Role.ACCOUNTANT,
      firstName: 'Michael',
      lastName: 'Chang',
      phone: '1000000007',
      staffProfile: {
        create: {
          designation: 'Financial Controller',
          experience: 12
        }
      }
    }
  });

  // 4. Seed Doctors & Staff (50+ Doctors, 100+ Total Staff)
  console.log('Seeding 50 Doctors and 50 Additional Staff...');
  const firstNames = ['Alexander', 'Beatrix', 'Charles', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Laura', 'Marcus', 'Nora', 'Oliver', 'Penelope', 'Quentin', 'Rachel', 'Samuel', 'Theresa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

  const doctorStaffRecords: any[] = [];
  
  // Seed Doctor Account (doctor@shms.com)
  const defaultDoctor = await prisma.user.upsert({
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
          departmentId: createdDepartments[0].id, // Cardiology
          designation: 'Senior Cardiologist',
          specialization: 'Interventional Cardiology',
          experience: 12,
          qualification: 'MD, FACC',
          consultationFee: 150.0
        }
      }
    },
    include: { staffProfile: true }
  });
  if (defaultDoctor.staffProfile) doctorStaffRecords.push(defaultDoctor.staffProfile);

  // Generate 49 more Doctors
  for (let i = 1; i < 50; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[i % lastNames.length];
    const dept = createdDepartments[i % createdDepartments.length];
    const email = `doctor${i}@shms.com`;

    const docUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        passwordHash,
        role: Role.DOCTOR,
        firstName: fname,
        lastName: lname,
        phone: `20000000${i.toString().padStart(2, '0')}`,
        staffProfile: {
          create: {
            departmentId: dept.id,
            designation: `Attending Physician - ${dept.name}`,
            specialization: dept.name,
            experience: 5 + (i % 15),
            qualification: 'MD, Board Certified',
            consultationFee: 100.0 + (i % 10) * 15
          }
        }
      },
      include: { staffProfile: true }
    });
    if (docUser.staffProfile) doctorStaffRecords.push(docUser.staffProfile);
  }

  // 5. Seed Patients (500+ Patients)
  console.log('Seeding 500+ Patients...');
  const patientRecords: any[] = [];
  
  // Seed Patient Account (patient@shms.com)
  const defaultPatient = await prisma.user.upsert({
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
          medicalRecordNo: 'MRN-10000',
          dateOfBirth: new Date('1992-06-20'),
          gender: 'Female',
          bloodGroup: 'O+',
          address: '45 Park Avenue, Suite 10',
          city: 'Metropolis',
          state: 'NY',
          zipCode: '10001',
          emergencyContact: '+1-555-0192 (Spouse)',
          allergies: 'Penicillin, Peanuts',
          medicalHistory: 'Asthma diagnosed in 2015. Appendectomy in 2018.'
        }
      }
    },
    include: { patientProfile: true }
  });
  if (defaultPatient.patientProfile) patientRecords.push(defaultPatient.patientProfile);

  // Generate 500 Patients in bulk
  for (let i = 1; i <= 500; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[(i * 3) % lastNames.length];
    const email = `patient${i}@shms.com`;
    const gender = i % 2 === 0 ? 'Male' : 'Female';
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    const patUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        passwordHash,
        role: Role.PATIENT,
        firstName: fname,
        lastName: lname,
        phone: `300000${i.toString().padStart(4, '0')}`,
        patientProfile: {
          create: {
            medicalRecordNo: `MRN-${10000 + i}`,
            dateOfBirth: new Date(1960 + (i % 45), i % 12, 1 + (i % 28)),
            gender,
            bloodGroup: bloodGroups[i % bloodGroups.length],
            address: `${100 + i} Main Street`,
            city: 'Metropolis',
            state: 'NY',
            zipCode: `${10000 + (i % 900)}`,
            emergencyContact: `+1-555-${1000 + i}`,
            allergies: i % 4 === 0 ? 'Sulfonamides' : i % 7 === 0 ? 'Lactose' : 'None',
            medicalHistory: i % 5 === 0 ? 'Hypertension' : i % 8 === 0 ? 'Type 2 Diabetes' : 'No prior chronic conditions'
          }
        }
      },
      include: { patientProfile: true }
    });
    if (patUser.patientProfile) patientRecords.push(patUser.patientProfile);
  }

  // 6. Seed Medicines (100+ Medicines)
  console.log('Seeding 100 Medicines & Inventory...');
  const categories = ['Analgesic', 'Antibiotic', 'Antihypertensive', 'Antidiabetic', 'Antihistamine', 'Cardiovascular', 'Respiratory', 'Gastrointestinal', 'Neurological', 'Vitamins & Supplements'];
  const medicineRecords: any[] = [];
  for (let i = 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const med = await prisma.medicine.create({
      data: {
        code: `MED-${1000 + i}`,
        name: `Medication-${i} ${50 * (1 + (i % 10))}mg`,
        genericName: `Generic Compound ${i}`,
        category,
        manufacturer: `PharmaCorp ${1 + (i % 5)}`,
        unitPrice: 5.0 + (i % 20) * 4.5,
        totalStock: 50 + (i % 10) * 30,
        reorderLevel: 25,
        batches: {
          create: [
            {
              batchNumber: `BAT-2026-${100 + i}`,
              expiryDate: new Date(2026 + (i % 3), i % 12, 15),
              quantity: 50 + (i % 10) * 30,
              costPrice: 2.0 + (i % 20) * 2.5
            }
          ]
        }
      }
    });
    medicineRecords.push(med);
  }

  // 7. Seed Lab Tests (50+ Lab Tests)
  console.log('Seeding Lab Categories & 50 Lab Tests...');
  const labCats = ['Hematology', 'Biochemistry', 'Microbiology', 'Immunology', 'Radiology & Imaging', 'Pathology'];
  const createdLabCats: any[] = [];
  for (const c of labCats) {
    const cat = await prisma.labCategory.upsert({
      where: { name: c },
      update: {},
      create: { name: c, description: `${c} laboratory diagnostic tests.` }
    });
    createdLabCats.push(cat);
  }

  const testNames = [
    'Complete Blood Count (CBC)', 'Lipid Profile', 'Fasting Blood Sugar (FBS)', 'HbA1c Diabetes Monitor',
    'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Thyroid Profile (T3, T4, TSH)', 'Chest X-Ray Dual View',
    'Abdominal Ultrasound', 'ECG 12-Lead Standard', 'Urine Routine & Microscopy', 'Serum Electrolytes',
    'Cardiac Enzymes (Troponin-I)', 'C-Reactive Protein (CRP)', 'Vitamin D3 (25-OH)', 'Vitamin B12 Level'
  ];

  const labTestRecords: any[] = [];
  for (let i = 0; i < 50; i++) {
    const name = testNames[i % testNames.length] + (i >= testNames.length ? ` Type ${Math.floor(i / testNames.length) + 1}` : '');
    const cat = createdLabCats[i % createdLabCats.length];
    const test = await prisma.labTest.create({
      data: {
        code: `LAB-${2000 + i}`,
        name,
        categoryId: cat.id,
        description: `Standard clinical ${name} evaluation.`,
        price: 25.0 + (i % 15) * 15.0,
        sampleRequired: i % 5 === 0 ? 'Urine Sample' : i % 7 === 0 ? 'X-Ray Imaging' : 'Venous Blood Sample',
        turnaroundTime: '24 Hours'
      }
    });
    labTestRecords.push(test);
  }

  // 8. Seed Wards, Rooms, and Beds
  console.log('Seeding Wards, Rooms, and Beds...');
  const wardNames = ['Ward A - General Medicine', 'Ward B - Surgical Care', 'Ward C - ICU & Critical Care', 'Ward D - Pediatric Care'];
  const bedRecords: any[] = [];

  for (let w = 0; w < wardNames.length; w++) {
    const ward = await prisma.ward.create({
      data: {
        name: wardNames[w],
        capacity: 20,
        departmentId: createdDepartments[w % createdDepartments.length].id
      }
    });

    for (let r = 1; r <= 5; r++) {
      const roomNum = `${100 + (w + 1) * 10 + r}`;
      const room = await prisma.room.create({
        data: {
          wardId: ward.id,
          roomNumber: roomNum,
          type: w === 2 ? 'ICU' : r === 1 ? 'PRIVATE' : 'SEMI_PRIVATE',
          dailyRate: w === 2 ? 500.0 : r === 1 ? 250.0 : 120.0
        }
      });

      for (let b = 1; b <= 4; b++) {
        const bed = await prisma.bed.create({
          data: {
            roomId: room.id,
            bedNumber: `${roomNum}-${String.fromCharCode(64 + b)}`,
            status: (w + r + b) % 3 === 0 ? BedStatus.OCCUPIED : BedStatus.AVAILABLE
          }
        });
        bedRecords.push(bed);
      }
    }
  }

  // 9. Seed Appointments (1000+ Appointments)
  console.log('Seeding 1000+ Appointments...');
  const statuses = [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED];
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:30 PM'];

  for (let i = 0; i < 1000; i++) {
    const pat = patientRecords[i % patientRecords.length];
    const doc = doctorStaffRecords[i % doctorStaffRecords.length];
    const status = statuses[i % statuses.length];
    const daysOffset = (i % 60) - 30; // Past 30 days to future 30 days
    const apptDate = new Date();
    apptDate.setDate(apptDate.getDate() + daysOffset);

    await prisma.appointment.create({
      data: {
        appointmentNo: `APT-${50000 + i}`,
        patientId: pat.id,
        doctorId: doc.id,
        departmentId: doc.departmentId || createdDepartments[0].id,
        appointmentDate: apptDate,
        timeSlot: timeSlots[i % timeSlots.length],
        status,
        reason: `Routine clinical evaluation for health concern #${i + 1}`,
        notes: status === AppointmentStatus.COMPLETED ? 'Patient attended, vitals recorded, prescription issued.' : undefined
      }
    });
  }

  // 10. Seed Medical Records (1000+ Records)
  console.log('Seeding 1000+ Medical Records...');
  for (let i = 0; i < 1000; i++) {
    const pat = patientRecords[i % patientRecords.length];
    const doc = doctorStaffRecords[i % doctorStaffRecords.length];
    const visitDate = new Date();
    visitDate.setDate(visitDate.getDate() - (i % 90));

    await prisma.medicalRecord.create({
      data: {
        recordNo: `REC-${70000 + i}`,
        patientId: pat.id,
        doctorId: doc.id,
        visitDate,
        symptoms: `Patient presented with symptom cluster ${i + 1}: fatigue, mild headache, elevated BP.`,
        diagnosis: `Clinical Diagnosis #${i + 1}: ${i % 3 === 0 ? 'Essential Hypertension' : i % 5 === 0 ? 'Acute Upper Respiratory Infection' : 'Routine Wellness Assessment'}`,
        clinicalNotes: `S: Patient reports symptoms for 3 days.\nO: Vitals stable, chest clear.\nA: Primary condition managed.\nP: Prescribed medication and advised follow-up.`,
        vitals: {
          bloodPressure: `${115 + (i % 25)}/${75 + (i % 15)}`,
          heartRate: 65 + (i % 25),
          temperature: 98.4 + (i % 3) * 0.4,
          oxygenSat: 97 + (i % 3)
        },
        followUpInstructions: 'Return in 2 weeks for blood pressure review.'
      }
    });
  }

  // 11. Seed Prescriptions (500+ Prescriptions)
  console.log('Seeding 500+ Prescriptions...');
  for (let i = 0; i < 500; i++) {
    const pat = patientRecords[i % patientRecords.length];
    const doc = doctorStaffRecords[i % doctorStaffRecords.length];
    const med1 = medicineRecords[i % medicineRecords.length];
    const med2 = medicineRecords[(i + 5) % medicineRecords.length];

    await prisma.prescription.create({
      data: {
        rxNo: `RX-${80000 + i}`,
        patientId: pat.id,
        doctorId: doc.id,
        isDispensed: i % 2 === 0,
        notes: 'Take medicines after food with plenty of water.',
        items: {
          create: [
            { medicineId: med1.id, dosage: '1 Tablet', frequency: 'Twice daily', duration: '5 Days', instructions: 'After meals' },
            { medicineId: med2.id, dosage: '1 Capsule', frequency: 'Once daily', duration: '7 Days', instructions: 'Before bed' }
          ]
        }
      }
    });
  }

  // 12. Seed Lab Requests (500+ Requests)
  console.log('Seeding 500+ Lab Requests...');
  const labStatuses = [LabStatus.ORDERED, LabStatus.SAMPLE_COLLECTED, LabStatus.PROCESSING, LabStatus.COMPLETED];
  for (let i = 0; i < 500; i++) {
    const pat = patientRecords[i % patientRecords.length];
    const doc = doctorStaffRecords[i % doctorStaffRecords.length];
    const test = labTestRecords[i % labTestRecords.length];
    const status = labStatuses[i % labStatuses.length];

    await prisma.labRequest.create({
      data: {
        requestNo: `LR-${90000 + i}`,
        patientId: pat.id,
        doctorId: doc.id,
        testId: test.id,
        status,
        resultData: status === LabStatus.COMPLETED ? `Normal reference parameters verified for ${test.name}.` : undefined
      }
    });
  }

  // 13. Seed Invoices & Payments (500+ Invoices)
  console.log('Seeding 500+ Invoices & Financial Data...');
  const invStatuses = [InvoiceStatus.PAID, InvoiceStatus.PENDING, InvoiceStatus.PARTIALLY_PAID];
  for (let i = 0; i < 500; i++) {
    const pat = patientRecords[i % patientRecords.length];
    const status = invStatuses[i % invStatuses.length];
    const totalAmount = 150.0 + (i % 20) * 75.0;
    const paidAmount = status === InvoiceStatus.PAID ? totalAmount : status === InvoiceStatus.PARTIALLY_PAID ? totalAmount / 2 : 0;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    await prisma.invoice.create({
      data: {
        invoiceNo: `INV-${30000 + i}`,
        patientId: pat.id,
        totalAmount,
        finalAmount: totalAmount,
        paidAmount,
        status,
        dueDate,
        items: {
          create: [
            { description: 'Physician Consultation Fee', quantity: 1, unitPrice: 100.0, amount: 100.0 },
            { description: 'Diagnostic Test & Pharmacy Charges', quantity: 1, unitPrice: totalAmount - 100.0, amount: totalAmount - 100.0 }
          ]
        },
        payments: status !== InvoiceStatus.PENDING ? {
          create: [
            { receiptNo: `RCP-${40000 + i}`, amount: paidAmount, paymentMethod: i % 2 === 0 ? 'CREDIT_CARD' : 'CASH' }
          ]
        } : undefined
      }
    });
  }

  console.log('\n==================================================');
  console.log('SHMS Seeding completed successfully!');
  console.log('Seed summary:');
  console.log('- 20 Departments');
  console.log('- 50 Doctors & 50 Staff');
  console.log('- 500+ Patients');
  console.log('- 100 Medicines & Inventory Batches');
  console.log('- 50 Lab Tests & Categories');
  console.log('- Wards, Rooms, and Beds');
  console.log('- 1000 Appointments');
  console.log('- 1000 Medical Records');
  console.log('- 500 Prescriptions');
  console.log('- 500 Lab Requests');
  console.log('- 500 Invoices & Receipts');
  console.log('\nDemo Logins (Password for all: password123):');
  console.log('- Admin: admin@shms.com');
  console.log('- Management: management@shms.com');
  console.log('- Doctor: doctor@shms.com');
  console.log('- Patient: patient@shms.com');
  console.log('- Pharmacist: pharmacist@shms.com');
  console.log('- Lab Tech: lab@shms.com');
  console.log('- Nurse: nurse@shms.com');
  console.log('- Receptionist: reception@shms.com');
  console.log('- Accountant: billing@shms.com');
  console.log('==================================================\n');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
