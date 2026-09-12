import { useEffect, useState } from 'react';
import { User, Building, Award, Mail, Phone } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function StaffProfile() {
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

  const sp = profile?.staffProfile;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Staff Profile</h1>
        <p className="text-sm text-health-olive">Professional qualifications, department assignment, and contact details.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-4 border-b border-health-gray pb-4">
          <div className="w-16 h-16 rounded-2xl bg-health-olive text-white font-bold text-2xl flex items-center justify-center">
            {profile?.firstName?.[0]}{profile?.lastName?.[0]}
          </div>
          <div>
            <h2 className="text-lg font-bold text-health-charcoal">{profile?.firstName} {profile?.lastName}</h2>
            <p className="text-xs text-health-olive font-semibold">{sp?.designation || profile?.role}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-health-olive">
          <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /> <span>{profile?.email}</span></div>
          <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /> <span>{profile?.phone || 'Not listed'}</span></div>
          <div className="flex items-center space-x-2"><Building className="w-4 h-4" /> <span>Department: <strong className="text-health-charcoal">{sp?.department?.name || 'General Medicine'}</strong></span></div>
          <div className="flex items-center space-x-2"><Award className="w-4 h-4" /> <span>Qualification: {sp?.qualification || 'MD, Board Certified'} ({sp?.experience || 5} Years Experience)</span></div>
        </div>
      </div>
    </div>
  );
}
