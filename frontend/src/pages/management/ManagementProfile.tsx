import { useEffect, useState } from 'react';
import { User, Shield, Mail } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const user = await apiFetch('/auth/me');
        setProfile(user);
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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Executive Profile</h1>
        <p className="text-sm text-health-olive">Management account credentials and security role metadata.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4 text-xs">
        <div className="flex items-center space-x-4 border-b border-health-gray pb-4">
          <div className="w-16 h-16 rounded-2xl bg-health-olive text-white font-bold text-2xl flex items-center justify-center">
            {profile?.firstName?.[0]}{profile?.lastName?.[0]}
          </div>
          <div>
            <h2 className="text-lg font-bold text-health-charcoal">{profile?.firstName} {profile?.lastName}</h2>
            <p className="text-xs text-health-gold font-semibold uppercase">{profile?.role}</p>
          </div>
        </div>

        <div className="space-y-2 text-health-olive">
          <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /> <span>{profile?.email}</span></div>
          <div className="flex items-center space-x-2"><Shield className="w-4 h-4 text-health-olive" /> <span>Access Scope: Full Executive & System Admin Permissions</span></div>
        </div>
      </div>
    </div>
  );
}
