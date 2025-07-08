import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CategoryNavigation from '@/components/CategoryNavigation';
import CategorySidebar from '@/components/CategorySidebar';
import ProductGrid from '@/components/ProductGrid';
import RestaurantGrid from '@/components/RestaurantGrid';
import { groceryProducts } from '@/data/products';
import { restaurants, restaurantMenus } from '@/data/restaurants';
import { ShoppingCart, Carrot, Apple, Star, Crown, Leaf, Sprout, Coffee, Users, IceCream, CupSoda, Sandwich, Cake, Utensils, Soup, Dessert, Pizza, Drumstick, Salad, GlassWater, User, ShoppingBag, Home, Bed, Monitor, Smartphone, Headphones, Watch, Plug, Droplet, Scissors, Brush, Sparkles, Gift, Speaker, Tablet, PhoneCall } from 'lucide-react';
import type { Product } from '@/context/CartContext';

// Define sidebar categories for each context
const productSidebarCategories = [
  { id: 'all', name: 'All', icon: ShoppingCart as React.ComponentType, color: 'text-orange-400' },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: Carrot as React.ComponentType, color: 'text-green-400' },
  { id: 'fruits', name: 'Fresh Fruits', icon: Apple as React.ComponentType, color: 'text-red-400' },
  { id: 'seasonal', name: 'Seasonal Picks', icon: Star as React.ComponentType, color: 'text-yellow-400' },
  { id: 'exotics', name: 'Exotics & Premium', icon: Crown as React.ComponentType, color: 'text-purple-400' },
  { id: 'herbs', name: 'Leafy, Herbs & Seasonings', icon: Leaf as React.ComponentType, color: 'text-green-300' },
  { id: 'organics', name: 'Organics & Hydroponics', icon: Sprout as React.ComponentType, color: 'text-emerald-400' }
];

const cuisineCategories = [
  { id: 'all', name: 'All', icon: Utensils as React.ComponentType, color: 'text-orange-400' },
  { id: 'southindian', name: 'South Indian', icon: Soup as React.ComponentType, color: 'text-cyan-400' },
  { id: 'streetfood', name: 'Street Food', icon: Sandwich as React.ComponentType, color: 'text-red-400' },
  { id: 'northindian', name: 'North Indian', icon: Drumstick as React.ComponentType, color: 'text-yellow-400' },
  { id: 'biryani', name: 'Biryani', icon: Pizza as React.ComponentType, color: 'text-amber-400' },
  { id: 'punjabi', name: 'Punjabi', icon: Salad as React.ComponentType, color: 'text-green-400' },
  { id: 'pizza', name: 'Pizza', icon: Pizza as React.ComponentType, color: 'text-red-500' },
  { id: 'burger', name: 'Burger', icon: Sandwich as React.ComponentType, color: 'text-yellow-500' },
  { id: 'juices', name: 'Juices', icon: CupSoda as React.ComponentType, color: 'text-blue-400' },
  { id: 'icecream', name: 'Ice Cream', icon: IceCream as React.ComponentType, color: 'text-cyan-400' }
];

