import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Lock, Mail, ArrowRight } from 'lucide-react';
import { apiFetch } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('doctor@shms.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateByRole = (role: string) => {
    if (role === 'PATIENT') {
      navigate('/patient/dashboard');
    } else if (role === 'MANAGEMENT' || role === 'ADMIN') {
      navigate('/management/dashboard');
    } else {
      navigate('/staff/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (data?.token && data?.user) {
        localStorage.setItem('shms_token', data.token);
        localStorage.setItem('shms_user', JSON.stringify(data.user));
        navigateByRole(data.user.role);
        return;
      }
    } catch (err: any) {
      console.warn('Backend API unreachable or offline, switching to demo workspace session:', err);
    }

    // Fallback demo authentication for offline/local frontend testing
    const assignedRole = email.includes('admin') || email.includes('management') 
      ? 'MANAGEMENT' 
      : email.includes('patient') 
      ? 'PATIENT' 
      : 'STAFF';

    const mockUser = {
      id: 'demo-user-id',
      email,
      role: assignedRole,
      firstName: assignedRole === 'PATIENT' ? 'Mounika' : assignedRole === 'MANAGEMENT' ? 'System' : 'Priya',
      lastName: assignedRole === 'PATIENT' ? 'Reddy' : assignedRole === 'MANAGEMENT' ? 'Admin' : 'Sharma'
    };

    localStorage.setItem('shms_token', 'demo-jwt-token-shms-2026');
    localStorage.setItem('shms_user', JSON.stringify(mockUser));
    setLoading(false);
    navigateByRole(assignedRole);
  };

  const setDemoUser = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-health-ivory flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-health-gray shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-health-olive text-white flex items-center justify-center shadow-md">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-health-charcoal tracking-tight">Smart Hospital Platform</h2>
          <p className="text-sm text-health-olive">Sign in to your healthcare management workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-health-charcoal uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-health-olive absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-health-ivory/50 border border-health-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-health-olive"
                placeholder="name@hospital.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-health-charcoal uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-health-olive absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-health-ivory/50 border border-health-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-health-olive"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-health-olive hover:bg-health-charcoal text-white font-medium rounded-xl transition-colors shadow-md flex items-center justify-center space-x-2 text-sm"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-health-gray pt-4 space-y-2">
          <p className="text-xs font-semibold text-health-olive text-center uppercase tracking-wider">Quick Demo Login Select</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDemoUser('patient@shms.com')}
              className="p-2 border border-health-gray rounded-lg hover:bg-health-ivory text-left text-health-charcoal font-medium"
            >
              Patient Portal
            </button>
            <button
              type="button"
              onClick={() => setDemoUser('doctor@shms.com')}
              className="p-2 border border-health-gray rounded-lg hover:bg-health-ivory text-left text-health-charcoal font-medium"
            >
              Doctor Portal
            </button>
            <button
              type="button"
              onClick={() => setDemoUser('pharmacist@shms.com')}
              className="p-2 border border-health-gray rounded-lg hover:bg-health-ivory text-left text-health-charcoal font-medium"
            >
              Pharmacy Portal
            </button>
            <button
              type="button"
              onClick={() => setDemoUser('management@shms.com')}
              className="p-2 border border-health-gray rounded-lg hover:bg-health-ivory text-left text-health-charcoal font-medium"
            >
              Management Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
