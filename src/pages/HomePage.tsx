import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CategoryNavigation from '@/components/CategoryNavigation';
import BottomNavigation from '@/components/BottomNavigation';

export default function HomePage() {
  const navigate = useNavigate();

  const mainCategories = [
    { 
      id: 'fruits-vegetables', 
      name: 'Fruits & Vegetables', 
      icon: '🥬',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=vegetables'
    },
    { 
      id: 'atta-rice', 
      name: 'Atta, Rice, Oil & Dals', 
      icon: '🌾',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=grains'
    },
    { 
      id: 'masala', 
      name: 'Masala & Dry Fruits', 
      icon: '🌶️',
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=spices'
    },
    { 
      id: 'cafe', 
      name: 'Loctail Cafe', 
      icon: '☕',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/food'
    },
    { 
      id: 'sweet', 
      name: 'Sweet Cravings', 
      icon: '🍬',
      image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=snacks'
    },
    { 
      id: 'toys', 
      name: 'Toys & Sports', 
      icon: '🧸',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=toys'
    },
    { 
      id: 'apparel', 
      name: 'Apparel & Lifestyle', 
      icon: '👕',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=fashion'
    },
    { 
      id: 'jewellery', 
      name: 'Jewellery & Accessories', 
      icon: '💍',
      image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=accessories'
    },
    { 
      id: 'frozen', 
      name: 'Frozen Food', 
      icon: '🧊',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=frozen'
    },
    { 
      id: 'ice-cream', 
      name: 'Ice Creams & More', 
      icon: '🍦',
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=desserts'
    },
    { 
      id: 'packaged', 
      name: 'Packaged Food', 
      icon: '📦',
      image: 'https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/grocery?category=packaged'
    }
  ];

  const handleCategoryClick = (category: typeof mainCategories[0]) => {
    navigate(category.route);
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <CategoryNavigation />
      
      <main className="pb-20 overflow-x-hidden">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white p-8 mx-4 mt-4 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 text-white">Paan Corner</h1>
            <p className="text-lg mb-6 max-w-md text-gray-100">
              Get smoking accessories, fresheners & more in 10 mins this monsoon with Loctail!
            </p>
            <Button 
              onClick={() => navigate('/grocery')}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-3"
            >
              Order Now
            </Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <img 
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Paan items"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mainCategories.map((category) => (
              <Card 
                key={category.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gray-800 hover:bg-gray-700 group card-dark"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-0">
                  <div className="relative w-full h-24 bg-gray-700 rounded-t-lg overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-3xl bg-gray-700">
                            ${category.icon}
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-medium text-white line-clamp-2">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}