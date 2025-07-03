import { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';
import ServiceProfessionalCard from '@/components/ServiceProfessionalCard';
import { serviceCategories, serviceProfessionals, ServiceProfessional } from '@/data/services';
import { useLocation } from '@/context/LocationContext';
import { toast } from 'sonner';

export default function ServicesPage() {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleBookService = (professional: ServiceProfessional) => {
    // Navigate to booking page with professional data
    navigate('/service-booking', { 
      state: { 
        professional,
        category: serviceCategories.find(cat => cat.id === professional.category)
      }
    });
  };

  const selectedCategoryData = selectedCategory 
    ? serviceCategories.find(cat => cat.id === selectedCategory)
    : null;

  const filteredProfessionals = selectedCategory 
    ? serviceProfessionals.filter(prof => prof.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          // Categories View
          <>
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Services available in {locationState.currentLocation?.name}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Services</h1>
              <p className="text-gray-600">Professional services at your doorstep</p>
            </div>

            {/* Service Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((category) => (
                <ServiceCategoryCard 
                  key={category.id} 
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>
          </>
        ) : (
          // Professionals View
          <>
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={handleBackToCategories}
                className="mb-4 p-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Categories
              </Button>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategoryData?.name} Professionals
              </h1>
              <p className="text-gray-600">{selectedCategoryData?.description}</p>
            </div>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProfessionals.map((professional) => (
                <ServiceProfessionalCard 
                  key={professional.id} 
                  professional={professional}
                  onBook={handleBookService}
                />
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No professionals available in this category.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}