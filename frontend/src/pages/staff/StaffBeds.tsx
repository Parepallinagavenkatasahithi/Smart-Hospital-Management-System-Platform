import React, { useEffect, useState } from 'react';
import { Bed as BedIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { StatusBadge, LoadingSkeleton } from '../../components/CommonUI';

export default function StaffBeds() {
  const [loading, setLoading] = useState(true);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    loadWards();
  }, []);

  async function loadWards() {
    try {
      const data = await apiFetch('/beds/wards');
      setWards(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const updateBed = async (bedId: string, status: string) => {
    try {
      await apiFetch(`/beds/beds/${bedId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      loadWards();
    } catch (e: any) {
      alert(e.message || 'Bed status update failed');
    }
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-health-charcoal">Ward & Bed Occupancy Visual Map</h1>
        <p className="text-sm text-health-olive">Real-time room occupancy, bed availability status, and patient bed allocations.</p>
      </div>

      <div className="space-y-6">
        {wards.map((ward) => (
          <div key={ward.id} className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-health-gray pb-3">
              <div>
                <h3 className="text-base font-bold text-health-charcoal">{ward.name}</h3>
                <p className="text-xs text-health-olive">Department: {ward.department?.name || 'General Inpatient Care'}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-health-sage/30 rounded-full text-health-charcoal">
                Capacity: {ward.capacity} Beds
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ward.rooms?.map((room: any) => (
                <div key={room.id} className="p-4 bg-health-ivory/50 rounded-xl border border-health-gray space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-health-charcoal">
                    <span>Room #{room.roomNumber} ({room.type})</span>
                    <span className="text-health-olive font-normal">${room.dailyRate}/day</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {room.beds?.map((bed: any) => {
                      const isOccupied = bed.status === 'OCCUPIED';
                      return (
                        <div
                          key={bed.id}
                          className={`p-2.5 rounded-lg border flex flex-col justify-between space-y-2 ${
                            isOccupied ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center space-x-1">
                              <BedIcon className="w-3.5 h-3.5" />
                              <span>{bed.bedNumber}</span>
                            </span>
                            <StatusBadge status={bed.status} />
                          </div>
                          <button
                            onClick={() => updateBed(bed.id, isOccupied ? 'AVAILABLE' : 'OCCUPIED')}
                            className="text-[10px] font-semibold text-center w-full py-1 bg-white/80 hover:bg-white rounded border border-gray-200 text-gray-800"
                          >
                            Toggle {isOccupied ? 'Vacant' : 'Admit'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
