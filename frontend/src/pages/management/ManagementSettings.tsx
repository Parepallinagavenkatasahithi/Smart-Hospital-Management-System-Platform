import { useState } from 'react';

export default function ManagementSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">System Settings & Configuration</h1>
        <p className="text-sm text-health-olive">Hospital platform parameters, security headers, and AI service configuration.</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
          System settings updated!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4 text-xs">
        <div>
          <label className="block text-health-charcoal font-semibold mb-1">Hospital Organization Name</label>
          <input defaultValue="City General Smart Hospital" className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
        </div>
        <div>
          <label className="block text-health-charcoal font-semibold mb-1">AI Assistant Fallback Provider</label>
          <select className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50">
            <option value="LOCAL">Local Deterministic Provider (Uptime Priority)</option>
            <option value="GEMINI">Google Gemini API</option>
          </select>
        </div>
        <button type="submit" className="px-5 py-2.5 bg-health-olive text-white font-medium rounded-xl hover:bg-health-charcoal">
          Save Configuration
        </button>
      </form>
    </div>
  );
}
