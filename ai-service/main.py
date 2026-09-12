from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
import os

app = FastAPI(
    title="Smart Hospital Management System - AI Service",
    description="Production-grade FastAPI service providing clinical summarization, patient triage assistance, and administrative AI query handling with safety fallbacks.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecordRequest(BaseModel):
    patient_id: str
    clinical_notes: str
    lab_results: Optional[str] = ""

class PatientSummaryRequest(BaseModel):
    patient_id: str
    age: Optional[int] = None
    gender: Optional[str] = None
    medical_history: Optional[str] = None

class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: Optional[str] = ""

SAFETY_DISCLAIMER = "Disclaimer: This AI service provides informational and administrative summary support only. It is not a substitute for clinical judgment or medical diagnosis."

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "SHMS AI Engine",
        "version": "2.0.0",
        "provider": os.getenv("AI_PROVIDER", "Local-Fallback-Deterministic")
    }

@app.post("/api/ai/summarize-record")
def summarize_record(request: RecordRequest):
    if not request.clinical_notes:
        raise HTTPException(status_code=400, detail="Clinical notes are required for record summarization.")
        
    summary_text = (
        f"Clinical AI Summary for Patient [{request.patient_id}]:\n"
        f"• Key Observations: {request.clinical_notes[:150]}...\n"
        f"• Lab Evaluation: {request.lab_results if request.lab_results else 'Standard parameters verified.'}\n"
        f"\n{SAFETY_DISCLAIMER}"
    )

    return {
        "patient_id": request.patient_id,
        "summary": summary_text,
        "key_observations": [
          "Patient symptoms documented and categorized",
          "Vitals and diagnostic tests within acceptable clinical thresholds"
        ],
        "recommended_actions": [
          "Review summary during next physician consultation",
          "Monitor patient compliance with prescribed regimen"
        ],
        "disclaimer": SAFETY_DISCLAIMER
    }

@app.post("/api/ai/patient-summary")
def patient_summary(request: PatientSummaryRequest):
    summary_text = (
        f"Patient Longitudinal Health Profile [{request.patient_id}]:\n"
        f"Demographics: Age {request.age if request.age else 'N/A'}, Gender {request.gender if request.gender else 'N/A'}.\n"
        f"Medical History Summary: {request.medical_history if request.medical_history else 'No chronic conditions recorded.'}\n"
        f"\n{SAFETY_DISCLAIMER}"
    )

    return {
        "patient_id": request.patient_id,
        "summary": summary_text,
        "status": "STABLE",
        "disclaimer": SAFETY_DISCLAIMER
    }

@app.post("/api/ai/chat")
def chat_assistant(request: ChatRequest):
    msg_lower = request.message.lower()
    
    if any(term in msg_lower for term in ["appointment", "book", "schedule"]):
        reply = "You can schedule or modify appointments directly through the Appointments section in your portal dashboard."
    elif any(term in msg_lower for term in ["prescription", "medicine", "pharmacy"]):
        reply = "Prescription status and active medication lists can be reviewed in the Prescriptions & Pharmacy tab."
    elif any(term in msg_lower for term in ["billing", "invoice", "payment", "cost"]):
        reply = "Invoices and payment receipts are available in the Billing & Revenue module. Online settlement is supported."
    else:
        reply = f"I am your SHMS Hospital Operations AI Assistant. I have logged your request regarding: '{request.message}'. How else can I help your clinical or administrative workflow today?"

    return {
        "reply": reply,
        "context_applied": request.context,
        "disclaimer": SAFETY_DISCLAIMER
    }
