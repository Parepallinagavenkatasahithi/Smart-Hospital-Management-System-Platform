from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert "version" in response.json()

def test_summarize_record():
    payload = {
        "patient_id": "P-100",
        "clinical_notes": "Patient complains of chest tightness and mild fatigue.",
        "lab_results": "ECG Normal, Troponin Negative"
    }
    response = client.post("/api/ai/summarize-record", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["patient_id"] == "P-100"
    assert "summary" in data
    assert "disclaimer" in data

def test_patient_summary():
    payload = {
        "patient_id": "P-101",
        "age": 45,
        "gender": "Female",
        "medical_history": "Hypertension"
    }
    response = client.post("/api/ai/patient-summary", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "STABLE"

def test_chat_assistant():
    payload = {
        "user_id": "U-123",
        "message": "How do I check my prescription?",
        "context": "Patient Portal"
    }
    response = client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Prescriptions" in data["reply"] or "pharmacy" in data["reply"].lower()
