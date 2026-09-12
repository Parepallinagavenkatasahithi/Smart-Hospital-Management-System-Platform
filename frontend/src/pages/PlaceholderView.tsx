import { useLocation } from 'react-router-dom';
import { User, Settings, FileText, CreditCard, FlaskConical, Pill, Calendar, Search, Filter, Download } from 'lucide-react';

export default function PlaceholderView() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  
  const pathParts = path.split('/').filter(Boolean);
  const moduleName = pathParts[pathParts.length - 1] || 'Module';
  const formattedName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

  // Profile / Settings View
  if (path.includes('profile') || path.includes('settings')) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">{formattedName} Configuration</h2>
          <p className="text-text-muted mt-1">Manage your account details and preferences.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-card border border-brand-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-brand-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 shadow-inner">
                {path.includes('profile') ? <User size={48} /> : <Settings size={48} />}
              </div>
              <button className="text-sm font-medium text-brand-600 hover:text-brand-800 bg-brand-50 px-4 py-2 rounded-lg transition-colors">
                Change Photo
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">First Name</label>
                <input type="text" defaultValue="Mounika" className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-text-dark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Last Name</label>
                <input type="text" defaultValue="Reddy" className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-text-dark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
                <input type="email" defaultValue="mounika@example.com" className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-text-dark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Phone Number</label>
                <input type="text" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-text-dark" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 border border-brand-200 text-text-dark font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={() => alert("Settings saved successfully!")} className="px-6 py-2.5 bg-brand-700 text-white font-medium rounded-lg hover:bg-brand-800 transition-colors shadow-sm">Save Changes</button>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic Data Table View for everything else (Billing, Records, Pharmacy, etc.)
  let Icon = FileText;
  let headers = ['ID', 'Date', 'Description', 'Status', 'Action'];
  let mockData = [
    { id: '1024', date: '2026-09-12', desc: 'Standard Checkup', status: 'Completed' },
    { id: '1025', date: '2026-09-14', desc: 'Blood Test Analysis', status: 'Pending' },
    { id: '1026', date: '2026-09-18', desc: 'Consultation Follow-up', status: 'Scheduled' },
    { id: '1027', date: '2026-09-22', desc: 'Vaccination', status: 'Scheduled' },
  ];

  if (path.includes('billing')) {
    Icon = CreditCard;
    headers = ['Invoice #', 'Date', 'Amount', 'Status', 'Action'];
    mockData = [
      { id: 'INV-401', date: '2026-09-10', desc: '$120.00', status: 'Paid' },
      { id: 'INV-402', date: '2026-09-12', desc: '$45.00', status: 'Pending' },
    ];
  } else if (path.includes('lab')) {
    Icon = FlaskConical;
    headers = ['Test ID', 'Date', 'Test Name', 'Status', 'Action'];
    mockData = [
      { id: 'LAB-992', date: '2026-09-11', desc: 'Complete Blood Count', status: 'Ready' },
      { id: 'LAB-993', date: '2026-09-12', desc: 'Lipid Panel', status: 'Processing' },
    ];
  } else if (path.includes('prescriptions') || path.includes('pharmacy')) {
    Icon = Pill;
    headers = ['Rx ID', 'Date', 'Medication', 'Status', 'Action'];
    mockData = [
      { id: 'RX-221', date: '2026-09-10', desc: 'Amoxicillin 500mg', status: 'Dispensed' },
      { id: 'RX-222', date: '2026-09-12', desc: 'Lisinopril 10mg', status: 'Active' },
    ];
  } else if (path.includes('appointments')) {
    Icon = Calendar;
    headers = ['Appt ID', 'Date & Time', 'Doctor/Dept', 'Status', 'Action'];
    mockData = [
      { id: 'APT-11', date: '2026-09-15 10:00 AM', desc: 'Dr. Sharma (Cardiology)', status: 'Confirmed' },
      { id: 'APT-12', date: '2026-09-22 02:30 PM', desc: 'Dr. Gupta (General)', status: 'Pending' },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900 flex items-center">
            <Icon className="w-6 h-6 mr-3 text-brand-600" />
            {formattedName} Data
          </h2>
          <p className="text-text-muted mt-1">Manage and view records for {formattedName.toLowerCase()}.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-brand-200 text-text-dark font-medium rounded-lg hover:bg-brand-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-brand-700 text-white font-medium rounded-lg hover:bg-brand-800 transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-brand-100 overflow-hidden">
        <div className="p-4 border-b border-brand-100 bg-brand-50/50 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder={`Search ${formattedName.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-brand-100 text-sm text-text-muted">
                {headers.map((h, i) => <th key={i} className="p-4 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {mockData.map((row, i) => (
                <tr key={i} className="hover:bg-brand-50/50 transition-colors">
                  <td className="p-4 font-medium text-brand-700">{row.id}</td>
                  <td className="p-4 text-text-dark text-sm">{row.date}</td>
                  <td className="p-4 text-text-dark text-sm">{row.desc}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      row.status === 'Completed' || row.status === 'Paid' || row.status === 'Dispensed' || row.status === 'Confirmed' || row.status === 'Ready'
                        ? 'bg-green-100 text-green-700' 
                        : row.status === 'Pending' || row.status === 'Processing'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-brand-100 text-brand-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => alert(`Opening details for ${row.id}...`)} className="text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors">View Details</button>
                  </td>
                </tr>
              ))}
              {mockData.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
