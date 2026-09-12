import React, { useEffect, useState } from 'react';
import { Pill, Plus, AlertTriangle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function StaffPharmacy() {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [medData, setMedData] = useState({
    name: '',
    genericName: '',
    category: 'Analgesic',
    manufacturer: '',
    unitPrice: '10.0',
    totalStock: '100',
    reorderLevel: '25'
  });

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    try {
      const data = await apiFetch('/pharmacy');
      setMedicines(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleAddMed = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/pharmacy', {
        method: 'POST',
        body: JSON.stringify(medData)
      });
      setShowAddModal(false);
      setMedData({ name: '', genericName: '', category: 'Analgesic', manufacturer: '', unitPrice: '10.0', totalStock: '100', reorderLevel: '25' });
      loadMedicines();
    } catch (err: any) {
      alert(err.message || 'Failed to add medicine');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  const lowStockMeds = medicines.filter((m) => m.totalStock <= (m.reorderLevel || 25));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">Pharmacy Inventory & Stock Control</h1>
          <p className="text-sm text-health-olive">Monitor medicine catalogs, stock levels, reorder thresholds, and batch expiry dates.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Medicine Item</span>
        </button>
      </div>

      {lowStockMeds.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span className="font-semibold">{lowStockMeds.length} items are currently at or below reorder threshold levels.</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
              <th className="p-3">Item Code</th>
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">Total Stock</th>
              <th className="p-3">Stock Alert</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {medicines.map((m) => {
              const isLow = m.totalStock <= (m.reorderLevel || 25);
              return (
                <tr key={m.id} className="hover:bg-health-ivory/50">
                  <td className="p-3 font-semibold font-mono text-health-olive">{m.code}</td>
                  <td className="p-3 font-bold">{m.name} <span className="text-[10px] text-health-olive block font-normal">{m.genericName}</span></td>
                  <td className="p-3 text-health-olive">{m.category}</td>
                  <td className="p-3 font-semibold">${m.unitPrice.toFixed(2)}</td>
                  <td className="p-3 font-bold">{m.totalStock} Units</td>
                  <td className="p-3">
                    {isLow ? (
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded font-semibold border border-rose-200">Low Stock</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">Optimal</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-health-gray text-xs">
            <h3 className="text-lg font-bold text-health-charcoal">Add Medicine to Inventory</h3>
            <form onSubmit={handleAddMed} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Brand Name</label>
                <input required value={medData.name} onChange={(e) => setMedData({ ...medData, name: e.target.value })} placeholder="e.g. Paracetamol 500mg" className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Generic Name</label>
                <input value={medData.genericName} onChange={(e) => setMedData({ ...medData, genericName: e.target.value })} placeholder="e.g. Acetaminophen" className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select value={medData.category} onChange={(e) => setMedData({ ...medData, category: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/50">
                  <option value="Analgesic">Analgesic</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Antihypertensive">Antihypertensive</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Unit Price ($)</label>
                  <input type="number" step="0.1" value={medData.unitPrice} onChange={(e) => setMedData({ ...medData, unitPrice: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/50" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Initial Stock</label>
                  <input type="number" value={medData.totalStock} onChange={(e) => setMedData({ ...medData, totalStock: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/50" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-health-gray rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-health-olive text-white rounded-xl">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
