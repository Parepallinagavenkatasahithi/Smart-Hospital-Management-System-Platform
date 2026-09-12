import { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementDoctors() {
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
        <h1 className="text-xl font-bold text-health-charcoal">Physicians & Consultants Roster</h1>
        <p className="text-sm text-health-olive">Executive view of doctor credentials, specializations, and departmental workload.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Doctor Name</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Department</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Consultation Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {doctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-bold">Dr. {doc.user?.firstName} {doc.user?.lastName}</td>
                <td className="p-3 text-health-olive">{doc.specialization || doc.designation}</td>
                <td className="p-3 font-medium">{doc.department?.name || 'General Medicine'}</td>
                <td className="p-3">{doc.experience || 5} Years</td>
                <td className="p-3 font-semibold text-emerald-700">${doc.consultationFee || 100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
