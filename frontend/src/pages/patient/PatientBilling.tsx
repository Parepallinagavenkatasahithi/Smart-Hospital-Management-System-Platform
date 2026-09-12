import React, { useEffect, useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientBilling() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payModalInvoice, setPayModalInvoice] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    try {
      const data = await apiFetch('/billing');
      setInvoices(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payModalInvoice) return;

    const dueAmount = payModalInvoice.finalAmount - payModalInvoice.paidAmount;

    try {
      await apiFetch('/billing/payments', {
        method: 'POST',
        body: JSON.stringify({
          invoiceId: payModalInvoice.id,
          amount: dueAmount,
          paymentMethod
        })
      });

      setSuccessMsg('Payment successfully processed!');
      setPayModalInvoice(null);
      loadInvoices();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Payment processing failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Bills & Financial Statements</h1>
        <p className="text-sm text-health-olive">Review hospital billing statements, itemized charges, and payment receipts.</p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {invoices.length === 0 ? (
        <EmptyState title="No Invoices Found" description="There are no billing records associated with your account." />
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => {
            const dueAmount = inv.finalAmount - inv.paidAmount;
            return (
              <div key={inv.id} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-health-gray pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-health-olive uppercase">{inv.invoiceNo}</span>
                    <h3 className="text-sm font-bold text-health-charcoal">Total Billed: ${inv.finalAmount.toFixed(2)}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={inv.status} />
                    {dueAmount > 0 && (
                      <button
                        onClick={() => setPayModalInvoice(inv)}
                        className="px-3 py-1.5 bg-health-olive hover:bg-health-charcoal text-white text-xs font-semibold rounded-xl transition-colors"
                      >
                        Pay Balance (${dueAmount.toFixed(2)})
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-health-charcoal uppercase tracking-wider">Line Items</h4>
                  <div className="space-y-1">
                    {inv.items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-xs p-2 bg-health-ivory/50 rounded-lg">
                        <span className="text-health-charcoal font-medium">{item.description} (x{item.quantity})</span>
                        <span className="font-bold text-health-charcoal">${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Drawer */}
      {payModalInvoice && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-health-gray">
            <h3 className="text-lg font-bold text-health-charcoal">Settle Outstanding Bill</h3>
            <p className="text-xs text-health-olive">Invoice #{payModalInvoice.invoiceNo}</p>
            <div className="p-3 bg-health-ivory/50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between"><span>Total Amount:</span><span>${payModalInvoice.finalAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Already Paid:</span><span>${payModalInvoice.paidAmount.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-health-charcoal pt-1 border-t border-health-gray">
                <span>Balance Due Now:</span><span>${(payModalInvoice.finalAmount - payModalInvoice.paidAmount).toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-health-charcoal mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
                >
                  <option value="CREDIT_CARD">Credit / Debit Card</option>
                  <option value="ONLINE">Online Portal Settlement</option>
                  <option value="INSURANCE">Insurance Claim Direct</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPayModalInvoice(null)}
                  className="px-4 py-2 border border-health-gray rounded-xl hover:bg-health-ivory text-health-charcoal font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-health-olive text-white rounded-xl hover:bg-health-charcoal font-medium"
                >
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
