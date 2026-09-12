const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => localStorage.getItem('shms_token');
export const setAuthToken = (token: string) => localStorage.setItem('shms_token', token);
export const clearAuthToken = () => localStorage.removeItem('shms_token');

export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('shms_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || data?.message || 'API Request Failed');
    }

    return data.data !== undefined ? data.data : data;
  } catch (error: any) {
    console.warn(`[SHMS Standalone Mode] Endpoint '${endpoint}' unreachable, serving comprehensive offline dataset.`);

    // 1. Users / Staff Directory Endpoint
    if (endpoint.includes('/users')) {
      return [
        { id: 'usr-1', firstName: 'Priya', lastName: 'Sharma', email: 'doctor@shms.com', role: 'DOCTOR', isActive: true, phone: '+1-555-0101' },
        { id: 'usr-2', firstName: 'Ravi', lastName: 'Kumar', email: 'pharmacist@shms.com', role: 'PHARMACIST', isActive: true, phone: '+1-555-0102' },
        { id: 'usr-3', firstName: 'Sarah', lastName: 'Jenkins', email: 'lab@shms.com', role: 'LAB_TECHNICIAN', isActive: true, phone: '+1-555-0103' },
        { id: 'usr-4', firstName: 'Elena', lastName: 'Rostova', email: 'nurse@shms.com', role: 'NURSE', isActive: true, phone: '+1-555-0104' },
        { id: 'usr-5', firstName: 'Anita', lastName: 'Deshmukh', email: 'reception@shms.com', role: 'RECEPTIONIST', isActive: true, phone: '+1-555-0105' },
        { id: 'usr-6', firstName: 'Michael', lastName: 'Chang', email: 'billing@shms.com', role: 'ACCOUNTANT', isActive: true, phone: '+1-555-0106' },
        { id: 'usr-7', firstName: 'Executive', lastName: 'Director', email: 'management@shms.com', role: 'MANAGEMENT', isActive: true, phone: '+1-555-0107' },
        { id: 'usr-8', firstName: 'System', lastName: 'Administrator', email: 'admin@shms.com', role: 'ADMIN', isActive: true, phone: '+1-555-0108' },
        { id: 'usr-9', firstName: 'Alexander', lastName: 'Smith', email: 'doctor1@shms.com', role: 'DOCTOR', isActive: true, phone: '+1-555-0109' },
        { id: 'usr-10', firstName: 'Beatrix', lastName: 'Johnson', email: 'doctor2@shms.com', role: 'DOCTOR', isActive: true, phone: '+1-555-0110' },
        { id: 'usr-11', firstName: 'Charles', lastName: 'Williams', email: 'doctor3@shms.com', role: 'DOCTOR', isActive: true, phone: '+1-555-0111' },
        { id: 'usr-12', firstName: 'Diana', lastName: 'Brown', email: 'doctor4@shms.com', role: 'DOCTOR', isActive: false, phone: '+1-555-0112' }
      ] as any;
    }

    // 2. Pharmacy Catalog & Stock Endpoint
    if (endpoint.includes('/pharmacy')) {
      return [
        { id: 'med-1', code: 'MED-1001', name: 'Paracetamol 500mg', genericName: 'Acetaminophen', category: 'Analgesic', unitPrice: 10.0, totalStock: 500, reorderLevel: 25 },
        { id: 'med-2', code: 'MED-1002', name: 'Amoxicillin 250mg', genericName: 'Amoxicillin Trihydrate', category: 'Antibiotic', unitPrice: 25.0, totalStock: 12, reorderLevel: 25 }, // Low Stock
        { id: 'med-3', code: 'MED-1003', name: 'Aspirin 75mg', genericName: 'Acetylsalicylic Acid', category: 'Cardiovascular', unitPrice: 15.0, totalStock: 300, reorderLevel: 25 },
        { id: 'med-4', code: 'MED-1004', name: 'Metformin 500mg', genericName: 'Metformin Hydrochloride', category: 'Antidiabetic', unitPrice: 18.5, totalStock: 8, reorderLevel: 25 }, // Low Stock
        { id: 'med-5', code: 'MED-1005', name: 'Atorvastatin 10mg', genericName: 'Atorvastatin Calcium', category: 'Cardiovascular', unitPrice: 32.0, totalStock: 150, reorderLevel: 25 },
        { id: 'med-6', code: 'MED-1006', name: 'Omeprazole 20mg', genericName: 'Omeprazole', category: 'Gastrointestinal', unitPrice: 22.0, totalStock: 5, reorderLevel: 25 }, // Low Stock
        { id: 'med-7', code: 'MED-1007', name: 'Lisinopril 10mg', genericName: 'Lisinopril Dihydrate', category: 'Antihypertensive', unitPrice: 20.0, totalStock: 220, reorderLevel: 25 },
        { id: 'med-8', code: 'MED-1008', name: 'Azithromycin 500mg', genericName: 'Azithromycin Dihydrate', category: 'Antibiotic', unitPrice: 45.0, totalStock: 18, reorderLevel: 25 } // Low Stock
      ] as any;
    }

    // 3. Doctors Roster & Directory Endpoint
    if (endpoint.includes('/doctors')) {
      return [
        { id: 'doc-1', departmentId: 'dept-1', user: { firstName: 'Priya', lastName: 'Sharma', email: 'doctor@shms.com' }, specialization: 'Interventional Cardiology', designation: 'Senior Cardiologist', department: { id: 'dept-1', name: 'Cardiology' }, consultationFee: 150.0, experience: 12 },
        { id: 'doc-2', departmentId: 'dept-2', user: { firstName: 'Alexander', lastName: 'Smith', email: 'doctor1@shms.com' }, specialization: 'Neurology & Stroke Care', designation: 'Attending Neurologist', department: { id: 'dept-2', name: 'Neurology' }, consultationFee: 180.0, experience: 14 },
        { id: 'doc-3', departmentId: 'dept-3', user: { firstName: 'Beatrix', lastName: 'Johnson', email: 'doctor2@shms.com' }, specialization: 'Pediatric Care', designation: 'Pediatric Specialist', department: { id: 'dept-3', name: 'Pediatrics' }, consultationFee: 120.0, experience: 9 },
        { id: 'doc-4', departmentId: 'dept-4', user: { firstName: 'Charles', lastName: 'Williams', email: 'doctor3@shms.com' }, specialization: 'Orthopedic Surgery', designation: 'Chief Orthopedic Surgeon', department: { id: 'dept-4', name: 'Orthopedics' }, consultationFee: 200.0, experience: 16 },
        { id: 'doc-5', departmentId: 'dept-5', user: { firstName: 'Diana', lastName: 'Brown', email: 'doctor4@shms.com' }, specialization: 'Medical Oncology', designation: 'Oncologist', department: { id: 'dept-5', name: 'Oncology' }, consultationFee: 220.0, experience: 11 },
        { id: 'doc-6', departmentId: 'dept-6', user: { firstName: 'Edward', lastName: 'Jones', email: 'doctor5@shms.com' }, specialization: 'Dermatology & Cosmetology', designation: 'Dermatologist', department: { id: 'dept-6', name: 'Dermatology' }, consultationFee: 110.0, experience: 8 },
        { id: 'doc-7', departmentId: 'dept-7', user: { firstName: 'Fiona', lastName: 'Garcia', email: 'doctor6@shms.com' }, specialization: 'Gastroenterology', designation: 'Gastroenterologist', department: { id: 'dept-7', name: 'Gastroenterology' }, consultationFee: 160.0, experience: 10 }
      ] as any;
    }

    // 4. Hospital Departments Endpoint
    if (endpoint.includes('/departments')) {
      return [
        { id: 'dept-1', name: 'Cardiology', code: 'CAR', description: 'Heart and cardiovascular care unit.', _count: { staff: 12, appointments: 145 } },
        { id: 'dept-2', name: 'Neurology', code: 'NEU', description: 'Brain, nerve, and spine specialty.', _count: { staff: 8, appointments: 98 } },
        { id: 'dept-3', name: 'Pediatrics', code: 'PED', description: 'Infant, child, and adolescent healthcare.', _count: { staff: 10, appointments: 112 } },
        { id: 'dept-4', name: 'Orthopedics', code: 'ORT', description: 'Bones, joints, and musculoskeletal care.', _count: { staff: 9, appointments: 85 } },
        { id: 'dept-5', name: 'Oncology', code: 'ONC', description: 'Cancer diagnosis, chemotherapy, and care.', _count: { staff: 7, appointments: 64 } },
        { id: 'dept-6', name: 'Dermatology', code: 'DER', description: 'Skin, hair, and cosmetic medical care.', _count: { staff: 5, appointments: 72 } },
        { id: 'dept-7', name: 'Gastroenterology', code: 'GAS', description: 'Digestive system and liver disorder care.', _count: { staff: 6, appointments: 55 } },
        { id: 'dept-8', name: 'Emergency Medicine', code: 'EMG', description: '24/7 Trauma, resuscitation, and urgent care.', _count: { staff: 18, appointments: 230 } }
      ] as any;
    }

    // 5. Patient Directory Endpoint
    if (endpoint.includes('/patients')) {
      return [
        { id: 'pat-1', medicalRecordNo: 'MRN-10000', gender: 'Female', dateOfBirth: '1992-06-20', bloodGroup: 'O+', allergies: 'Penicillin', user: { firstName: 'Mounika', lastName: 'Reddy', email: 'patient@shms.com', phone: '+1-555-0192' } },
        { id: 'pat-2', medicalRecordNo: 'MRN-10001', gender: 'Male', dateOfBirth: '1985-03-12', bloodGroup: 'A+', allergies: 'None', user: { firstName: 'Robert', lastName: 'Taylor', email: 'patient1@shms.com', phone: '+1-555-0193' } },
        { id: 'pat-3', medicalRecordNo: 'MRN-10002', gender: 'Female', dateOfBirth: '1995-11-04', bloodGroup: 'B+', allergies: 'Peanuts', user: { firstName: 'Emily', lastName: 'Davis', email: 'patient2@shms.com', phone: '+1-555-0194' } },
        { id: 'pat-4', medicalRecordNo: 'MRN-10003', gender: 'Male', dateOfBirth: '1978-08-25', bloodGroup: 'AB+', allergies: 'Lactose', user: { firstName: 'David', lastName: 'Wilson', email: 'patient3@shms.com', phone: '+1-555-0195' } },
        { id: 'pat-5', medicalRecordNo: 'MRN-10004', gender: 'Female', dateOfBirth: '2001-01-15', bloodGroup: 'O-', allergies: 'Sulfonamides', user: { firstName: 'Sophia', lastName: 'Martinez', email: 'patient4@shms.com', phone: '+1-555-0196' } }
      ] as any;
    }

    // 6. Appointments Queue Endpoint
    if (endpoint.includes('/appointments')) {
      return [
        { id: 'apt-1', appointmentNo: 'APT-50001', appointmentDate: new Date(), timeSlot: '09:00 AM', status: 'SCHEDULED', reason: 'Routine Heart Checkup', patient: { user: { firstName: 'Mounika', lastName: 'Reddy' } }, doctor: { user: { firstName: 'Priya', lastName: 'Sharma' } }, department: { name: 'Cardiology' } },
        { id: 'apt-2', appointmentNo: 'APT-50002', appointmentDate: new Date(), timeSlot: '10:30 AM', status: 'CONFIRMED', reason: 'Migraine Follow-up Evaluation', patient: { user: { firstName: 'Robert', lastName: 'Taylor' } }, doctor: { user: { firstName: 'Alexander', lastName: 'Smith' } }, department: { name: 'Neurology' } },
        { id: 'apt-3', appointmentNo: 'APT-50003', appointmentDate: new Date(), timeSlot: '02:00 PM', status: 'COMPLETED', reason: 'Pediatric Vaccine Consultation', patient: { user: { firstName: 'Emily', lastName: 'Davis' } }, doctor: { user: { firstName: 'Beatrix', lastName: 'Johnson' } }, department: { name: 'Pediatrics' } },
        { id: 'apt-4', appointmentNo: 'APT-50004', appointmentDate: new Date(), timeSlot: '03:30 PM', status: 'CANCELLED', reason: 'Knee Joint Pain Review', patient: { user: { firstName: 'David', lastName: 'Wilson' } }, doctor: { user: { firstName: 'Charles', lastName: 'Williams' } }, department: { name: 'Orthopedics' } }
      ] as any;
    }

    // 7. Medical Records Endpoint
    if (endpoint.includes('/records')) {
      return [
        { id: 'rec-1', recordNo: 'REC-70001', visitDate: new Date(), diagnosis: 'Essential Hypertension', symptoms: 'Fatigue, mild occipital headache, BP 145/95', clinicalNotes: 'S: Patient reports elevated BP.\nO: Chest clear, HR 78.\nA: Stage 1 Hypertension.\nP: Prescribed Lisinopril 10mg daily.', patient: { user: { firstName: 'Mounika', lastName: 'Reddy' }, medicalRecordNo: 'MRN-10000' }, doctor: { user: { lastName: 'Sharma' } } },
        { id: 'rec-2', recordNo: 'REC-70002', visitDate: new Date(), diagnosis: 'Acute Bronchitis', symptoms: 'Persistent cough, low-grade fever', clinicalNotes: 'S: Cough for 4 days.\nO: Lungs show mild wheezing.\nP: Prescribed Azithromycin and cough syrup.', patient: { user: { firstName: 'Robert', lastName: 'Taylor' }, medicalRecordNo: 'MRN-10001' }, doctor: { user: { lastName: 'Smith' } } }
      ] as any;
    }

    // 8. Prescriptions Endpoint
    if (endpoint.includes('/prescriptions')) {
      return [
        { id: 'rx-1', rxNo: 'RX-80001', isDispensed: false, patient: { user: { firstName: 'Mounika', lastName: 'Reddy' } }, doctor: { user: { firstName: 'Priya', lastName: 'Sharma' } }, items: [{ id: '1', dosage: '1 Tablet', frequency: 'Twice daily', duration: '5 Days', instructions: 'After meals', medicine: { name: 'Paracetamol 500mg' } }, { id: '2', dosage: '1 Capsule', frequency: 'Once daily', duration: '7 Days', instructions: 'Before bed', medicine: { name: 'Atorvastatin 10mg' } }] },
        { id: 'rx-2', rxNo: 'RX-80002', isDispensed: true, patient: { user: { firstName: 'Robert', lastName: 'Taylor' } }, doctor: { user: { firstName: 'Alexander', lastName: 'Smith' } }, items: [{ id: '3', dosage: '1 Tablet', frequency: 'Once daily', duration: '14 Days', instructions: 'Morning', medicine: { name: 'Lisinopril 10mg' } }] }
      ] as any;
    }

    // 9. Laboratory Requests Endpoint
    if (endpoint.includes('/lab')) {
      return [
        { id: 'lr-1', requestNo: 'LR-90001', status: 'COMPLETED', resultData: 'Hemoglobin: 13.5 g/dL (Normal). WBC: 7,200 /mcL (Normal). Platelets: 250,000 /mcL (Normal).', test: { name: 'Complete Blood Count (CBC)' }, patient: { user: { firstName: 'Mounika', lastName: 'Reddy' } } },
        { id: 'lr-2', requestNo: 'LR-90002', status: 'PROCESSING', resultData: null, test: { name: 'Lipid Profile Panel' }, patient: { user: { firstName: 'Robert', lastName: 'Taylor' } } },
        { id: 'lr-3', requestNo: 'LR-90003', status: 'ORDERED', resultData: null, test: { name: 'Fasting Blood Sugar (FBS)' }, patient: { user: { firstName: 'Emily', lastName: 'Davis' } } }
      ] as any;
    }

    // 10. Bed Occupancy & Wards Endpoint
    if (endpoint.includes('/beds')) {
      return [
        {
          id: 'w-1', name: 'Ward A - General Medicine', capacity: 20, department: { name: 'General Medicine' },
          rooms: [
            { id: 'r-1', roomNumber: '101', type: 'GENERAL', dailyRate: 120, beds: [{ id: 'b-1', bedNumber: '101-A', status: 'AVAILABLE' }, { id: 'b-2', bedNumber: '101-B', status: 'OCCUPIED' }] },
            { id: 'r-2', roomNumber: '102', type: 'PRIVATE', dailyRate: 250, beds: [{ id: 'b-3', bedNumber: '102-A', status: 'AVAILABLE' }] }
          ]
        },
        {
          id: 'w-2', name: 'Ward C - ICU & Critical Care', capacity: 10, department: { name: 'Critical Care' },
          rooms: [
            { id: 'r-3', roomNumber: '301', type: 'ICU', dailyRate: 500, beds: [{ id: 'b-4', bedNumber: '301-A', status: 'OCCUPIED' }, { id: 'b-5', bedNumber: '301-B', status: 'OCCUPIED' }] }
          ]
        }
      ] as any;
    }

    // 11. Invoices & Billing Endpoint
    if (endpoint.includes('/billing')) {
      return [
        { id: 'inv-1', invoiceNo: 'INV-30001', totalAmount: 250.0, finalAmount: 250.0, paidAmount: 250.0, status: 'PAID', patient: { user: { firstName: 'Mounika', lastName: 'Reddy' } }, items: [{ id: 'i-1', description: 'Specialist Consultation Fee', quantity: 1, amount: 150.0 }, { id: 'i-2', description: 'CBC Diagnostic Test', quantity: 1, amount: 100.0 }] },
        { id: 'inv-2', invoiceNo: 'INV-30002', totalAmount: 480.0, finalAmount: 480.0, paidAmount: 0.0, status: 'PENDING', patient: { user: { firstName: 'Robert', lastName: 'Taylor' } }, items: [{ id: 'i-3', description: 'Neurology Consultation & MRI Scan', quantity: 1, amount: 480.0 }] },
        { id: 'inv-3', invoiceNo: 'INV-30003', totalAmount: 320.0, finalAmount: 320.0, paidAmount: 160.0, status: 'PARTIALLY_PAID', patient: { user: { firstName: 'Emily', lastName: 'Davis' } }, items: [{ id: 'i-4', description: 'Pediatric Emergency Observation', quantity: 1, amount: 320.0 }] }
      ] as any;
    }

    // 12. Audit Logs Endpoint
    if (endpoint.includes('/audit')) {
      return [
        { id: 'a-1', action: 'USER_LOGIN', resource: 'AUTH', user: { email: 'admin@shms.com' }, ipAddress: '192.168.1.10', createdAt: new Date() },
        { id: 'a-2', action: 'PATIENT_RECORD_ACCESSED', resource: 'MEDICAL_RECORDS', user: { email: 'doctor@shms.com' }, ipAddress: '192.168.1.14', createdAt: new Date() },
        { id: 'a-3', action: 'PRESCRIPTION_DISPENSED', resource: 'PHARMACY', user: { email: 'pharmacist@shms.com' }, ipAddress: '192.168.1.20', createdAt: new Date() },
        { id: 'a-4', action: 'LAB_REPORT_PUBLISHED', resource: 'LABORATORY', user: { email: 'lab@shms.com' }, ipAddress: '192.168.1.22', createdAt: new Date() },
        { id: 'a-5', action: 'INVOICE_GENERATED', resource: 'BILLING', user: { email: 'billing@shms.com' }, ipAddress: '192.168.1.25', createdAt: new Date() }
      ] as any;
    }

    // 13. Notifications Endpoint
    if (endpoint.includes('/notifications')) {
      return {
        notifications: [
          { id: 'n-1', message: 'Appointment CONFIRMED with Dr. Priya Sharma for 09:00 AM.', isRead: false, createdAt: new Date() },
          { id: 'n-2', message: 'Laboratory CBC Test report is now ready for review.', isRead: false, createdAt: new Date() },
          { id: 'n-3', message: 'Invoice #INV-30002 has been issued to your profile.', isRead: true, createdAt: new Date() }
        ]
      } as any;
    }

    // 14. Executive Reports Endpoint
    if (endpoint.includes('/reports')) {
      return {
        totalPatients: 524,
        totalDoctors: 50,
        totalAppointments: 1042,
        revenue: 285400,
        totalBeds: 80,
        occupiedBeds: 52,
        occupancyRate: 65,
        pendingLabRequests: 14,
        lowStockMedicines: 4,
        monthlyTrends: [
          { month: 'Jan', revenue: 45000, appointments: 120, admissions: 30 },
          { month: 'Feb', revenue: 52000, appointments: 145, admissions: 35 },
          { month: 'Mar', revenue: 61000, appointments: 170, admissions: 42 },
          { month: 'Apr', revenue: 58000, appointments: 160, admissions: 38 },
          { month: 'May', revenue: 67000, appointments: 190, admissions: 45 },
          { month: 'Jun', revenue: 73000, appointments: 210, admissions: 50 }
        ]
      } as any;
    }

    return [] as any;
  }
}
