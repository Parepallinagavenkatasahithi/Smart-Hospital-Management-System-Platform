import { useEffect, useState } from 'react';
import { Users, DollarSign, Bed, Calendar, Activity, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementDashboard() {
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

  if (loading) return <LoadingSkeleton rows={6} />;

  const chartData = analytics?.monthlyTrends || [
    { month: 'Jan', revenue: 45000, appointments: 120, admissions: 30 },
    { month: 'Feb', revenue: 52000, appointments: 145, admissions: 35 },
    { month: 'Mar', revenue: 61000, appointments: 170, admissions: 42 },
    { month: 'Apr', revenue: 58000, appointments: 160, admissions: 38 },
    { month: 'May', revenue: 67000, appointments: 190, admissions: 45 },
    { month: 'Jun', revenue: 73000, appointments: 210, admissions: 50 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm">
        <h1 className="text-xl font-bold text-health-charcoal">Executive Operations Dashboard</h1>
        <p className="text-sm text-health-olive">Hospital key performance indicators, revenue metrics, bed occupancy, and departmental utilization.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Total Revenue</p>
            <p className="text-xl font-bold text-health-charcoal">${(analytics?.revenue || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Total Patients</p>
            <p className="text-xl font-bold text-health-charcoal">{analytics?.totalPatients || 0}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Bed Occupancy Rate</p>
            <p className="text-xl font-bold text-health-charcoal">{analytics?.occupancyRate || 0}%</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-health-gray shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-health-olive uppercase">Total Appointments</p>
            <p className="text-xl font-bold text-health-charcoal">{analytics?.totalAppointments || 0}</p>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-health-charcoal">Revenue & Financial Growth Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECEBE6" />
                <XAxis dataKey="month" stroke="#66705A" fontSize={12} />
                <YAxis stroke="#66705A" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#66705A" fill="#DDE5D8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-health-charcoal">Patient Appointments & Admissions</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECEBE6" />
                <XAxis dataKey="month" stroke="#66705A" fontSize={12} />
                <YAxis stroke="#66705A" fontSize={12} />
                <Tooltip />
                <Bar dataKey="appointments" fill="#66705A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="admissions" fill="#A86A50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