// Subcategory definitions for each main category
const subcategoriesMap: Record<string, { id: string; name: string; icon: React.ComponentType; color: string }[]> = {
  toys: [
    { id: 'all', name: 'All', icon: Gift as React.ComponentType, color: 'text-orange-400' },
    { id: 'kids', name: 'Kids', icon: User as React.ComponentType, color: 'text-blue-400' },
    { id: 'adult', name: 'Adult', icon: Users as React.ComponentType, color: 'text-purple-400' }
  ],
  fashion: [
    { id: 'all', name: 'All', icon: ShoppingBag as React.ComponentType, color: 'text-orange-400' },
    { id: 'men', name: 'Men', icon: User as React.ComponentType, color: 'text-blue-400' },
    { id: 'women', name: 'Women', icon: Users as React.ComponentType, color: 'text-pink-400' },
    { id: 'unisex', name: 'Unisex', icon: User as React.ComponentType, color: 'text-green-400' },
    { id: 'kids', name: 'Kids', icon: User as React.ComponentType, color: 'text-yellow-400' }
  ],
  home: [
    { id: 'all', name: 'All', icon: Home as React.ComponentType, color: 'text-orange-400' },
    { id: 'kitchen', name: 'Kitchen', icon: Droplet as React.ComponentType, color: 'text-blue-400' },
    { id: 'decor', name: 'Decor', icon: Sparkles as React.ComponentType, color: 'text-pink-400' },
    { id: 'furniture', name: 'Furniture', icon: Bed as React.ComponentType, color: 'text-green-400' },
    { id: 'appliances', name: 'Appliances', icon: Home as React.ComponentType, color: 'text-cyan-400' }
  ],
  electronics: [
    { id: 'all', name: 'All', icon: Monitor as React.ComponentType, color: 'text-orange-400' },
    { id: 'mobiles', name: 'Mobiles', icon: Smartphone as React.ComponentType, color: 'text-blue-400' },
    { id: 'laptops', name: 'Laptops', icon: Monitor as React.ComponentType, color: 'text-green-400' },
    { id: 'audio', name: 'Audio', icon: Headphones as React.ComponentType, color: 'text-purple-400' },
    { id: 'wearables', name: 'Wearables', icon: Watch as React.ComponentType, color: 'text-pink-400' },
    { id: 'accessories', name: 'Accessories', icon: Plug as React.ComponentType, color: 'text-yellow-400' }
  ],
  beauty: [
    { id: 'all', name: 'All', icon: Sparkles as React.ComponentType, color: 'text-orange-400' },
    { id: 'skincare', name: 'Skincare', icon: Droplet as React.ComponentType, color: 'text-blue-400' },
    { id: 'haircare', name: 'Haircare', icon: Scissors as React.ComponentType, color: 'text-green-400' },
    { id: 'makeup', name: 'Makeup', icon: Brush as React.ComponentType, color: 'text-pink-400' },
    { id: 'fragrance', name: 'Fragrance', icon: Sparkles as React.ComponentType, color: 'text-yellow-400' },
    { id: 'unisex', name: 'Unisex', icon: User as React.ComponentType, color: 'text-purple-400' }
  ],
  mobiles: [
    { id: 'all', name: 'All', icon: Smartphone as React.ComponentType, color: 'text-orange-400' },
    { id: 'smartphones', name: 'Smartphones', icon: Smartphone as React.ComponentType, color: 'text-blue-400' },
    { id: 'featurephones', name: 'Feature Phones', icon: PhoneCall as React.ComponentType, color: 'text-green-400' },
    { id: 'accessories', name: 'Accessories', icon: Plug as React.ComponentType, color: 'text-yellow-400' }
  ]
};

function getMenuCategories(menu: Product[]) {
  // Extract unique categories from menu items
  const iconMap: { [key: string]: React.ComponentType } = {
    'main-course': Utensils as React.ComponentType,
    'starter': Salad as React.ComponentType,
    'dessert': Dessert as React.ComponentType,
    'bread': Pizza as React.ComponentType,
    'rice': Utensils as React.ComponentType,
    'sides': Drumstick as React.ComponentType,
    'soup': Soup as React.ComponentType,
    'beverage': CupSoda as React.ComponentType,
    'biryani': Utensils as React.ComponentType,
    'street-food': Sandwich as React.ComponentType
  };
  const colorMap: { [key: string]: string } = {
    'main-course': 'text-blue-400',
    'starter': 'text-green-400',
    'dessert': 'text-pink-400',
    'bread': 'text-yellow-400',
    'rice': 'text-amber-400',
    'sides': 'text-purple-400',
    'soup': 'text-cyan-400',
    'beverage': 'text-indigo-400',
    'biryani': 'text-orange-400',
    'street-food': 'text-red-400'
  };
  const seen = new Set();
  return menu
    .map((item: Product) => item.category)
    .filter((cat: string) => {
      if (seen.has(cat)) return false;
      seen.add(cat);
      return true;
    })
    .map((cat: string) => ({
      id: cat,
      name: cat.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
      icon: iconMap[cat] || (Utensils as React.ComponentType),
      color: colorMap[cat] || 'text-gray-400'
    }));
}

