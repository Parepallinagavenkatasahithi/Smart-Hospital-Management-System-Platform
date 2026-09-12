import { useEffect, useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientNotifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await apiFetch('/notifications');
      setNotifications(data?.notifications || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const markRead = async (id: string) => {
    try {
      await apiFetch(`/notifications/${id}/read`, { method: 'PATCH' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Notifications & Alerts</h1>
        <p className="text-sm text-health-olive">Real-time alerts for appointments, lab test results, prescriptions, and billing.</p>
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No Notifications" description="You have no unread or archived notifications." />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between ${
                n.isRead ? 'bg-white border-health-gray opacity-75' : 'bg-health-sage/20 border-health-sage font-medium'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-health-ivory text-health-olive mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm text-health-charcoal">{n.message}</h4>
                  <p className="text-[11px] text-health-olive mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {!n.isRead && (
                <button
                  onClick={() => markRead(n.id)}
                  className="p-1.5 rounded-lg hover:bg-health-sage/30 text-health-olive"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
