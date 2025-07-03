import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Coffee, Home, Gamepad2, Leaf, Smartphone, Phone, Palette, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { 
    id: 'all', 
    name: 'All', 
    icon: ShoppingCart,
    color: 'text-purple-400',
    route: '/grocery'
  },
  { 
    id: 'cafe', 
    name: 'Cafe', 
    icon: Coffee,
    color: 'text-amber-400',
    route: '/grocery?category=cafe'
  },
  { 
    id: 'home', 
    name: 'Home', 
    icon: Home,
    color: 'text-blue-400',
    route: '/grocery?category=home'
  },
  { 
    id: 'toys', 
    name: 'Toys', 
    icon: Gamepad2,
    color: 'text-orange-400',
    route: '/grocery?category=toys'
  },
  { 
    id: 'fresh', 
    name: 'Fresh', 
    icon: Leaf,
    color: 'text-green-400',
    route: '/grocery?category=fresh'
  },
  { 
    id: 'electronics', 
    name: 'Electronics', 
    icon: Smartphone,
    color: 'text-indigo-400',
    route: '/grocery?category=electronics'
  },
  { 
    id: 'mobiles', 
    name: 'Mobiles', 
    icon: Phone,
    color: 'text-gray-400',
    route: '/grocery?category=mobiles'
  },
  { 
    id: 'beauty', 
    name: 'Beauty', 
    icon: Palette,
    color: 'text-pink-400',
    route: '/grocery?category=beauty'
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    icon: Shirt,
    color: 'text-red-400',
    route: '/grocery?category=fashion'
  }
];

export default function CategoryNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentCategory = new URLSearchParams(location.search).get('category') || 'all';

  const handleCategoryClick = (category: typeof categories[0]) => {
    navigate(category.route);
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = currentCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 p-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-purple-400 bg-purple-900/30"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  isActive ? "bg-purple-900/50" : "bg-gray-700"
                )}>
                  <IconComponent 
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-purple-400" : category.color
                    )} 
                  />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                {isActive && (
                  <div className="w-full h-0.5 bg-purple-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}