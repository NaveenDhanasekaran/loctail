import { useState } from 'react';
import { ArrowLeft, ShoppingCart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RestaurantCard from '@/components/RestaurantCard';
import ProductCard from '@/components/ProductCard';
import { restaurants, restaurantMenus } from '@/data/restaurants';
import { useCart } from '@/context/CartContext';

export default function FoodPage() {
  const navigate = useNavigate();
  const { state } = useCart();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  const handleViewMenu = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
  };

  const selectedRestaurantData = selectedRestaurant 
    ? restaurants.find(r => r.id === selectedRestaurant)
    : null;

  const menuItems = selectedRestaurant ? restaurantMenus[selectedRestaurant] || [] : [];

  return (
    <div className="layout-wrapper bg-gray-50">
      {/* Header */}
      <header className="header-container sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={selectedRestaurant ? handleBackToRestaurants : () => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                {selectedRestaurant ? selectedRestaurantData?.name : 'Food Delivery'}
              </h1>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {state.items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="main-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRestaurant ? (
          // Restaurant List View
          <>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Delivering to your location</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurants Near You</h2>
              <p className="text-gray-600">Discover delicious food from local restaurants</p>
            </div>

            {/* Restaurants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant}
                  onViewMenu={handleViewMenu}
                />
              ))}
            </div>
          </>
        ) : (
          // Restaurant Menu View
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedRestaurantData?.name} Menu
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>{selectedRestaurantData?.cuisine}</span>
                <span>•</span>
                <span>{selectedRestaurantData?.deliveryTime}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <span>⭐ {selectedRestaurantData?.rating}</span>
                </div>
              </div>
              
              {/* Restaurant Address */}
              <div className="flex items-start space-x-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">{selectedRestaurantData?.address}</p>
                  <p className="text-xs text-green-600">{selectedRestaurantData?.distance} away</p>
                </div>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {menuItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>

            {menuItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Menu not available for this restaurant.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}