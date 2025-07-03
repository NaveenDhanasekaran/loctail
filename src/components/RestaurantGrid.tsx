import { Card, CardContent } from '@/components/ui/card';
import { Restaurant } from '@/data/restaurants';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  onRestaurantClick?: (restaurantId: string) => void;
}

export default function RestaurantGrid({ restaurants, onRestaurantClick }: RestaurantGridProps) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {restaurants.map((restaurant) => (
          <Card 
            key={restaurant.id} 
            className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gray-800 hover:bg-gray-700 group card-dark cursor-pointer"
            onClick={() => onRestaurantClick && onRestaurantClick(restaurant.id)}
          >
            <CardContent className="p-0">
              <div className="relative w-full h-40 bg-gray-700 rounded-t-lg overflow-hidden">
                {restaurant.image ? (
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <h3 className="text-lg font-bold text-white line-clamp-2 min-h-[2.5rem]">{restaurant.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">{restaurant.cuisine}</span>
                  <span className="text-xs text-yellow-400">★ {restaurant.rating}</span>
                  <span className="text-xs text-gray-400">{restaurant.deliveryTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 