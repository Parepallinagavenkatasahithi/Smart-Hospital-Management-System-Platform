import { useEffect, useState } from 'react';
import { ClipboardList, Shield } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, PaginationControls } from '../../components/CommonUI';

export default function ManagementAudit() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await apiFetch(`/audit?page=${page}&limit=15`);
        setLogs(data || []);
        if (data?.pagination) setTotalPages(data.pagination.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">System Compliance Audit Logs</h1>
        <p className="text-sm text-health-olive">Track user authentication, patient data access, billing updates, and administrative events.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Timestamp</th>
              <th className="p-3">User / Actor</th>
              <th className="p-3">Action Type</th>
              <th className="p-3">Resource Target</th>
              <th className="p-3">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-health-ivory/50">
                <td className="p-3 text-health-olive">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="p-3 font-bold">{log.user?.email || 'System Operation'}</td>
                <td className="p-3 font-semibold text-health-charcoal">{log.action}</td>
                <td className="p-3 text-health-olive font-mono">{log.resource}</td>
                <td className="p-3 font-mono text-[11px] text-health-olive">{log.ipAddress || '127.0.0.1'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
