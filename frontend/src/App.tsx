import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import AIAssistant from './pages/AIAssistant';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientDoctors from './pages/patient/PatientDoctors';
import PatientRecords from './pages/patient/PatientRecords';
import PatientPrescriptions from './pages/patient/PatientPrescriptions';
import PatientLab from './pages/patient/PatientLab';
import PatientBilling from './pages/patient/PatientBilling';
import PatientNotifications from './pages/patient/PatientNotifications';
import PatientProfile from './pages/patient/PatientProfile';
import PatientSettings from './pages/patient/PatientSettings';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import PatientList from './pages/staff/PatientList';
import StaffAppointments from './pages/staff/StaffAppointments';
import StaffDoctors from './pages/staff/StaffDoctors';
import StaffDepartments from './pages/staff/StaffDepartments';
import StaffRecords from './pages/staff/StaffRecords';
import StaffPrescriptions from './pages/staff/StaffPrescriptions';
import StaffLab from './pages/staff/StaffLab';
import StaffPharmacy from './pages/staff/StaffPharmacy';
import StaffBeds from './pages/staff/StaffBeds';
import StaffBilling from './pages/staff/StaffBilling';
import StaffNotifications from './pages/staff/StaffNotifications';
import StaffReports from './pages/staff/StaffReports';
import StaffProfile from './pages/staff/StaffProfile';
import StaffSettings from './pages/staff/StaffSettings';

// Management Pages
import ManagementDashboard from './pages/management/ManagementDashboard';
import ManagementPatients from './pages/management/ManagementPatients';
import ManagementStaff from './pages/management/ManagementStaff';
import ManagementDoctors from './pages/management/ManagementDoctors';
import ManagementDepartments from './pages/management/ManagementDepartments';
import ManagementAppointments from './pages/management/ManagementAppointments';
import ManagementRecords from './pages/management/ManagementRecords';
import ManagementLab from './pages/management/ManagementLab';
import ManagementPharmacy from './pages/management/ManagementPharmacy';
import ManagementBeds from './pages/management/ManagementBeds';
import ManagementBilling from './pages/management/ManagementBilling';
import ManagementReports from './pages/management/ManagementReports';
import ManagementAudit from './pages/management/ManagementAudit';
import ManagementUsers from './pages/management/ManagementUsers';
import ManagementProfile from './pages/management/ManagementProfile';
import ManagementSettings from './pages/management/ManagementSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Patient Role Portal */}
        <Route path="/patient" element={<DashboardLayout role="PATIENT" userName="Mounika Reddy" roleBadge="Patient Profile" />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="doctors" element={<PatientDoctors />} />
          <Route path="records" element={<PatientRecords />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="lab" element={<PatientLab />} />
          <Route path="billing" element={<PatientBilling />} />
          <Route path="notifications" element={<PatientNotifications />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="settings" element={<PatientSettings />} />
          <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
        </Route>

        {/* Staff & Clinical Role Portal */}
        <Route path="/staff" element={<DashboardLayout role="STAFF" userName="Dr. Priya Sharma" roleBadge="Senior Cardiologist" />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="appointments" element={<StaffAppointments />} />
          <Route path="doctors" element={<StaffDoctors />} />
          <Route path="departments" element={<StaffDepartments />} />
          <Route path="records" element={<StaffRecords />} />
          <Route path="prescriptions" element={<StaffPrescriptions />} />
          <Route path="lab" element={<StaffLab />} />
          <Route path="pharmacy" element={<StaffPharmacy />} />
          <Route path="beds" element={<StaffBeds />} />
          <Route path="billing" element={<StaffBilling />} />
          <Route path="notifications" element={<StaffNotifications />} />
          <Route path="reports" element={<StaffReports />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route path="settings" element={<StaffSettings />} />
          <Route path="*" element={<Navigate to="/staff/dashboard" replace />} />
        </Route>

        {/* Management & Executive Portal */}
        <Route path="/management" element={<DashboardLayout role="MANAGEMENT" userName="Executive Director" roleBadge="System Admin" />}>
          <Route path="dashboard" element={<ManagementDashboard />} />
          <Route path="patients" element={<ManagementPatients />} />
          <Route path="staff" element={<ManagementStaff />} />
          <Route path="doctors" element={<ManagementDoctors />} />
          <Route path="departments" element={<ManagementDepartments />} />
          <Route path="appointments" element={<ManagementAppointments />} />
          <Route path="records" element={<ManagementRecords />} />
          <Route path="lab" element={<ManagementLab />} />
          <Route path="pharmacy" element={<ManagementPharmacy />} />
          <Route path="beds" element={<ManagementBeds />} />
          <Route path="billing" element={<ManagementBilling />} />
          <Route path="reports" element={<ManagementReports />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="audit" element={<ManagementAudit />} />
          <Route path="users" element={<ManagementUsers />} />
          <Route path="profile" element={<ManagementProfile />} />
          <Route path="settings" element={<ManagementSettings />} />
          <Route path="*" element={<Navigate to="/management/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
