import { useState } from 'react';
import { Bell, Lock, ShieldCheck } from 'lucide-react';

export default function PatientSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Account & Security Settings</h1>
        <p className="text-sm text-health-olive">Configure notification channels and privacy preferences.</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-6 text-xs">
        <div className="space-y-3">
          <h3 className="font-bold text-health-charcoal text-sm flex items-center space-x-2">
            <Bell className="w-4 h-4 text-health-olive" />
            <span>Notification Preferences</span>
          </h3>

          <div className="space-y-2 p-3 bg-health-ivory/40 rounded-xl">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-health-charcoal font-medium">Email Appointment Reminders</span>
              <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="rounded text-health-olive focus:ring-health-olive" />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-health-gray">
              <span className="text-health-charcoal font-medium">SMS Lab Result Alerts</span>
              <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} className="rounded text-health-olive focus:ring-health-olive" />
            </label>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-health-charcoal text-sm flex items-center space-x-2">
            <Lock className="w-4 h-4 text-health-olive" />
            <span>Password & Security</span>
          </h3>

          <div className="space-y-2">
            <div>
              <label className="block text-health-charcoal mb-1">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
            </div>
            <div>
              <label className="block text-health-charcoal mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
            </div>
          </div>
        </div>

        <button type="submit" className="px-5 py-2.5 bg-health-olive hover:bg-health-charcoal text-white font-medium rounded-xl transition-colors">
          Save Settings
        </button>
      </form>
    </div>
  );
}
