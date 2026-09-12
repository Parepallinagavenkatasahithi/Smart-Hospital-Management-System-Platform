# SHMS Platform Architecture

## System Architecture Overview

The Smart Hospital Management System (SHMS) uses a modern multi-service architecture:

```
[ React 19 Frontend (Vite + Tailwind + TanStack) ]
                      |
                      v
[ Express TypeScript API Backend (JWT + RBAC + Prisma ORM) ]
          |                                 |
          v                                 v
[ PostgreSQL 15 Database ]     [ Python FastAPI AI Engine ]
```

### Components
1. **Frontend (`/frontend`)**: Modular React 19 web application built with TypeScript, Tailwind CSS, Lucide icons, and Recharts. Implements 10 role-based portal experiences.
2. **Backend (`/backend`)**: Express RESTful API with Prisma ORM connecting to PostgreSQL. Enforces JWT authentication, RBAC authorization, centralized error handling, and structured JSON envelopes.
3. **AI Service (`/ai-service`)**: Python 3.11 FastAPI service supporting LLM clinical summarization, chat assistant, safety disclaimers, and local deterministic fallback.
4. **Database (`/backend/prisma`)**: Fully normalized relational schema covering User, Staff, Patient, Appointment, MedicalRecord, Prescription, Medicine, LabTest, LabRequest, Room, Bed, Invoice, AuditLog, and SystemSetting.
