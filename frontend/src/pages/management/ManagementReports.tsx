import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { LoadingSkeleton } from '../../components/CommonUI';

export default function ManagementReports() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/reports/executive');
        setAnalytics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const downloadCSVReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Total Patients,${analytics?.totalPatients || 0}\n`
      + `Total Appointments,${analytics?.totalAppointments || 0}\n`
      + `Gross Revenue,$${analytics?.revenue || 0}\n`
      + `Bed Occupancy,${analytics?.occupancyRate || 0}%\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SHMS_Executive_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-health-charcoal">Hospital Reporting & Export Center</h1>
          <p className="text-sm text-health-olive">Generate clinical, revenue, occupancy, and workload CSV reports.</p>
        </div>
        <button
          onClick={downloadCSVReport}
          className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Executive CSV Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-health-gray shadow-sm space-y-3">
          <h3 className="font-bold text-health-charcoal text-sm">Monthly Operational Summary</h3>
          <p className="text-xs text-health-olive">Aggregated metrics covering revenue, bed utilization, and outpatient visits.</p>
          <button onClick={downloadCSVReport} className="px-3 py-1.5 bg-health-sage/30 hover:bg-health-sage text-health-charcoal font-semibold rounded-lg text-xs">
            Download Operational Summary (.CSV)
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-health-gray shadow-sm space-y-3">
          <h3 className="font-bold text-health-charcoal text-sm">Pharmacy & Diagnostic Audit</h3>
          <p className="text-xs text-health-olive">Inventory valuation, low-stock alerts, and laboratory workload metrics.</p>
          <button onClick={downloadCSVReport} className="px-3 py-1.5 bg-health-sage/30 hover:bg-health-sage text-health-charcoal font-semibold rounded-lg text-xs">
            Download Pharmacy & Lab Report (.CSV)
          </button>
        </div>
      </div>
    </div>
  );
}
