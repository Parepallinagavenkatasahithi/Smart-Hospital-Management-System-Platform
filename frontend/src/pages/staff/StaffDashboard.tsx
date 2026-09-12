import { useEffect, useState } from 'react';
import { Users, Calendar, FileText, Pill, FlaskConical, Bed, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function StaffDashboard() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [labRequests, setLabRequests] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [appts, pats, labs, wds] = await Promise.all([
          apiFetch('/appointments'),
          apiFetch('/patients?limit=5'),
          apiFetch('/lab'),
          apiFetch('/beds/wards')
        ]);
        setAppointments(appts || []);
        setPatients(pats || []);
        setLabRequests(labs || []);
        setWards(wds || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton rows={6} />;

  const todayAppts = appointments.slice(0, 5);
  const pendingLabs = labRequests.filter((l) => l.status === 'ORDERED' || l.status === 'PENDING' || l.status === 'PROCESSING');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm">
        <h1 className="text-xl font-bold text-health-charcoal">Clinical Staff Workspace</h1>
        <p className="text-sm text-health-olive">Manage today's consultations, inpatient admissions, diagnostic requests, and pharmacy queues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Active Patients</p>
            <p className="text-xl font-bold text-health-charcoal">{patients.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Today's Visits</p>
            <p className="text-xl font-bold text-health-charcoal">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Pending Lab Orders</p>
            <p className="text-xl font-bold text-health-charcoal">{pendingLabs.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Wards Managed</p>
            <p className="text-xl font-bold text-health-charcoal">{wards.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments Queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-health-gray pb-3">
            <h2 className="text-base font-bold text-health-charcoal flex items-center space-x-2">
              <Clock className="w-5 h-5 text-health-olive" />
              <span>Today's Consultation Schedule</span>
            </h2>
            <Link to="/staff/appointments" className="text-xs font-semibold text-health-olive hover:text-health-charcoal">
              Manage Queue
            </Link>
          </div>

          <div className="space-y-2">
            {todayAppts.map((apt) => (
              <div key={apt.id} className="p-3.5 bg-health-ivory/50 rounded-xl border border-health-sage/30 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-health-charcoal">
                    {apt.patient?.user?.firstName} {apt.patient?.user?.lastName} (MRN: {apt.patient?.medicalRecordNo || 'MRN-N/A'})
                  </p>
                  <p className="text-health-olive">Physician: Dr. {apt.doctor?.user?.lastName} • Time: {apt.timeSlot}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Clinical Links */}
        <div className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-health-charcoal uppercase tracking-wider">Clinical Shortcuts</h3>
          <div className="space-y-2 text-xs">
            <Link to="/staff/patients" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
              <span>Patient Directory & Vitals</span>
              <Users className="w-4 h-4 text-health-olive" />
            </Link>
            <Link to="/staff/records" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
              <span>Record SOAP Notes</span>
              <FileText className="w-4 h-4 text-health-olive" />
            </Link>
            <Link to="/staff/prescriptions" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
              <span>Draft Prescription</span>
              <Pill className="w-4 h-4 text-health-olive" />
            </Link>
            <Link to="/staff/lab" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
              <span>Sample Entry Terminal</span>
              <FlaskConical className="w-4 h-4 text-health-olive" />
            </Link>
            <Link to="/staff/beds" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
              <span>Ward Bed Occupancy</span>
              <Bed className="w-4 h-4 text-health-olive" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
