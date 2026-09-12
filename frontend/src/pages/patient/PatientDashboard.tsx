import { useEffect, useState } from 'react';
import { Calendar, FileText, Pill, FlaskConical, CreditCard, Bot, ArrowRight, Activity, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [appts, recs, rxs, invs] = await Promise.all([
          apiFetch('/appointments?limit=3'),
          apiFetch('/records'),
          apiFetch('/prescriptions'),
          apiFetch('/billing')
        ]);
        setAppointments(appts || []);
        setRecords(recs || []);
        setPrescriptions(rxs || []);
        setInvoices(invs || []);
      } catch (e) {
        console.error('Failed to load patient dashboard:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingSkeleton rows={6} />;

  const upcomingAppt = appointments[0];
  const pendingInvoices = invoices.filter(i => i.status === 'PENDING' || i.status === 'PARTIALLY_PAID');
  const outstandingAmount = pendingInvoices.reduce((sum, i) => sum + (i.finalAmount - i.paidAmount), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">Welcome Back, Patient Workspace</h1>
          <p className="text-sm text-health-olive">Here is your consolidated medical overview and upcoming appointments.</p>
        </div>
        <Link
          to="/patient/appointments"
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book New Appointment</span>
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Appointments</p>
            <p className="text-xl font-bold text-health-charcoal">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Medical Records</p>
            <p className="text-xl font-bold text-health-charcoal">{records.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Prescriptions</p>
            <p className="text-xl font-bold text-health-charcoal">{prescriptions.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Outstanding Bill</p>
            <p className="text-xl font-bold text-health-charcoal">${outstandingAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-health-gray pb-3">
            <h2 className="text-base font-bold text-health-charcoal flex items-center space-x-2">
              <Clock className="w-5 h-5 text-health-olive" />
              <span>Next Upcoming Consultation</span>
            </h2>
            <Link to="/patient/appointments" className="text-xs font-semibold text-health-olive hover:text-health-charcoal">
              View All
            </Link>
          </div>

          {upcomingAppt ? (
            <div className="p-4 bg-health-ivory/60 rounded-xl border border-health-sage/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-health-charcoal">
                  Dr. {upcomingAppt.doctor?.user?.firstName} {upcomingAppt.doctor?.user?.lastName}
                </p>
                <p className="text-xs text-health-olive">{upcomingAppt.department?.name || 'General Consultation'}</p>
                <div className="flex items-center space-x-4 text-xs font-medium text-health-charcoal mt-2">
                  <span>📅 {new Date(upcomingAppt.appointmentDate).toLocaleDateString()}</span>
                  <span>⏰ {upcomingAppt.timeSlot}</span>
                </div>
              </div>
              <StatusBadge status={upcomingAppt.status} />
            </div>
          ) : (
            <p className="text-sm text-health-olive py-6 text-center">No upcoming appointments scheduled.</p>
          )}

          {/* Recent Records List */}
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-bold text-health-charcoal">Recent Medical Visits</h3>
            <div className="space-y-2">
              {records.slice(0, 3).map((rec) => (
                <div key={rec.id} className="p-3 bg-white rounded-xl border border-health-gray flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-health-charcoal">{rec.diagnosis || 'Clinical Consultation'}</p>
                    <p className="text-health-olive">Visited Dr. {rec.doctor?.user?.lastName} on {new Date(rec.visitDate).toLocaleDateString()}</p>
                  </div>
                  <Link to="/patient/records" className="text-health-olive hover:text-health-charcoal font-semibold">Details &rarr;</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI & Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-health-sage/30 rounded-2xl border border-health-sage p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-health-charcoal font-bold">
              <Bot className="w-5 h-5 text-health-olive" />
              <span>AI Health Assistant</span>
            </div>
            <p className="text-xs text-health-olive leading-relaxed">
              Have questions about your medications, symptoms, or lab results? Ask our AI assistant.
            </p>
            <Link
              to="/patient/ai"
              className="w-full py-2.5 bg-health-olive hover:bg-health-charcoal text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-1"
            >
              <span>Launch AI Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-health-charcoal uppercase tracking-wider">Quick Healthcare Shortcuts</h3>
            <div className="space-y-2 text-xs">
              <Link to="/patient/doctors" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
                <span>Find Doctor & Department</span>
                <ArrowRight className="w-3.5 h-3.5 text-health-olive" />
              </Link>
              <Link to="/patient/lab" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
                <span>Laboratory Reports</span>
                <FlaskConical className="w-3.5 h-3.5 text-health-olive" />
              </Link>
              <Link to="/patient/prescriptions" className="flex items-center justify-between p-2.5 rounded-lg border border-health-gray hover:bg-health-ivory text-health-charcoal font-medium">
                <span>Active Prescriptions</span>
                <Pill className="w-3.5 h-3.5 text-health-olive" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
