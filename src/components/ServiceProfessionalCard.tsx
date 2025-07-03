import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, User, Clock } from 'lucide-react';
import { ServiceProfessional } from '@/data/services';

interface ServiceProfessionalCardProps {
  professional: ServiceProfessional;
  onBook: (professional: ServiceProfessional) => void;
}

export default function ServiceProfessionalCard({ professional, onBook }: ServiceProfessionalCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Professional Image Placeholder */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4 flex items-center justify-center">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        
        {/* Professional Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{professional.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{professional.experience} experience</span>
            </div>
          </div>
          
          {/* Rating and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{professional.rating}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">₹{professional.pricePerHour}</div>
              <div className="text-xs text-gray-500">per hour</div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Skills:</div>
            <div className="flex flex-wrap gap-1">
              {professional.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Book Button */}
          <Button 
            onClick={() => onBook(professional)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}