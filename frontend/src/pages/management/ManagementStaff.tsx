import { useEffect, useState } from 'react';
import { ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, PaginationControls } from '../../components/CommonUI';

export default function ManagementStaff() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [page]);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await apiFetch(`/users?page=${page}&limit=15`);
      setUsers(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const toggleStatus = async (id: string) => {
    try {
      await apiFetch(`/users/${id}/toggle-status`, { method: 'PATCH' });
      loadUsers();
    } catch (e: any) {
      alert(e.message || 'Status toggle failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Hospital Staff & Personnel Directory</h1>
        <p className="text-sm text-health-olive">Manage employee roles, account status, and system access levels.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">Staff Name</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Assigned Role</th>
              <th className="p-3">Account Status</th>
              <th className="p-3">Manage Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-bold">{u.firstName} {u.lastName}</td>
                <td className="p-3 text-health-olive">{u.email}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-health-sage/30 rounded font-semibold text-health-charcoal">
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  {u.isActive ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">Active</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded font-semibold border border-rose-200">Deactivated</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className={`px-3 py-1 rounded font-semibold text-xs ${
                      u.isActive ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
