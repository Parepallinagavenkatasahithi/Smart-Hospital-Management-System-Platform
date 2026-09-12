import { useEffect, useState } from 'react';
import { Building, Users, Calendar } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function StaffDepartments() {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/departments');
        setDepartments(data || []);
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
        <h1 className="text-xl font-bold text-health-charcoal">Hospital Departments</h1>
        <p className="text-sm text-health-olive">Overview of medical specialties and staff allocations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-health-sage/30 rounded-xl text-health-olive">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-health-charcoal text-sm">{dept.name}</h3>
                <span className="text-[10px] font-mono uppercase bg-health-ivory border border-health-gray px-1.5 py-0.5 rounded">Code: {dept.code || 'DEPT'}</span>
              </div>
            </div>

            <p className="text-xs text-health-olive line-clamp-2">{dept.description || 'Clinical specialty department.'}</p>

            <div className="pt-2 border-t border-health-gray flex justify-between text-xs text-health-olive font-medium">
              <span>{dept._count?.staff || 0} Staff Assigned</span>
              <span>{dept._count?.appointments || 0} Visits Logged</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
