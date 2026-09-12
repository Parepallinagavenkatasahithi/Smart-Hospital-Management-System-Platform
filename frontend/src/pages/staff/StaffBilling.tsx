import React, { useEffect, useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function StaffBilling() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemAmount, setItemAmount] = useState('150.0');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [invs, pats] = await Promise.all([
        apiFetch('/billing'),
        apiFetch('/patients?limit=50')
      ]);
      setInvoices(invs || []);
      setPatients(pats || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !itemDesc) return;

    try {
      await apiFetch('/billing', {
        method: 'POST',
        body: JSON.stringify({
          patientId,
          items: [{ description: itemDesc, quantity: 1, unitPrice: parseFloat(itemAmount) }]
        })
      });
      setShowModal(false);
      setPatientId('');
      setItemDesc('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Invoice creation failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">Cashier & Patient Billing</h1>
          <p className="text-sm text-health-olive">Generate invoices, record patient payments, and issue receipts.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
              <th className="p-3">Invoice No</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Total Billed</th>
              <th className="p-3">Paid Amount</th>
              <th className="p-3">Balance Due</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {invoices.map((inv) => {
              const due = inv.finalAmount - inv.paidAmount;
              return (
                <tr key={inv.id} className="hover:bg-health-ivory/50">
                  <td className="p-3 font-semibold font-mono text-health-olive">{inv.invoiceNo}</td>
                  <td className="p-3 font-bold">{inv.patient?.user?.firstName} {inv.patient?.user?.lastName}</td>
                  <td className="p-3 font-semibold">${inv.finalAmount.toFixed(2)}</td>
                  <td className="p-3 text-emerald-700 font-medium">${inv.paidAmount.toFixed(2)}</td>
                  <td className="p-3 font-bold text-rose-700">${due.toFixed(2)}</td>
                  <td className="p-3"><StatusBadge status={inv.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-health-gray text-xs">
            <h3 className="text-lg font-bold text-health-charcoal">Issue New Hospital Invoice</h3>
            <form onSubmit={handleCreateInvoice} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Select Patient</label>
                <select required value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50">
                  <option value="">-- Select Patient --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.user?.firstName} {p.user?.lastName} ({p.medicalRecordNo})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Charge Description</label>
                <input required value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="e.g. Consultation & Diagnostic Fee" className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Amount ($)</label>
                <input type="number" required value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50" />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-health-gray rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-health-olive text-white rounded-xl">Issue Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
