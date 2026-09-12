import { Users, Stethoscope, Bed, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {  } from 'react-router-dom';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const patientData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 132 },
  { name: 'Wed', value: 101 },
  { name: 'Thu', value: 143 },
  { name: 'Fri', value: 190 },
  { name: 'Sat', value: 90 },
  { name: 'Sun', value: 45 },
];

export default function ManagementDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Hospital Overview</h2>
          <p className="text-text-muted mt-1">Real-time metrics and analytics for the entire facility.</p>
        </div>
        <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center w-fit">
          <Activity className="w-5 h-5 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center justify-between group hover:border-brand-300 transition-colors cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">Total Patients</p>
            <h3 className="text-2xl font-bold text-text-dark">1,245</h3>
            <p className="text-xs text-green-600 flex items-center mt-1 font-medium"><TrendingUp className="w-3 h-3 mr-1" /> +12% this month</p>
          </div>
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Users className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center justify-between group hover:border-brand-300 transition-colors cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">Active Doctors</p>
            <h3 className="text-2xl font-bold text-text-dark">48</h3>
            <p className="text-xs text-green-600 flex items-center mt-1 font-medium"><TrendingUp className="w-3 h-3 mr-1" /> +2 new joined</p>
          </div>
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center justify-between group hover:border-brand-300 transition-colors cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">Bed Occupancy</p>
            <h3 className="text-2xl font-bold text-text-dark">78%</h3>
            <p className="text-xs text-orange-600 flex items-center mt-1 font-medium">14 beds available</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <Bed className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center justify-between group hover:border-brand-300 transition-colors cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">Monthly Revenue</p>
            <h3 className="text-2xl font-bold text-text-dark">$124k</h3>
            <p className="text-xs text-green-600 flex items-center mt-1 font-medium"><TrendingUp className="w-3 h-3 mr-1" /> +8% vs last month</p>
          </div>
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-brand-900">Revenue Trends</h3>
            <select className="bg-brand-50 border-none text-sm rounded-lg text-text-dark focus:ring-0 cursor-pointer outline-none px-3 py-1">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6475' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6475' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#6D28D9', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Volume */}
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-brand-900">Patient Volume</h3>
            <select className="bg-brand-50 border-none text-sm rounded-lg text-text-dark focus:ring-0 cursor-pointer outline-none px-3 py-1">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={30}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6475' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6475' }} />
                <Tooltip 
                  cursor={{ fill: '#F8F7FC' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#6D28D9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
