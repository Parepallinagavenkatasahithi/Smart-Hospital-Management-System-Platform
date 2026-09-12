import { useEffect, useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function StaffAppointments() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const data = await apiFetch('/appointments');
      setAppointments(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await apiFetch(`/appointments/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      loadAppointments();
    } catch (e: any) {
      alert(e.message || 'Status update failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Hospital Appointment Workqueue</h1>
        <p className="text-sm text-health-olive">Review scheduled appointments, update visit status, and mark consultations completed.</p>
      </div>

      {appointments.length === 0 ? (
        <EmptyState title="No Appointments Scheduled" description="The appointment queue is currently empty." />
      ) : (
        <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
                <th className="p-3">Appointment No</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Assigned Physician</th>
                <th className="p-3">Date & Slot</th>
                <th className="p-3">Status</th>
                <th className="p-3">Manage Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-health-gray text-health-charcoal">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-health-ivory/50">
                  <td className="p-3 font-semibold">{apt.appointmentNo}</td>
                  <td className="p-3 font-bold">{apt.patient?.user?.firstName} {apt.patient?.user?.lastName}</td>
                  <td className="p-3 font-medium">Dr. {apt.doctor?.user?.firstName} {apt.doctor?.user?.lastName}</td>
                  <td className="p-3">{new Date(apt.appointmentDate).toLocaleDateString()} at {apt.timeSlot}</td>
                  <td className="p-3"><StatusBadge status={apt.status} /></td>
                  <td className="p-3 space-x-1">
                    {apt.status === 'SCHEDULED' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'CONFIRMED')}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-semibold"
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status === 'CONFIRMED' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'COMPLETED')}
                        className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-semibold"
                      >
                        Complete
                      </button>
                    )}
                    {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'CANCELLED')}
                        className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[11px] font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
