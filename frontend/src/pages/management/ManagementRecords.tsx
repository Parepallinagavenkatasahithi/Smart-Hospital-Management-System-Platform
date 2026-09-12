import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementRecords() {
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
        <h1 className="text-xl font-bold text-health-charcoal">Medical Records Audit Registry</h1>
        <p className="text-sm text-health-olive">Comprehensive clinical documentation and diagnosis audit trail.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Record No</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Physician</th>
              <th className="p-3">Diagnosis</th>
              <th className="p-3">Visit Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-mono font-semibold text-health-olive">{r.recordNo}</td>
                <td className="p-3 font-bold">{r.patient?.user?.firstName} {r.patient?.user?.lastName}</td>
                <td className="p-3 font-medium">Dr. {r.doctor?.user?.lastName}</td>
                <td className="p-3 font-semibold">{r.diagnosis || 'Clinical Consultation'}</td>
                <td className="p-3">{new Date(r.visitDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
