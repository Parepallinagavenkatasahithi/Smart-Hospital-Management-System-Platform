import React, { useEffect, useState } from 'react';
import { Search, Plus, UserCheck } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton, EmptyState, PaginationControls } from '../../components/CommonUI';

export default function PatientList() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showRegModal, setShowRegModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Female',
    bloodGroup: 'O+',
    emergencyContact: ''
  });

  useEffect(() => {
    loadPatients();
  }, [page, search]);

  async function loadPatients() {
    setLoading(true);
    try {
      const data = await apiFetch(`/patients?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
      setPatients(data || []);
      if (data?.pagination) {
        setTotalPages(data.pagination.totalPages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/patients', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setShowRegModal(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: 'Female', bloodGroup: 'O+', emergencyContact: '' });
      loadPatients();
    } catch (err: any) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">Patient Directory</h1>
          <p className="text-sm text-health-olive">Search, review, and register clinical patients in the hospital database.</p>
        </div>
        <button
          onClick={() => setShowRegModal(true)}
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-health-gray shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-health-olive absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient by name, email, or MRN number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-health-gray rounded-xl text-xs bg-health-ivory/40 focus:outline-none focus:ring-2 focus:ring-health-olive"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={5} />
      ) : patients.length === 0 ? (
        <EmptyState title="No Patients Found" description="No patient profiles match your search criteria." />
      ) : (
        <div className="bg-white rounded-2xl border border-health-gray shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-health-ivory border-b border-health-gray text-health-olive uppercase tracking-wider font-semibold">
                <th className="p-3">MRN Number</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Email & Contact</th>
                <th className="p-3">Gender / DOB</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-health-gray text-health-charcoal">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-health-ivory/50">
                  <td className="p-3 font-semibold font-mono text-health-olive">{p.medicalRecordNo}</td>
                  <td className="p-3 font-bold">{p.user?.firstName} {p.user?.lastName}</td>
                  <td className="p-3 text-health-olive">{p.user?.email} • {p.user?.phone || 'N/A'}</td>
                  <td className="p-3">{p.gender} ({p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : 'N/A'})</td>
                  <td className="p-3 font-semibold text-health-red">{p.bloodGroup || 'O+'}</td>
                  <td className="p-3">
                    <button className="px-2.5 py-1 bg-health-sage/30 hover:bg-health-sage text-health-charcoal text-xs font-semibold rounded-lg">
                      Open Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-health-gray">
            <h3 className="text-lg font-bold text-health-charcoal">Register New Hospital Patient</h3>
            <form onSubmit={handleRegister} className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">First Name</label>
                <input required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/40" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Last Name</label>
                <input required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/40" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/40" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Phone</label>
                <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/40" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Date of Birth</label>
                <input type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/40" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Gender</label>
                <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full p-2 border border-health-gray rounded-xl bg-health-ivory/40">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-2 flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowRegModal(false)} className="px-4 py-2 border border-health-gray rounded-xl hover:bg-health-ivory">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-health-olive text-white rounded-xl hover:bg-health-charcoal">Save Patient Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
