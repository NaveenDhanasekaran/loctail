import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Carrot, Apple, Star, Crown, Leaf, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  categories: Array<{
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
  }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategorySidebar({ categories, selectedCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 sticky top-[64px] h-[calc(100vh-64px)]">
      <div className="p-4 space-y-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200",
                isSelected
                  ? "bg-purple-900/30 text-purple-400 border-l-4 border-purple-400"
                  : "text-white hover:bg-gray-700 hover:text-white"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                isSelected ? "bg-purple-900/50" : "bg-gray-700"
              )}>
                <IconComponent 
                  className={cn(
                    "w-5 h-5",
                    isSelected ? "text-purple-400" : category.color
                  )} 
                />
              </div>
              <span className="text-sm font-medium text-white">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}