// Helper to get unique categories from products
type CategoryInfo = { id: string; name: string };
const allProductCategories: CategoryInfo[] = [
  { id: 'fruits', name: 'Fruits' },
  { id: 'vegetables', name: 'Fresh Vegetables' },
  { id: 'seasonal', name: 'Seasonal Picks' },
  { id: 'exotics', name: 'Exotics & Premium' },
  { id: 'herbs', name: 'Leafy, Herbs & Seasonings' },
  { id: 'organics', name: 'Organics & Hydroponics' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'toys', name: 'Toys' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'mobiles', name: 'Mobiles' },
  { id: 'beauty', name: 'Beauty' }
];

export default function GroceryPage() {
  const location = useLocation();
  const urlCategory = new URLSearchParams(location.search).get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedRestaurantType, setSelectedRestaurantType] = useState('all');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  let sidebarCategories = productSidebarCategories;
  let sidebarSelected = selectedCategory;
  let sidebarOnChange = setSelectedCategory;
  let filteredRestaurants = restaurants;
  let filteredMenu: Product[] = [];

  if (selectedCategory === 'cafe') {
    if (!selectedRestaurant) {
      sidebarCategories = cuisineCategories;
      sidebarSelected = selectedRestaurantType;
      sidebarOnChange = setSelectedRestaurantType;
      filteredRestaurants = selectedRestaurantType === 'all'
        ? restaurants
        : restaurants.filter(r => r.cuisine.toLowerCase().replace(/ /g, '') === selectedRestaurantType);
    } else {
      const menu = restaurantMenus[selectedRestaurant] || [];
      const menuCategories = getMenuCategories(menu);
      sidebarCategories = [
        { id: 'all', name: 'All', icon: Utensils as React.ComponentType, color: 'text-orange-400' },
        ...menuCategories
      ];
      sidebarSelected = selectedMenuCategory;
      sidebarOnChange = setSelectedMenuCategory;
      filteredMenu = selectedMenuCategory === 'all'
        ? menu
        : menu.filter(item => item.category === selectedMenuCategory);
    }
  }

  // Subcategory sidebar logic for main categories
  if (["toys", "fashion", "home", "electronics", "beauty", "mobiles"].includes(selectedCategory)) {
    sidebarCategories = subcategoriesMap[selectedCategory].map(sub => ({
      id: sub.id,
      name: sub.name,
      icon: sub.icon,
      color: sub.color
    }));
    sidebarSelected = selectedSubcategory;
    sidebarOnChange = setSelectedSubcategory;
  }

  return (
    <div className="layout-wrapper bg-gray-900">
      <CategoryNavigation />
      
      <div className="flex">
        <div className="sidebar-fixed">
          <CategorySidebar 
            categories={sidebarCategories}
            selectedCategory={sidebarSelected}
            onCategoryChange={sidebarOnChange}
          />
        </div>
        
        <div className="content-area">
          {selectedCategory === 'all' ? (
            <div>
              {allProductCategories.map(cat => {
                const products = groceryProducts.filter(p => p.category === cat.id);
                if (!products.length) return null;
                return (
                  <div key={cat.id} className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 px-4 pt-4">{cat.name}</h2>
                    <ProductGrid products={products} category={cat.id} />
                  </div>
                );
              })}
            </div>
          ) : selectedCategory === 'cafe' ? (
            selectedRestaurant ? (
              <div>
                <button
                  className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 ml-4 mt-4"
                  onClick={() => setSelectedRestaurant(null)}
                >
                  ← Back to Restaurants
                </button>
                <ProductGrid
                  products={filteredMenu}
                  category={undefined}
                />
              </div>
            ) : (
              <RestaurantGrid
                restaurants={filteredRestaurants}
                onRestaurantClick={setSelectedRestaurant}
              />
            )
          ) : (
            <ProductGrid
              products={groceryProducts.filter(product => {
                if (["toys", "fashion", "home", "electronics", "beauty", "mobiles"].includes(selectedCategory)) {
                  if (selectedSubcategory === 'all') {
                    return product.category === selectedCategory;
                  }
                  return product.category === selectedCategory && product.subcategory === selectedSubcategory;
                }
                return product.category === selectedCategory;
              })}
              category={selectedCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
}