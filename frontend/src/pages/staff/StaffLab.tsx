import React, { useEffect, useState } from 'react';
import { FlaskConical, CheckCircle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function StaffLab() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeReq, setActiveReq] = useState<any>(null);
  const [resultData, setResultData] = useState('');

  useEffect(() => {
    loadLabRequests();
  }, []);

  async function loadLabRequests() {
    try {
      const data = await apiFetch('/lab');
      setRequests(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (id: string, status: string, customResult?: string) => {
    try {
      await apiFetch(`/lab/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, resultData: customResult || undefined })
      });
      setActiveReq(null);
      setResultData('');
      loadLabRequests();
    } catch (e: any) {
      alert(e.message || 'Failed to update lab request');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Laboratory Workqueue & Sample Entry</h1>
        <p className="text-sm text-health-olive">Track ordered tests, collect specimens, enter results, and publish lab reports.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
              <th className="p-3">Request No</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Test Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Result Outcome</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-semibold font-mono text-health-olive">{req.requestNo}</td>
                <td className="p-3 font-bold">{req.patient?.user?.firstName} {req.patient?.user?.lastName}</td>
                <td className="p-3 font-medium">{req.test?.name}</td>
                <td className="p-3"><StatusBadge status={req.status} /></td>
                <td className="p-3 text-health-olive max-w-xs truncate">{req.resultData || 'Awaiting Results...'}</td>
                <td className="p-3 space-x-1">
                  {req.status === 'ORDERED' && (
                    <button
                      onClick={() => handleUpdateStatus(req.id, 'SAMPLE_COLLECTED')}
                      className="px-2 py-1 bg-amber-50 text-amber-800 font-semibold rounded hover:bg-amber-100"
                    >
                      Collect Sample
                    </button>
                  )}
                  {req.status === 'SAMPLE_COLLECTED' && (
                    <button
                      onClick={() => handleUpdateStatus(req.id, 'PROCESSING')}
                      className="px-2 py-1 bg-blue-50 text-blue-800 font-semibold rounded hover:bg-blue-100"
                    >
                      Start Processing
                    </button>
                  )}
                  {req.status === 'PROCESSING' && (
                    <button
                      onClick={() => setActiveReq(req)}
                      className="px-2 py-1 bg-emerald-50 text-emerald-800 font-semibold rounded hover:bg-emerald-100"
                    >
                      Enter Result
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Result Entry Modal */}
      {activeReq && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-health-gray text-xs">
            <h3 className="text-lg font-bold text-health-charcoal">Enter Diagnostic Result Outcome</h3>
            <p className="text-health-olive font-medium">Test: {activeReq.test?.name} (Patient: {activeReq.patient?.user?.firstName} {activeReq.patient?.user?.lastName})</p>
            <div>
              <label className="block font-semibold mb-1">Result Details & Reference Parameters</label>
              <textarea
                rows={4}
                value={resultData}
                onChange={(e) => setResultData(e.target.value)}
                placeholder="Enter measured values, findings, or normal reference range observations..."
                className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setActiveReq(null)} className="px-4 py-2 border border-health-gray rounded-xl">Cancel</button>
              <button
                onClick={() => handleUpdateStatus(activeReq.id, 'COMPLETED', resultData || 'Diagnostic test completed. Parameters verified.')}
                className="px-4 py-2 bg-health-olive text-white rounded-xl"
              >
                Complete & Publish Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
