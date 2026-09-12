# Smart Hospital Management System (SHMS)

Connected Care. Smarter Management. Better Outcomes.

A complete, end-to-end hospital management platform built with React, Node.js, PostgreSQL, and a Python FastAPI AI service. This application adheres to a strict professional Violet/Purple design system and features three distinct role-based portals.

## Project Structure
- **`/frontend`**: React + Vite + Tailwind CSS + TypeScript
- **`/backend`**: Node.js + Express + Prisma ORM + PostgreSQL
- **`/ai-service`**: Python + FastAPI

## Features
1. **Three distinct portals**:
   - **Patient Portal**: Book appointments, view medical records, view prescriptions, pay bills.
   - **Staff Portal**: (Doctors, Nurses, Pharmacists, etc.) View patient schedules, start consultations, prescribe medicines, manage lab tests.
   - **Management Portal**: Executive dashboard, hospital analytics, revenue tracking, bed occupancy.
2. **AI Integration**:
   - AI Medical Record Summarizer for doctors.
   - AI Hospital Assistant for patients and staff.
3. **Strict Violet Theme**: Custom Tailwind CSS design tokens implementing a premium Violet/Lavender UI (No Blue).

## Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL (or Docker Desktop)

## Getting Started

### 1. Database Setup
Ensure PostgreSQL is running.
Configure your database connection in `backend/.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/shms?schema=public"
JWT_SECRET="supersecretjwtkey_for_development_only"
PORT=5000
```
Run migrations and seed the database:
```bash
cd backend
npx prisma migrate dev --name init
npm run seed
```

#### Demo Accounts (Password: `password123`)
- Management: `admin@shms.com`
- Doctor: `doctor@shms.com`
- Patient: `patient@shms.com`
- Pharmacist: `pharmacist@shms.com`

### 2. Start the Backend API
```bash
cd backend
npm run dev
```

### 3. Start the Frontend Application
```bash
cd frontend
npm run dev
```

### 4. Start the AI Service
```bash
cd ai-service
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Security & Architecture
- **Authentication**: JWT-based session handling with Bcrypt password hashing.
- **Authorization**: Role-based access control middleware preventing unauthorized route access.
- **ORM**: Prisma provides type-safe database queries and automated migrations.
- **Responsive Design**: Mobile-first Tailwind CSS implementation.
