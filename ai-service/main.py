from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os

app = FastAPI(title="SHMS AI Service", description="AI Assistant and Record Summarizer for Smart Hospital Management System")

class RecordRequest(BaseModel):
    patient_id: str
    clinical_notes: str
    lab_results: str

class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: str = ""

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "SHMS AI"}

@app.post("/api/ai/summarize-record")
def summarize_record(request: RecordRequest):
    # In a real implementation, this would call an LLM (e.g. Gemini, OpenAI)
    # Using the IBM_API_KEY or MODEL_ID from environment
    
    if not request.clinical_notes:
        raise HTTPException(status_code=400, detail="Clinical notes are required for summarization")
        
    summary = f"AI Summary for Patient {request.patient_id}:\n"
    summary += "- Patient presents with symptoms described in clinical notes.\n"
    summary += "- Lab results indicate normal parameters across standard tests.\n"
    summary += "\n*Disclaimer: This is an AI-generated summary and should not replace professional medical judgment.*"
    
    return {
        "patient_id": request.patient_id,
        "summary": summary,
        "key_observations": ["Stable vitals", "Awaiting follow-up"],
        "recommended_actions": ["Review lab results with patient"]
    }

@app.post("/api/ai/chat")
def chat_assistant(request: ChatRequest):
    # Context-aware hospital assistant
    response_msg = f"I understand you are asking about: '{request.message}'. How can I further assist you with hospital operations?"
    
    return {
        "reply": response_msg,
        "disclaimer": "I am an AI administrative assistant. I cannot provide medical diagnosis."
    }
