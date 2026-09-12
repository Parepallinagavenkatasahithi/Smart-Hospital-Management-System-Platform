import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, FileText, Calendar } from 'lucide-react';
import {  } from 'react-router-dom';

const mockPatients = [
  { id: '1', name: 'Mounika Reddy', gender: 'Female', age: 36, phone: '1122334455', lastVisit: '2026-09-10', status: 'Active' },
  { id: '2', name: 'Rahul Verma', gender: 'Male', age: 45, phone: '9988776655', lastVisit: '2026-08-22', status: 'Active' },
  { id: '3', name: 'Sanjay Kumar', gender: 'Male', age: 52, phone: '8877665544', lastVisit: '2026-09-11', status: 'Discharged' },
];

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Patients</h2>
          <p className="text-text-muted mt-1">Manage and view all registered patients.</p>
        </div>
        <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center w-fit">
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-brand-100 overflow-hidden">
        <div className="p-5 border-b border-brand-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-brand-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search by name, ID, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="border border-brand-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-text-dark w-full sm:w-auto">
              <option>All Status</option>
              <option>Active</option>
              <option>Discharged</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-50 border-b border-brand-100 text-sm text-text-muted">
                <th className="p-4 font-semibold">Patient Name</th>
                <th className="p-4 font-semibold">ID & Contact</th>
                <th className="p-4 font-semibold">Demographics</th>
                <th className="p-4 font-semibold">Last Visit</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {mockPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-brand-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center mr-3">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-medium text-text-dark">{patient.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <p className="text-text-dark font-medium">#{patient.id.padStart(5, '0')}</p>
                    <p className="text-text-muted">{patient.phone}</p>
                  </td>
                  <td className="p-4 text-sm text-text-muted">
                    {patient.gender}, {patient.age} yrs
                  </td>
                  <td className="p-4 text-sm text-text-dark font-medium">
                    {patient.lastVisit}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="p-2 text-brand-600 hover:bg-brand-100 rounded-lg transition-colors" title="View Records">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="p-2 text-text-muted hover:bg-brand-100 rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="p-2 text-text-muted hover:bg-brand-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-brand-100 flex items-center justify-between text-sm text-text-muted bg-white">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex gap-1">
            <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="px-3 py-1 border border-brand-200 rounded hover:bg-brand-50 disabled:opacity-50">Prev</button>
            <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="px-3 py-1 bg-brand-700 text-white rounded">1</button>
            <button onClick={() => alert("Action triggered successfully! Real-time module connection pending.")} className="px-3 py-1 border border-brand-200 rounded hover:bg-brand-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
