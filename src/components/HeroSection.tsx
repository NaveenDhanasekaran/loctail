import { ShoppingCart, UtensilsCrossed, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Grocery Delivery",
      description: "Fresh groceries delivered in 10 minutes",
      bgColor: "bg-gradient-to-r from-green-500 to-emerald-600",
      textColor: "text-white",
      route: "/grocery"
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8" />,
      title: "Food Ordering",
      description: "Local food & street food delivered hot",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
      textColor: "text-white",
      route: "/food"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Home Services",
      description: "Expert professionals at your doorstep",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
      textColor: "text-white",
      route: "/services"
    }
  ];

  const handleServiceClick = (service: typeof services[0]) => {
    console.log(`Clicked: ${service.title} - navigating to ${service.route}`);
    navigate(service.route);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need, delivered instantly
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From groceries to services, we bring your neighborhood to your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
              onClick={() => handleServiceClick(service)}
            >
              <CardContent className={`p-6 ${service.bgColor} ${service.textColor}`}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm opacity-90">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}