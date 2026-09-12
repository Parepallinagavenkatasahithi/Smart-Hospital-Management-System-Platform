import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function OptimizedView_45_1() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_2() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_3() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_4() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_5() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_6() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_7() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_8() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_9() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_10() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_11() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_12() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_13() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_14() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_15() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_16() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_17() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_18() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_19() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_20() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_21() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_22() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_23() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_24() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_25() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_26() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_27() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_28() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_29() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_30() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_31() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_32() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_33() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_34() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_35() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_36() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_37() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_38() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_39() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_40() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_41() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_42() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_43() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_44() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_45() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_46() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_47() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_48() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_49() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

export function OptimizedView_45_50() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PATIENT') navigate('/patient/dashboard');
    else if (selectedRole === 'STAFF') navigate('/staff/dashboard');
    else if (selectedRole === 'MANAGEMENT') navigate('/management/dashboard');
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 relative">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setIsRegistering(false);
            }}
            className="absolute top-6 left-6 text-text-muted hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center mb-8 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 mb-4">
              {selectedRole === 'PATIENT' && <User size={32} />}
              {selectedRole === 'STAFF' && <Activity size={32} />}
              {selectedRole === 'MANAGEMENT' && <Building size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-brand-900">
              {selectedRole === 'PATIENT' ? 'Patient Portal' : 
               selectedRole === 'STAFF' ? 'Staff Portal' : 'Management Portal'}
            </h2>
            <p className="text-text-muted mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-brand-600 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => alert("Password reset link sent to your email!")} className="text-sm font-medium text-brand-600 hover:text-brand-800">Forgot password?</button>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-brand-700 text-white font-medium py-2.5 rounded-lg hover:bg-brand-800 transition-colors shadow-sm"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>

          {selectedRole === 'PATIENT' && (
            <p className="text-center text-sm text-text-muted mt-6">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)} 
                className="text-brand-600 font-medium hover:text-brand-800"
              >
                {isRegistering ? 'Sign in here' : 'Register here'}
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-900 mb-4 tracking-tight">Smart Hospital Management System</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Connected Care. Smarter Management. Better Outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Patient Card */}
        <div 
          onClick={() => setSelectedRole('PATIENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Patient</h3>
          <p className="text-text-muted mb-6">Access your healthcare journey, book appointments, and view records.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Patient →</span>
        </div>

        {/* Staff Card */}
        <div 
          onClick={() => setSelectedRole('STAFF')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Staff</h3>
          <p className="text-text-muted mb-6">Manage patients, hospital operations, and provide clinical care.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Staff →</span>
        </div>

        {/* Management Card */}
        <div 
          onClick={() => setSelectedRole('MANAGEMENT')}
          className="bg-white rounded-2xl p-8 cursor-pointer shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-200 group text-center"
        >
          <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-3">Management / MD</h3>
          <p className="text-text-muted mb-6">Monitor hospital analytics, revenue, and manage the entire hospital.</p>
          <span className="inline-block text-brand-600 font-medium group-hover:text-brand-800">Login as Management →</span>
        </div>
      </div>
    </div>
  );

}

