import { Users, Calendar, FlaskConical, Stethoscope, Activity, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StaffDashboard() {
  // Using Doctor view for the staff dashboard as per demo user Dr. Priya Sharma
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Good Morning, Dr. Priya Sharma</h2>
          <p className="text-text-muted mt-1">Here's what's happening in your hospital today.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Today's Patients</p>
            <p className="text-lg font-bold text-text-dark">12</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Upcoming Appointments</p>
            <p className="text-lg font-bold text-text-dark">5</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Pending Lab Results</p>
            <p className="text-lg font-bold text-text-dark">3</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Follow-ups</p>
            <p className="text-lg font-bold text-text-dark">4</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area: Patient Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-card border border-brand-100 overflow-hidden">
            <div className="p-5 border-b border-brand-100 flex justify-between items-center bg-brand-50/50">
              <h3 className="font-bold text-lg text-brand-900">Today's Schedule</h3>
              <Link to="/staff/appointments" className="text-brand-600 text-sm font-medium hover:text-brand-800">View All</Link>
            </div>
            
            <div className="divide-y divide-brand-50">
              {/* Patient 1 */}
              <div className="p-5 flex items-center hover:bg-brand-50 transition-colors">
                <div className="w-16 text-center border-r border-brand-100 pr-4 mr-4">
                  <p className="text-lg font-bold text-brand-700">10:00</p>
                  <p className="text-xs text-text-muted">AM</p>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-dark">Mounika Reddy</h4>
                    <p className="text-sm text-text-muted flex items-center mt-1">
                      <Activity className="w-3 h-3 mr-1" /> Regular Checkup
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full hidden sm:inline-block">Waiting</span>
                    <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-brand-100 text-brand-700 hover:bg-brand-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                      Start Consult
                    </button>
                  </div>
                </div>
              </div>

              {/* Patient 2 */}
              <div className="p-5 flex items-center hover:bg-brand-50 transition-colors">
                <div className="w-16 text-center border-r border-brand-100 pr-4 mr-4">
                  <p className="text-lg font-bold text-brand-700">11:30</p>
                  <p className="text-xs text-text-muted">AM</p>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text-dark">Rahul Verma</h4>
                    <p className="text-sm text-text-muted flex items-center mt-1">
                      <Stethoscope className="w-3 h-3 mr-1" /> ECG Follow-up
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full hidden sm:inline-block">Upcoming</span>
                    <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-white border border-brand-200 text-text-dark hover:bg-brand-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                      View Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-card border border-brand-100 p-5">
            <h3 className="font-bold text-lg text-brand-900 mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-sm text-text-dark">Review Lab Results</p>
                  <p className="text-xs text-text-muted">3 new lipid profiles ready for review</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-sm text-text-dark">Sign Prescriptions</p>
                  <p className="text-xs text-text-muted">2 pending from morning rounds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-700 rounded-2xl shadow-card p-6 text-white text-center relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-600 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-500 rounded-full opacity-50"></div>
            <Activity className="w-10 h-10 mx-auto mb-3 text-brand-100 relative z-10" />
            <h3 className="font-bold text-lg mb-2 relative z-10">AI Record Summarizer</h3>
            <p className="text-brand-100 text-sm mb-4 relative z-10">Instantly summarize patient histories and lab results.</p>
            <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-white text-brand-700 font-bold py-2 px-4 rounded-lg w-full transition-transform hover:scale-105 relative z-10 shadow-md">
              Summarize Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
