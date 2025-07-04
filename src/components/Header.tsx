import { User, ShoppingBag, LogOut, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SearchBar from '@/components/SearchBar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { toast } from 'sonner';

export default function Header() {
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();
  const { state: locationState } = useLocation();

  const handleAuthAction = () => {
    if (authState.isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const handleCartClick = () => {
    if (!authState.isAuthenticated) {
      toast.error('Please sign in to view your cart');
      navigate('/auth');
      return;
    }
    navigate('/cart');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Location */}
          <div className="flex items-center space-x-6">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                loctail
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                <span className="text-xs font-bold text-gray-900">SUPER SAVER</span>
              </div>
            </div>
            
            {/* Location Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-left text-white hover:text-white hover:bg-gray-800">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {locationState.currentLocation?.name || 'Select Location'}
                    </span>
                    <span className="text-xs text-gray-300 truncate max-w-32">
                      {locationState.currentLocation?.address || 'Choose delivery location'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-gray-800 border-gray-700" align="start">
                <DropdownMenuLabel className="text-white">Delivery Locations</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                {locationState.savedLocations.map((location) => (
                  <DropdownMenuItem key={location.id} className="p-3 text-white hover:bg-gray-700">
                    <div>
                      <p className="font-medium text-white">{location.name}</p>
                      <p className="text-sm text-gray-300">{location.address}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={() => navigate('/add-address')}
                  className="text-purple-400 hover:bg-gray-700"
                >
                  Add New Location
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <SearchBar className="flex-1 max-w-lg mx-8" />

          {/* Cart & Profile */}
          <div className="flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-white hover:bg-gray-800">
                    <User className="w-4 h-4" />
                    <span className="text-white">{authState.user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
                  <DropdownMenuLabel className="text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-white">{authState.user?.name}</p>
                      <p className="text-xs text-gray-300">{authState.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="text-white hover:bg-gray-700"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/orders')}
                    className="text-white hover:bg-gray-700"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                onClick={handleAuthAction}
                className="flex items-center space-x-2 text-white hover:text-white hover:bg-gray-800"
              >
                <User className="w-4 h-4" />
                <span className="text-white">Login</span>
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              onClick={handleCartClick}
              className="relative flex items-center space-x-2 text-white hover:text-white hover:bg-gray-800"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-white">Cart</span>
              {cartState.items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5">
                  {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}