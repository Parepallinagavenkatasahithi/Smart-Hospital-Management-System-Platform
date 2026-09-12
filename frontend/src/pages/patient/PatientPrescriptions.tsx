import { useEffect, useState } from 'react';
import { Pill, CheckCircle, Clock } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientPrescriptions() {
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/prescriptions');
        setPrescriptions(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">My Prescriptions</h1>
        <p className="text-sm text-health-olive">View active medications prescribed by your treating physicians.</p>
      </div>

      {prescriptions.length === 0 ? (
        <EmptyState title="No Active Prescriptions" description="You have no issued prescriptions at this time." />
      ) : (
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-health-gray pb-3 gap-2">
                <div>
                  <span className="text-xs font-bold text-health-olive uppercase tracking-wider">{rx.rxNo}</span>
                  <h3 className="text-sm font-bold text-health-charcoal">Prescribed by Dr. {rx.doctor?.user?.firstName} {rx.doctor?.user?.lastName}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {rx.isDispensed ? (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200 flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dispensed by Pharmacy</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Awaiting Pharmacy Dispensing</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-health-charcoal uppercase tracking-wider">Prescribed Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rx.items?.map((item: any) => (
                    <div key={item.id} className="p-3 bg-health-ivory/50 rounded-xl border border-health-gray text-xs space-y-1">
                      <p className="font-bold text-health-charcoal">{item.medicine?.name || 'Medication Item'}</p>
                      <p className="text-health-olive">Dosage: <span className="font-semibold text-health-charcoal">{item.dosage}</span> ({item.frequency})</p>
                      <p className="text-health-olive">Duration: {item.duration} - {item.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
