import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Apple, 
  Carrot, 
  Cookie, 
  Milk, 
  Pizza, 
  Zap, 
  Droplets, 
  Car, 
  Snowflake,
  Hammer,
  Paintbrush,
  Wifi
} from 'lucide-react';

export default function CategoriesGrid() {
  const navigate = useNavigate();

  const categories = [
    { name: "Fruits", icon: <Apple className="w-6 h-6" />, color: "text-red-500", route: "/grocery" },
    { name: "Vegetables", icon: <Carrot className="w-6 h-6" />, color: "text-orange-500", route: "/grocery" },
    { name: "Snacks", icon: <Cookie className="w-6 h-6" />, color: "text-yellow-500", route: "/grocery" },
    { name: "Dairy", icon: <Milk className="w-6 h-6" />, color: "text-blue-500", route: "/grocery" },
    { name: "Street Food", icon: <Pizza className="w-6 h-6" />, color: "text-red-600", route: "/food" },
    { name: "Electrician", icon: <Zap className="w-6 h-6" />, color: "text-yellow-600", route: "/services" },
    { name: "Plumber", icon: <Droplets className="w-6 h-6" />, color: "text-blue-600", route: "/services" },
    { name: "Mechanic", icon: <Car className="w-6 h-6" />, color: "text-gray-600", route: "/services" },
    { name: "AC Repair", icon: <Snowflake className="w-6 h-6" />, color: "text-cyan-500", route: "/services" },
    { name: "Carpenter", icon: <Hammer className="w-6 h-6" />, color: "text-amber-600", route: "/services" },
    { name: "Painter", icon: <Paintbrush className="w-6 h-6" />, color: "text-purple-500", route: "/services" },
    { name: "WiFi/Internet", icon: <Wifi className="w-6 h-6" />, color: "text-green-500", route: "/services" }
  ];

  const handleCategoryClick = (category: typeof categories[0]) => {
    console.log(`Category clicked: ${category.name} - navigating to ${category.route}`);
    navigate(category.route);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Categories</h2>
          <p className="text-gray-600">Find exactly what you need</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className={`p-3 rounded-full bg-gray-100 ${category.color} transition-colors duration-200 hover:bg-gray-200`}>
                    {category.icon}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}