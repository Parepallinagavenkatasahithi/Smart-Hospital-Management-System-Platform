# Smart Hospital Management System (SHMS) Platform

![SHMS Architecture](https://img.shields.io/badge/Platform-Production--Grade-emerald)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20FastAPI%20%7C%20Prisma%20%7C%20PostgreSQL-blue)
![Role Portals](https://img.shields.io/badge/Role--Portals-10%20Portals-gold)

The **Smart Hospital Management System (SHMS)** is an end-to-end, production-style Hospital Operations and Clinical Healthcare Platform. It provides dedicated role-based portals for **Patients, Doctors, Nurses, Pharmacists, Lab Technicians, Receptionists, Accountants, Executive Management, and Administrators**.

---

## 🌟 Key Features & Role Portals

1. **Patient Portal (`/patient/*`)**: Appointment booking, specialist search, clinical visit records, digital prescriptions, lab test reports, itemized billing statement settlement, notification inbox, and AI health assistant.
2. **Doctor & Nurse Portal (`/staff/*`)**: Daily appointment workqueue, patient EHR directory, SOAP notes recorder, clinical diagnosis logger, prescription drafting, lab test ordering, and ward bed assignment.
3. **Pharmacy Portal (`/staff/pharmacy`)**: Medicine catalog management, stock level tracking, low-stock & batch expiry alerts, and prescription dispensing workflows.
4. **Laboratory Portal (`/staff/lab`)**: Test request processing, sample collection terminal, diagnostic result entry, normal/abnormal reference range validation, and report publishing.
5. **Bed & Inpatient Admission Management (`/staff/beds`)**: Ward visual occupancy map, room type selector, bed status toggle (Available, Occupied, Reserved, Maintenance), and admission/discharge handling.
6. **Billing & Revenue Management (`/staff/billing`)**: Cashier invoice generation, line item detailing, payment receipt recording, refunds, and insurance claims.
7. **Executive Management & Admin Portal (`/management/*`)**: Executive operations dashboard, Recharts financial growth analytics, department performance, global patient/staff rosters, audit logs, and system settings.
8. **Python FastAPI AI Service (`/api/ai/*`)**: Context-aware hospital assistant chat, clinical SOAP record summarizer, safety disclaimers, and local deterministic fallback engine.

---

## 🎨 Healthcare Design Palette

Designed specifically for modern healthcare operations (avoiding generic SaaS templates):
- **Warm Ivory:** `#F8F7F3`
- **Deep Charcoal:** `#202320`
- **Soft Sage:** `#DDE5D8`
- **Muted Olive:** `#66705A`
- **Terracotta:** `#A86A50`
- **Warm Gold:** `#B28A45`
- **Soft Red:** `#B85C56`

---

## 🚀 How to Run the Project Locally

### Option 1: Quick Start with Docker Compose (Recommended)

Ensure Docker and Docker Compose are installed, then run:

```bash
docker-compose up --build
```

Services exposed:
- **Frontend Web Application:** `http://localhost:80` (or `http://localhost:5173` in dev mode)
- **Express Backend API:** `http://localhost:5000/api`
- **Python FastAPI AI Engine:** `http://localhost:8000`
- **PostgreSQL Database:** `localhost:5432`

---

### Option 2: Running Manual Development Servers

#### 1. Database Setup & Seeding

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
```

#### 2. Start Express Backend API

```bash
cd backend
npm run dev
```

#### 3. Start Python FastAPI AI Service

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### 4. Start React Vite Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔐 Demo Accounts (Password for all: `password123`)

| Role | Email Login | Access Scope |
| --- | --- | --- |
| **Patient** | `patient@shms.com` | Appointments, Records, Prescriptions, Lab Reports, Bills, AI |
| **Doctor** | `doctor@shms.com` | Patient Queue, EHR Workspace, SOAP Notes, Prescribing, Lab Orders |
| **Pharmacist** | `pharmacist@shms.com` | Pharmacy Catalog, Low-Stock Alerts, Prescription Dispensing |
| **Lab Tech** | `lab@shms.com` | Sample Collection, Result Entry Terminal, Diagnostic Reports |
| **Nurse** | `nurse@shms.com` | Ward Bed Occupancy, Patient Directory, Vitals Timeline |
| **Receptionist** | `reception@shms.com` | Patient Registration & Appointment Queue |
| **Accountant** | `billing@shms.com` | Cashier Invoicing, Payment Receipts, Revenue Analytics |
| **Management / Admin** | `admin@shms.com` | Executive Dashboard, Recharts Analytics, Audit Logs, Users |

---

## 📦 Packaging & Testing in TrainPlex Bot

To test this repository on TrainPlex (`https://train-plex-checker-bot-1--ttejaswar1234.replit.app/`), generate a clean `.zip` archive of the root project folder (excluding `node_modules` and `.git` to keep file size optimal):

### On Windows PowerShell:
```powershell
Compress-Archive -Path backend, frontend, ai-service, docs, scripts, docker-compose.yml, package.json, README.md -DestinationPath shms_project.zip -Force
```

Upload `shms_project.zip` to the TrainPlex checker URL.

---

## 🧪 Testing & Quality Verification

Run backend unit & integration tests:
```bash
cd backend
npm test
```

Run quality audit metric script:
```bash
python scripts/project_audit.py
```

Outputs:
- [`docs/CURRENT_STATE_AUDIT.md`](docs/CURRENT_STATE_AUDIT.md)
- [`reports/project-quality-report.json`](reports/project-quality-report.json)
- [`reports/FINAL_VERIFICATION.md`](reports/FINAL_VERIFICATION.md)
