import { useEffect, useState } from 'react';
import { User, Phone, Mail, MapPin, Heart, Shield } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function PatientProfile() {
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

  const p = profile?.patientProfile;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Patient Profile</h1>
        <p className="text-sm text-health-olive">Personal details, contact info, and emergency contact details.</p>
      </div>

      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-4 border-b border-health-gray pb-4">
          <div className="w-16 h-16 rounded-2xl bg-health-olive text-white font-bold text-2xl flex items-center justify-center">
            {profile?.firstName?.[0]}{profile?.lastName?.[0]}
          </div>
          <div>
            <h2 className="text-lg font-bold text-health-charcoal">{profile?.firstName} {profile?.lastName}</h2>
            <p className="text-xs text-health-olive font-mono">{p?.medicalRecordNo || 'MRN-PENDING'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <p className="font-semibold text-health-charcoal uppercase tracking-wider">Contact & Demographics</p>
            <div className="p-3 bg-health-ivory/50 rounded-xl space-y-2 text-health-olive">
              <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /> <span>{profile?.email}</span></div>
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /> <span>{profile?.phone || 'Not provided'}</span></div>
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4" /> <span>{p?.address || 'Address on file'}</span></div>
              <div className="flex items-center space-x-2"><User className="w-4 h-4" /> <span>Gender: {p?.gender || 'N/A'}, DOB: {p?.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : 'N/A'}</span></div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-health-charcoal uppercase tracking-wider">Clinical Background</p>
            <div className="p-3 bg-health-ivory/50 rounded-xl space-y-2 text-health-olive">
              <div className="flex items-center space-x-2"><Heart className="w-4 h-4 text-health-red" /> <span>Blood Group: <strong className="text-health-charcoal">{p?.bloodGroup || 'O+'}</strong></span></div>
              <div className="flex items-center space-x-2"><Shield className="w-4 h-4 text-amber-600" /> <span>Known Allergies: {p?.allergies || 'None recorded'}</span></div>
              <div className="pt-1">
                <span className="font-semibold text-health-charcoal">Medical History:</span>
                <p className="mt-0.5">{p?.medicalHistory || 'No prior conditions logged.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
