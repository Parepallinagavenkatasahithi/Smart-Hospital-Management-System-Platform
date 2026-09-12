import { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientLab() {
  const [loading, setLoading] = useState(true);
  const [labRequests, setLabRequests] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/lab');
        setLabRequests(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Laboratory Reports</h1>
        <p className="text-sm text-health-olive">Track status and review completed diagnostic lab test results.</p>
      </div>

      {labRequests.length === 0 ? (
        <EmptyState title="No Lab Orders Found" description="You currently have no ordered or completed laboratory tests." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-health-gray pb-2">
                <span className="text-xs font-bold text-health-olive uppercase">{req.requestNo}</span>
                <StatusBadge status={req.status} />
              </div>

              <div>
                <h3 className="font-bold text-health-charcoal text-sm">{req.test?.name || 'Diagnostic Test'}</h3>
                <p className="text-xs text-health-olive">{req.test?.description || 'Standard Laboratory Evaluation'}</p>
              </div>

              <div className="p-3 bg-health-ivory/50 rounded-xl border border-health-sage/30 text-xs">
                <p className="font-semibold text-health-charcoal mb-1">Diagnostic Observations / Outcome:</p>
                <p className="text-health-olive">{req.resultData || 'Pending laboratory diagnostic processing...'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
