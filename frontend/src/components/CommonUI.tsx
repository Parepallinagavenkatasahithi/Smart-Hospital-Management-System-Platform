import React from 'react';
import { AlertCircle, Inbox, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="animate-pulse space-y-4 p-4 bg-white rounded-xl border border-health-gray shadow-sm">
    <div className="h-6 bg-health-gray rounded w-1/4"></div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-10 bg-health-ivory rounded w-full"></div>
    ))}
  </div>
);

export const EmptyState: React.FC<{ title: string; description: string; actionText?: string; onAction?: () => void }> = ({
  title,
  description,
  actionText,
  onAction
}) => (
  <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-health-sage my-4">
    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-health-ivory text-health-olive flex items-center justify-center">
      <Inbox className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-health-charcoal">{title}</h3>
    <p className="text-sm text-health-olive max-w-md mx-auto mt-1 mb-4">{description}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="px-4 py-2 bg-health-olive hover:bg-health-charcoal text-white text-sm font-medium rounded-lg transition-colors"
      >
        {actionText}
      </button>
    )}
  </div>
);

export const ErrorAlert: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center justify-between my-4">
    <div className="flex items-center space-x-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-md flex items-center space-x-1"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Retry</span>
      </button>
    )}
  </div>
);

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStyle = (st: string) => {
    switch (st.toUpperCase()) {
      case 'SCHEDULED':
      case 'ORDERED':
      case 'PENDING':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'CONFIRMED':
      case 'COMPLETED':
      case 'PAID':
      case 'AVAILABLE':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'CANCELLED':
      case 'EXPIRED':
      case 'OVERDUE':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'OCCUPIED':
      case 'ADMITTED':
      case 'IN_PROGRESS':
      case 'PROCESSING':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle(status)}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export const PaginationControls: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-health-gray rounded-b-xl">
      <p className="text-xs text-health-olive">
        Page <span className="font-medium text-health-charcoal">{currentPage}</span> of{' '}
        <span className="font-medium text-health-charcoal">{totalPages}</span>
      </p>
      <div className="flex space-x-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-health-gray hover:bg-health-ivory disabled:opacity-40 text-health-charcoal"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg border border-health-gray hover:bg-health-ivory disabled:opacity-40 text-health-charcoal"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
