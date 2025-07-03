import { Home, ShoppingBag, Wrench, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders' },
    { name: 'Services', icon: Wrench, path: '/services' },
    { name: 'Profile', icon: User, path: '/profile' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    console.log(`Bottom nav clicked: ${item.name} - navigating to ${item.path}`);
    navigate(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/home');
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200 active:scale-95",
                  isActive 
                    ? "text-purple-400 bg-purple-900/30" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-purple-400")} />
                <span className={cn("text-xs font-medium", isActive && "text-purple-400")}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}