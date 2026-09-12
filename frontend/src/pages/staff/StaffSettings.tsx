import { useState } from 'react';

export default function StaffSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Staff Clinical Workspace Settings</h1>
        <p className="text-sm text-health-olive">Configure shift alerts and consultation notifications.</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
          Preferences saved!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4 text-xs">
        <div>
          <label className="block text-health-charcoal font-semibold mb-1">Default Consultation Duration (Mins)</label>
          <input type="number" defaultValue={20} className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
        </div>
        <div>
          <label className="block text-health-charcoal font-semibold mb-1">Emergency Case Alerts</label>
          <select className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50">
            <option value="ALL">Immediate Push & Sound Alert</option>
            <option value="CRITICAL">Critical Cases Only</option>
          </select>
        </div>
        <button type="submit" className="px-5 py-2.5 bg-health-olive text-white font-medium rounded-xl hover:bg-health-charcoal">
          Update Staff Settings
        </button>
      </form>
    </div>
  );
}
