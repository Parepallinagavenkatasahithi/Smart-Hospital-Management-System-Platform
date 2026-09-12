import { useEffect, useState } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, PaginationControls } from '../../components/CommonUI';

export default function ManagementUsers() {
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
      alert(e.message || 'Status update failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">System User Accounts & Security Roles</h1>
        <p className="text-sm text-health-olive">Manage platform users, system credentials, and account statuses.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase font-semibold">
              <th className="p-3">User Name</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Role</th>
              <th className="p-3">Account Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-health-gray text-health-charcoal">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-health-ivory/50">
                <td className="p-3 font-bold">{u.firstName} {u.lastName}</td>
                <td className="p-3 text-health-olive">{u.email}</td>
                <td className="p-3 font-semibold">{u.role}</td>
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
                    className="px-2.5 py-1 bg-health-sage/30 hover:bg-health-sage rounded font-semibold text-xs text-health-charcoal"
                  >
                    Toggle Status
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
