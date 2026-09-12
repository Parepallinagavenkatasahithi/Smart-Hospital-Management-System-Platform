import React, { useEffect, useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function StaffRecords() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [followUp, setFollowUp] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [recs, pats] = await Promise.all([
        apiFetch('/records'),
        apiFetch('/patients?limit=50')
      ]);
      setRecords(recs || []);
      setPatients(pats || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !diagnosis) return;

    try {
      await apiFetch('/records', {
        method: 'POST',
        body: JSON.stringify({
          patientId,
          symptoms,
          diagnosis,
          clinicalNotes,
          followUpInstructions: followUp
        })
      });

      setShowModal(false);
      setPatientId('');
      setSymptoms('');
      setDiagnosis('');
      setClinicalNotes('');
      setFollowUp('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to save record');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">Clinical Medical Records Workspace</h1>
          <p className="text-sm text-health-olive">Record diagnostic observations, SOAP notes, and patient symptoms.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New SOAP Note Record</span>
        </button>
      </div>

      <div className="space-y-4">
        {records.map((rec) => (
          <div key={rec.id} className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
            <div className="flex justify-between border-b border-health-gray pb-2 text-xs">
              <span className="font-bold text-health-olive font-mono">{rec.recordNo}</span>
              <span className="text-health-olive">Patient: {rec.patient?.user?.firstName} {rec.patient?.user?.lastName} (MRN: {rec.patient?.medicalRecordNo})</span>
            </div>
            <div>
              <h3 className="font-bold text-health-charcoal text-sm">{rec.diagnosis}</h3>
              <p className="text-xs text-health-olive mt-1">Symptoms: {rec.symptoms || 'N/A'}</p>
            </div>
            {rec.clinicalNotes && (
              <div className="p-3 bg-health-ivory/50 rounded-xl text-xs text-health-charcoal whitespace-pre-line">
                {rec.clinicalNotes}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-health-gray">
            <h3 className="text-lg font-bold text-health-charcoal">Create Medical Consultation Record</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Patient</label>
                <select required value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50">
                  <option value="">-- Choose Patient --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.user?.firstName} {p.user?.lastName} ({p.medicalRecordNo})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Clinical Diagnosis</label>
                <input required value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="Primary diagnosis..." className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Reported Symptoms</label>
                <input value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Patient symptoms..." className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div>
                <label className="block font-semibold mb-1">SOAP Clinical Notes</label>
                <textarea rows={3} value={clinicalNotes} onChange={(e) => setClinicalNotes(e.target.value)} placeholder="S: ... O: ... A: ... P: ..." className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-health-gray rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-health-olive text-white rounded-xl">Save Consultation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
