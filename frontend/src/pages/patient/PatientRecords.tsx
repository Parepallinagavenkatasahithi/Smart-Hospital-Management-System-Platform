import { useEffect, useState } from 'react';
import { FileText, Calendar, Activity, User, Download } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientRecords() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/records');
        setRecords(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Medical Records & Visit History</h1>
        <p className="text-sm text-health-olive">Access your clinical diagnostic summary, recorded vitals, and physician SOAP notes.</p>
      </div>

      {records.length === 0 ? (
        <EmptyState title="No Medical Records Available" description="No medical consultation records have been filed for your profile." />
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div key={rec.id} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-health-gray pb-3 gap-2">
                <div>
                  <span className="text-xs font-bold text-health-olive uppercase tracking-wider">{rec.recordNo}</span>
                  <h3 className="text-base font-bold text-health-charcoal">{rec.diagnosis || 'Clinical Consultation Record'}</h3>
                </div>
                <div className="flex items-center space-x-3 text-xs text-health-olive">
                  <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> Visit Date: {new Date(rec.visitDate).toLocaleDateString()}</span>
                  <span className="flex items-center space-x-1"><User className="w-3.5 h-3.5" /> Dr. {rec.doctor?.user?.lastName}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-health-ivory/50 rounded-xl border border-health-sage/30">
                  <p className="font-bold text-health-charcoal mb-1">Symptoms Reported:</p>
                  <p className="text-health-olive">{rec.symptoms || 'None specified'}</p>
                </div>
                <div className="p-3 bg-health-ivory/50 rounded-xl border border-health-sage/30">
                  <p className="font-bold text-health-charcoal mb-1">Follow-up Instructions:</p>
                  <p className="text-health-olive">{rec.followUpInstructions || 'Standard clinical guidance'}</p>
                </div>
              </div>

              {rec.clinicalNotes && (
                <div className="p-3 bg-white rounded-xl border border-health-gray text-xs">
                  <p className="font-bold text-health-charcoal mb-1">Physician Clinical Notes:</p>
                  <p className="text-health-olive whitespace-pre-line">{rec.clinicalNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
