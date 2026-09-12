import { Calendar, Clock, Stethoscope, Pill, FlaskConical, CreditCard, Activity, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Welcome back, Mounika</h2>
          <p className="text-text-muted mt-1">Here's an overview of your healthcare activity.</p>
        </div>
        <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center w-fit">
          <Calendar className="w-5 h-5 mr-2" />
          Book Appointment
        </button>
      </div>

      {/* Top Stats / Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Next Appointment</p>
            <p className="text-lg font-bold text-text-dark">Tomorrow, 10:00 AM</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mr-4">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Active Prescriptions</p>
            <p className="text-lg font-bold text-text-dark">2 Medicines</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Lab Reports</p>
            <p className="text-lg font-bold text-text-dark">1 Ready</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-card border border-brand-100 flex items-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Outstanding Balance</p>
            <p className="text-lg font-bold text-text-dark">$150.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area: Upcoming Appointment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-card border border-brand-100 overflow-hidden">
            <div className="p-5 border-b border-brand-100 flex justify-between items-center bg-brand-50/50">
              <h3 className="font-bold text-lg text-brand-900">Upcoming Appointment</h3>
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full">Confirmed</span>
            </div>
            <div className="p-5 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold mr-4">
                    PS
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark text-lg">Dr. Priya Sharma</h4>
                    <p className="text-brand-600 font-medium text-sm">Cardiologist • Cardiology Dept</p>
                  </div>
                </div>
                <div className="flex items-center text-text-muted mb-2">
                  <Calendar className="w-4 h-4 mr-2" /> <span>Oct 15, 2026</span>
                </div>
                <div className="flex items-center text-text-muted">
                  <Clock className="w-4 h-4 mr-2" /> <span>10:00 AM - 10:30 AM</span>
                </div>
              </div>
              <div className="sm:border-l sm:border-brand-100 sm:pl-6 flex flex-col justify-center gap-3">
                <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="w-full text-brand-700 bg-brand-50 hover:bg-brand-100 font-medium py-2 px-4 rounded-lg transition-colors text-sm">Reschedule</button>
                <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="w-full text-red-600 bg-red-50 hover:bg-red-100 font-medium py-2 px-4 rounded-lg transition-colors text-sm">Cancel</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-brand-100 p-5">
            <h3 className="font-bold text-lg text-brand-900 mb-4">Health Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-1 mr-3 shrink-0">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-text-dark">Lipid Profile Results Available</p>
                  <p className="text-sm text-text-muted">Your recent blood work results have been uploaded by the laboratory.</p>
                  <p className="text-xs text-brand-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mt-1 mr-3 shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-text-dark">Follow-up Recommended</p>
                  <p className="text-sm text-text-muted">Dr. Priya Sharma requested a follow-up appointment in 2 weeks.</p>
                  <p className="text-xs text-brand-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Quick Actions */}
        <div className="space-y-6">
          <div className="bg-brand-700 rounded-2xl shadow-card p-6 text-white text-center relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-600 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-500 rounded-full opacity-50"></div>
            <Activity className="w-10 h-10 mx-auto mb-3 text-brand-100 relative z-10" />
            <h3 className="font-bold text-lg mb-2 relative z-10">AI Health Assistant</h3>
            <p className="text-brand-100 text-sm mb-4 relative z-10">Have questions about your reports or prescriptions? Ask our AI assistant.</p>
            <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-white text-brand-700 font-bold py-2 px-4 rounded-lg w-full transition-transform hover:scale-105 relative z-10 shadow-md">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-brand-100 p-5">
            <h3 className="font-bold text-lg text-brand-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/patient/records" className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 transition-colors group">
                <div className="flex items-center text-text-dark font-medium group-hover:text-brand-700">
                  <FileText className="w-5 h-5 mr-3 text-brand-500" />
                  Medical Records
                </div>
                <ArrowRight className="w-4 h-4 text-brand-300 group-hover:text-brand-700" />
              </Link>
              <Link to="/patient/prescriptions" className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 transition-colors group">
                <div className="flex items-center text-text-dark font-medium group-hover:text-brand-700">
                  <Pill className="w-5 h-5 mr-3 text-brand-500" />
                  Prescriptions
                </div>
                <ArrowRight className="w-4 h-4 text-brand-300 group-hover:text-brand-700" />
              </Link>
              <Link to="/patient/billing" className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 transition-colors group">
                <div className="flex items-center text-text-dark font-medium group-hover:text-brand-700">
                  <CreditCard className="w-5 h-5 mr-3 text-brand-500" />
                  Pay Bill
                </div>
                <ArrowRight className="w-4 h-4 text-brand-300 group-hover:text-brand-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
