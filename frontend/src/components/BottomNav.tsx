import { Home, Receipt, User, Settings, PiggyBank } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'transactions', icon: Receipt, label: 'Transaksi' },
    { id: 'saving', icon: PiggyBank, label: 'Tabungan' },
    { id: 'profile', icon: User, label: 'Profil' },
    { id: 'settings', icon: Settings, label: 'Lainnya' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 min-w-[60px]"
            >
              <item.icon 
                className={`w-6 h-6 ${
                  isActive ? 'text-rose-400' : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs ${
                  isActive ? 'text-rose-400' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
