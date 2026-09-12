import { useEffect, useState } from 'react';
import { Search, Stethoscope, Building } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function StaffDoctors() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/doctors');
        setDoctors(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Medical Roster & Doctors Directory</h1>
        <p className="text-sm text-health-olive">Physician specializations, departmental alignment, and consultation fee schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-health-olive text-white font-bold flex items-center justify-center">
                {doc.user?.firstName?.[0]}{doc.user?.lastName?.[0]}
              </div>
              <div>
                <h3 className="font-bold text-health-charcoal text-sm">Dr. {doc.user?.firstName} {doc.user?.lastName}</h3>
                <p className="text-xs text-health-olive">{doc.specialization || doc.designation}</p>
              </div>
            </div>
            <div className="text-xs text-health-olive border-t border-health-gray pt-2 flex justify-between">
              <span>Department: {doc.department?.name || 'General'}</span>
              <span className="font-bold text-health-charcoal">${doc.consultationFee} Fee</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
