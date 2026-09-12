import { useEffect, useState } from 'react';
import { Bed } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementBeds() {
  const [loading, setLoading] = useState(true);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/beds/wards');
        setWards(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Hospital Ward Capacity & Bed Utilization</h1>
        <p className="text-sm text-health-olive">Real-time bed availability across ICU, private rooms, and general wards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wards.map((w) => (
          <div key={w.id} className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-health-charcoal text-sm">{w.name}</h3>
            <p className="text-xs text-health-olive">Total Capacity: {w.capacity} Beds • Rooms: {w.rooms?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
