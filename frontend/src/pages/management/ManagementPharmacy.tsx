import { useEffect, useState } from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementPharmacy() {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/pharmacy');
        setMedicines(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton rows={5} />;

  const lowStock = medicines.filter((m) => m.totalStock <= (m.reorderLevel || 25));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Pharmacy Stock & Valuation</h1>
        <p className="text-sm text-health-olive">Executive inventory audit, reorder level alerts, and stock valuation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Total Catalog Items</p>
          <p className="text-2xl font-bold text-health-charcoal mt-1">{medicines.length}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Low Stock Alerts</p>
          <p className="text-2xl font-bold text-rose-700 mt-1">{lowStock.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Item Code</th>
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">UnitPrice</th>
              <th className="p-3">Current Stock</th>
              <th className="p-3">Reorder Threshold</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {medicines.map((m) => (
              <tr key={m.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-mono text-health-olive font-semibold">{m.code}</td>
                <td className="p-3 font-bold">{m.name}</td>
                <td className="p-3 text-health-olive">{m.category}</td>
                <td className="p-3 font-semibold">${m.unitPrice.toFixed(2)}</td>
                <td className="p-3 font-bold">{m.totalStock} Units</td>
                <td className="p-3 text-health-olive">{m.reorderLevel || 25} Units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
