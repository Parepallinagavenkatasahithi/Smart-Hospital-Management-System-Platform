import { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function StaffReports() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/reports/executive');
        setAnalytics(data);
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
        <h1 className="text-xl font-bold text-health-charcoal">Clinical & Operational Metrics</h1>
        <p className="text-sm text-health-olive">Overview of hospital volume, occupancy, and diagnostic activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Total Patient Encounters</p>
          <p className="text-2xl font-bold text-health-charcoal mt-1">{analytics?.totalAppointments || 0}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Inpatient Bed Occupancy</p>
          <p className="text-2xl font-bold text-health-charcoal mt-1">{analytics?.occupancyRate || 0}%</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Pending Diagnostics</p>
          <p className="text-2xl font-bold text-health-charcoal mt-1">{analytics?.pendingLabRequests || 0}</p>
        </div>
      </div>
    </div>
  );
}
