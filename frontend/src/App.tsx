import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import PatientDashboard from './pages/patient/PatientDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import ManagementDashboard from './pages/management/ManagementDashboard';
import PatientList from './pages/staff/PatientList';
import PlaceholderView from './pages/PlaceholderView';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Patient Routes */}
        <Route path="/patient" element={<DashboardLayout role="PATIENT" userName="Mounika Reddy" roleBadge="Patient" />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="*" element={<PlaceholderView />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<DashboardLayout role="STAFF" userName="Dr. Priya Sharma" roleBadge="Cardiologist" />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="*" element={<PlaceholderView />} />
        </Route>

        {/* Management Routes */}
        <Route path="/management" element={<DashboardLayout role="MANAGEMENT" userName="System Admin" roleBadge="MD / Management" />}>
          <Route path="dashboard" element={<ManagementDashboard />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="*" element={<PlaceholderView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
