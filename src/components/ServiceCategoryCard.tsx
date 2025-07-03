import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ServiceCategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
  onClick: (categoryId: string) => void;
}

export default function ServiceCategoryCard({ category, onClick }: ServiceCategoryCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"
      onClick={() => onClick(category.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{category.icon}</div>
            <div>
              <h3 className="font-semibold text-white text-lg">{category.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}