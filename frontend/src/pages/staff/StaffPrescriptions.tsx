import React, { useEffect, useState } from 'react';
import { Pill, Plus, CheckCircle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, StatusBadge } from '../../components/CommonUI';

export default function StaffPrescriptions() {
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  async function loadPrescriptions() {
    try {
      const data = await apiFetch('/prescriptions');
      setPrescriptions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleDispense = async (id: string) => {
    try {
      await apiFetch(`/prescriptions/${id}/dispense`, { method: 'PATCH' });
      loadPrescriptions();
    } catch (e: any) {
      alert(e.message || 'Dispense action failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Prescriptions & Pharmacy Queue</h1>
        <p className="text-sm text-health-olive">Monitor active physician prescriptions and process pharmacy dispensing.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
              <th className="p-3">Rx Number</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Physician</th>
              <th className="p-3">Items Count</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {prescriptions.map((rx) => (
              <tr key={rx.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-semibold font-mono text-health-olive">{rx.rxNo}</td>
                <td className="p-3 font-bold">{rx.patient?.user?.firstName} {rx.patient?.user?.lastName}</td>
                <td className="p-3 font-medium">Dr. {rx.doctor?.user?.lastName}</td>
                <td className="p-3 font-semibold">{rx.items?.length || 0} Items</td>
                <td className="p-3">
                  {rx.isDispensed ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full font-semibold border border-emerald-200">Dispensed</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full font-semibold border border-amber-200">Pending Dispensing</span>
                  )}
                </td>
                <td className="p-3">
                  {!rx.isDispensed && (
                    <button
                      onClick={() => handleDispense(rx.id)}
                      className="px-3 py-1 bg-health-olive text-white rounded-lg hover:bg-health-charcoal font-medium"
                    >
                      Dispense Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
