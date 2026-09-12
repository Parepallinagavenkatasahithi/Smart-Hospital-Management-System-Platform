import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function StaffNotifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/notifications');
        setNotifications(data?.notifications || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Staff Notifications & System Alerts</h1>
        <p className="text-sm text-health-olive">Urgent clinical updates, pending lab approvals, and shift alerts.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 bg-white rounded-2xl border border-health-gray shadow-sm flex items-start space-x-3 text-xs">
            <Bell className="w-4 h-4 text-health-olive mt-0.5" />
            <div>
              <p className="font-semibold text-health-charcoal">{n.message}</p>
              <p className="text-health-olive mt-1">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
