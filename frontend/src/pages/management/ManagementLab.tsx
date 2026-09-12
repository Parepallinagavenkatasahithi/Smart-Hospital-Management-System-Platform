import { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementLab() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/lab');
        setRequests(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Laboratory Workload & Volume</h1>
        <p className="text-sm text-health-olive">Diagnostic volume, processing bottlenecks, and lab test statistics.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Request No</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Test Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ordered Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-mono font-semibold text-health-olive">{req.requestNo}</td>
                <td className="p-3 font-bold">{req.patient?.user?.firstName} {req.patient?.user?.lastName}</td>
                <td className="p-3 font-medium">{req.test?.name}</td>
                <td className="p-3"><StatusBadge status={req.status} /></td>
                <td className="p-3">{new Date(req.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
