import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Stethoscope, Building, 
  FileText, Pill, FlaskConical, Bed, CreditCard, 
  Bell, BarChart3, Bot, Settings, User, LogOut, ShieldCheck, ClipboardList, Activity
} from 'lucide-react';

interface SidebarProps {
  role: 'PATIENT' | 'STAFF' | 'MANAGEMENT' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'PHARMACIST' | 'LAB_TECHNICIAN' | 'ACCOUNTANT' | 'ADMIN';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ role, isOpen }: SidebarProps) {
  const patientLinks = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Find a Doctor', path: '/patient/doctors', icon: Stethoscope },
    { name: 'Medical Records', path: '/patient/records', icon: FileText },
    { name: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
    { name: 'Laboratory Reports', path: '/patient/lab', icon: FlaskConical },
    { name: 'Bills & Payments', path: '/patient/billing', icon: CreditCard },
    { name: 'Notifications', path: '/patient/notifications', icon: Bell },
    { name: 'AI Assistant', path: '/patient/ai', icon: Bot },
  ];

  const staffLinks = [
    { name: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
    { name: 'Patients', path: '/staff/patients', icon: Users },
    { name: 'Appointments', path: '/staff/appointments', icon: Calendar },
    { name: 'Doctors', path: '/staff/doctors', icon: Stethoscope },
    { name: 'Departments', path: '/staff/departments', icon: Building },
    { name: 'Medical Records', path: '/staff/records', icon: FileText },
    { name: 'Prescriptions', path: '/staff/prescriptions', icon: Pill },
    { name: 'Laboratory', path: '/staff/lab', icon: FlaskConical },
    { name: 'Pharmacy', path: '/staff/pharmacy', icon: Pill },
    { name: 'Beds & Rooms', path: '/staff/beds', icon: Bed },
    { name: 'Billing', path: '/staff/billing', icon: CreditCard },
    { name: 'Notifications', path: '/staff/notifications', icon: Bell },
    { name: 'Reports & Analytics', path: '/staff/reports', icon: BarChart3 },
    { name: 'AI Assistant', path: '/staff/ai', icon: Bot },
  ];

  const managementLinks = [
    { name: 'Executive Dashboard', path: '/management/dashboard', icon: LayoutDashboard },
    { name: 'Patients Directory', path: '/management/patients', icon: Users },
    { name: 'Staff Management', path: '/management/staff', icon: ShieldCheck },
    { name: 'Doctors Roster', path: '/management/doctors', icon: Stethoscope },
    { name: 'Departments', path: '/management/departments', icon: Building },
    { name: 'Appointments', path: '/management/appointments', icon: Calendar },
    { name: 'Medical Records', path: '/management/records', icon: FileText },
    { name: 'Laboratory Workspace', path: '/management/lab', icon: FlaskConical },
    { name: 'Pharmacy Stock', path: '/management/pharmacy', icon: Pill },
    { name: 'Bed Occupancy', path: '/management/beds', icon: Bed },
    { name: 'Billing & Revenue', path: '/management/billing', icon: CreditCard },
    { name: 'Reports Center', path: '/management/reports', icon: BarChart3 },
    { name: 'AI Assistant', path: '/management/ai', icon: Bot },
    { name: 'Audit Logs', path: '/management/audit', icon: ClipboardList },
    { name: 'User Accounts', path: '/management/users', icon: Activity },
  ];

  const links = role === 'PATIENT' ? patientLinks : role === 'MANAGEMENT' || role === 'ADMIN' ? managementLinks : staffLinks;
  const basePath = role === 'PATIENT' ? '/patient' : role === 'MANAGEMENT' || role === 'ADMIN' ? '/management' : '/staff';

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-health-gray transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
      <div className="h-16 flex items-center px-6 border-b border-health-gray bg-health-ivory">
        <div className="w-8 h-8 rounded-lg bg-health-olive flex items-center justify-center text-white font-bold mr-3 shadow-sm">
          S
        </div>
        <div>
          <h1 className="text-base font-bold text-health-charcoal tracking-tight">SHMS Platform</h1>
          <p className="text-[10px] uppercase font-semibold tracking-wider text-health-gold">Smart Hospital</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-health-sage/40 text-health-charcoal font-semibold border-l-4 border-health-olive'
                  : 'text-health-olive hover:bg-health-ivory hover:text-health-charcoal'
              }`
            }
          >
            <link.icon className="w-4 h-4 mr-3 flex-shrink-0" />
            <span className="truncate">{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-health-gray space-y-1 bg-health-ivory/50">
        <NavLink
          to={`${basePath}/profile`}
          className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-health-olive hover:bg-health-ivory hover:text-health-charcoal transition-colors"
        >
          <User className="w-4 h-4 mr-3" />
          Profile
        </NavLink>
        <NavLink
          to={`${basePath}/settings`}
          className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-health-olive hover:bg-health-ivory hover:text-health-charcoal transition-colors"
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </NavLink>
        <button
          onClick={() => {
            localStorage.removeItem('shms_token');
            localStorage.removeItem('shms_user');
            window.location.href = '/login';
          }}
          className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-health-red hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
