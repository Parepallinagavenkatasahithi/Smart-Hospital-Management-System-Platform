import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementAppointments() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/appointments?limit=50');
        setAppointments(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Global Appointments Monitor</h1>
        <p className="text-sm text-health-olive">Hospital-wide patient consultation volume and scheduling status.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Appointment No</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Department</th>
              <th className="p-3">Date & Slot</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-semibold font-mono text-health-olive">{apt.appointmentNo}</td>
                <td className="p-3 font-bold">{apt.patient?.user?.firstName} {apt.patient?.user?.lastName}</td>
                <td className="p-3 font-medium">Dr. {apt.doctor?.user?.lastName}</td>
                <td className="p-3 text-health-olive">{apt.department?.name}</td>
                <td className="p-3">{new Date(apt.appointmentDate).toLocaleDateString()} {apt.timeSlot}</td>
                <td className="p-3"><StatusBadge status={apt.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
