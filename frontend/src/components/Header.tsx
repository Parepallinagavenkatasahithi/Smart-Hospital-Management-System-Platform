import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  userName: string;
  roleBadge: string;
}

export default function Header({ toggleSidebar, userName, roleBadge }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-brand-200 flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 mr-4 rounded-lg text-text-muted hover:bg-brand-50 hover:text-brand-700 md:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search patients, doctors, records..."
            className="pl-10 pr-4 py-2 bg-brand-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64 lg:w-96"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-text-muted hover:bg-brand-50 hover:text-brand-700 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-brand-200 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-text-dark">{userName}</p>
            <p className="text-xs text-brand-600 font-medium">{roleBadge}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
