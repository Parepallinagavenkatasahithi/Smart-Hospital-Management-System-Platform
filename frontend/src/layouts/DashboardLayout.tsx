import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface DashboardLayoutProps {
  role: 'PATIENT' | 'STAFF' | 'MANAGEMENT';
  userName?: string;
  roleBadge?: string;
}

export default function DashboardLayout({ 
  role, 
  userName = 'Demo User', 
  roleBadge = 'Role' 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-brand-50">
      <Sidebar role={role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-text-dark/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          userName={userName} 
          roleBadge={roleBadge} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Main content from child routes will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
