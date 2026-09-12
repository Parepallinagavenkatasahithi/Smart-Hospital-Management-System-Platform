import { useEffect, useState } from 'react';
import { Users, Search } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, PaginationControls } from '../../components/CommonUI';

export default function ManagementPatients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await apiFetch(`/patients?page=${page}&limit=15`);
        setPatients(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Global Patient Registry</h1>
        <p className="text-sm text-health-olive">Executive oversight of registered patient demographics and record numbers.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">MRN Number</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Email & Contact</th>
              <th className="p-3">Gender / DOB</th>
              <th className="p-3">Blood Group</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-mono font-semibold text-health-olive">{p.medicalRecordNo}</td>
                <td className="p-3 font-bold">{p.user?.firstName} {p.user?.lastName}</td>
                <td className="p-3 text-health-olive">{p.user?.email} • {p.user?.phone || 'N/A'}</td>
                <td className="p-3">{p.gender} ({p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : 'N/A'})</td>
                <td className="p-3 font-semibold text-health-red">{p.bloodGroup || 'O+'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
