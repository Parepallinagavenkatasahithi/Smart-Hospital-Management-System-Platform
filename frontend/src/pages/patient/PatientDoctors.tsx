import { useEffect, useState } from 'react';
import { Search, Stethoscope, Building, Award, DollarSign } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState } from '../../components/CommonUI';

export default function PatientDoctors() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [docs, depts] = await Promise.all([
          apiFetch('/doctors'),
          apiFetch('/departments')
        ]);
        setDoctors(docs || []);
        setDepartments(depts || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton rows={5} />;

  const filteredDoctors = doctors.filter((doc) => {
    const fullName = `${doc.user?.firstName} ${doc.user?.lastName}`.toLowerCase();
    const spec = (doc.specialization || '').toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase()) || spec.includes(search.toLowerCase());
    const matchesDept = !selectedDept || doc.departmentId === selectedDept || doc.department?.id === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Find a Specialist</h1>
        <p className="text-sm text-health-olive">Browse our certified medical staff and hospital department specialists.</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-health-gray shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-health-olive absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by doctor name or medical specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-health-gray rounded-xl text-xs bg-health-ivory/40 focus:outline-none focus:ring-2 focus:ring-health-olive"
          />
        </div>

        <div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full py-2 px-3 border border-health-gray rounded-xl text-xs bg-health-ivory/40 focus:outline-none focus:ring-2 focus:ring-health-olive"
          >
            <option value="">All Hospital Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <EmptyState title="No Doctors Found" description="No specialists match your search filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3 hover:border-health-sage transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-health-sage/40 text-health-olive flex items-center justify-center font-bold text-lg">
                  {doc.user?.firstName?.[0]}{doc.user?.lastName?.[0]}
                </div>
                <div>
                  <h3 className="font-bold text-health-charcoal text-sm">
                    Dr. {doc.user?.firstName} {doc.user?.lastName}
                  </h3>
                  <p className="text-xs font-semibold text-health-olive">{doc.specialization || doc.designation}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-health-olive pt-2 border-t border-health-gray">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1"><Building className="w-3.5 h-3.5" /> Department:</span>
                  <span className="font-semibold text-health-charcoal">{doc.department?.name || 'General Medicine'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1"><Award className="w-3.5 h-3.5" /> Experience:</span>
                  <span className="font-semibold text-health-charcoal">{doc.experience || 5}+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1"><DollarSign className="w-3.5 h-3.5" /> Consultation Fee:</span>
                  <span className="font-semibold text-health-charcoal">${doc.consultationFee || 100}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
