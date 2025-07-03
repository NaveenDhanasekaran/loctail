import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Package } from 'lucide-react';
import { Restaurant } from '@/data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewMenu: (restaurantId: string) => void;
}

export default function RestaurantCard({ restaurant, onViewMenu }: RestaurantCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        {/* Restaurant Image */}
        <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-3 overflow-hidden">
          {restaurant.image ? (
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                `;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          )}
        </div>
        
        {/* Restaurant Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              {restaurant.name}
            </h3>
            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
          </div>
          
          {/* Rating and Delivery Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{restaurant.deliveryTime}</span>
            </div>
          </div>
          
          {/* View Menu Button */}
          <Button 
            onClick={() => onViewMenu(restaurant.id)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            View Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}