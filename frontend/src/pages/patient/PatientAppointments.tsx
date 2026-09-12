import React, { useEffect, useState } from 'react';
import { Calendar, Search, Plus, Clock, CheckCircle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientAppointments() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM');
  const [reason, setReason] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [appts, docs] = await Promise.all([
        apiFetch('/appointments'),
        apiFetch('/doctors')
      ]);
      setAppointments(appts || []);
      setDoctors(docs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate) return;

    const docObj = doctors.find(d => d.id === selectedDoctor);

    try {
      await apiFetch('/appointments', {
        method: 'POST',
        body: JSON.stringify({
          doctorId: selectedDoctor,
          departmentId: docObj?.departmentId || docObj?.department?.id,
          appointmentDate,
          timeSlot,
          reason
        })
      });

      setSuccessMsg('Appointment booked successfully!');
      setShowModal(false);
      setSelectedDoctor('');
      setReason('');
      loadData();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to book appointment');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">My Appointments</h1>
          <p className="text-sm text-health-olive">Manage your scheduled hospital visits and physician consultations.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {appointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          description="You currently have no scheduled appointments."
          actionText="Book an Appointment"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
                <th className="p-3">Appointment No</th>
                <th className="p-3">Physician</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-health-gray text-health-charcoal">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-health-ivory/50">
                  <td className="p-3 font-semibold">{apt.appointmentNo}</td>
                  <td className="p-3 font-medium">
                    Dr. {apt.doctor?.user?.firstName} {apt.doctor?.user?.lastName}
                  </td>
                  <td className="p-3 text-health-olive">{apt.department?.name || 'General'}</td>
                  <td className="p-3">
                    {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.timeSlot}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="p-3 text-health-olive max-w-xs truncate">{apt.reason || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-health-gray">
            <h3 className="text-lg font-bold text-health-charcoal">Book a Physician Appointment</h3>
            <form onSubmit={handleBook} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-health-charcoal mb-1">Select Doctor</label>
                <select
                  required
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
                >
                  <option value="">-- Choose Specialist --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      Dr. {d.user?.firstName} {d.user?.lastName} ({d.specialization || d.department?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-health-charcoal mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-health-charcoal mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-health-charcoal mb-1">Reason for Visit</label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your symptoms or consultation requirement..."
                  className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-health-gray rounded-xl hover:bg-health-ivory text-health-charcoal font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-health-olive text-white rounded-xl hover:bg-health-charcoal font-medium"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
