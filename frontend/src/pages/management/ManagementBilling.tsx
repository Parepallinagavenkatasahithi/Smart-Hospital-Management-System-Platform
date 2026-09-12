import { useEffect, useState } from 'react';
import { DollarSign, CreditCard } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementBilling() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/billing');
        setInvoices(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton rows={5} />;

  const totalBilled = invoices.reduce((sum, i) => sum + i.finalAmount, 0);
  const totalCollected = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const pendingBalance = totalBilled - totalCollected;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Hospital Financial Revenue & Billing Oversight</h1>
        <p className="text-sm text-health-olive">Executive accounts receivable, collections, and outstanding patient balances.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Gross Billing</p>
          <p className="text-xl font-bold text-health-charcoal mt-1">${totalBilled.toLocaleString()}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Total Collected</p>
          <p className="text-xl font-bold text-emerald-700 mt-1">${totalCollected.toLocaleString()}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-health-gray shadow-sm">
          <p className="text-xs text-health-olive font-semibold uppercase">Outstanding Balance</p>
          <p className="text-xl font-bold text-rose-700 mt-1">${pendingBalance.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Invoice No</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Paid Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-mono text-health-olive font-semibold">{inv.invoiceNo}</td>
                <td className="p-3 font-bold">{inv.patient?.user?.firstName} {inv.patient?.user?.lastName}</td>
                <td className="p-3 font-semibold">${inv.finalAmount.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-medium">${inv.paidAmount.toFixed(2)}</td>
                <td className="p-3"><StatusBadge status={inv.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
