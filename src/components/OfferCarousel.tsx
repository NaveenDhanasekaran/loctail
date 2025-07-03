import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Percent, Clock, Star } from 'lucide-react';

export default function OfferCarousel() {
  const offers = [
    {
      title: "50% OFF on First Order",
      description: "Get incredible savings on your first grocery order",
      badge: "NEW USER",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
      action: "grocery"
    },
    {
      title: "Free Delivery on ₹299+",
      description: "No delivery charges on orders above ₹299",
      badge: "LIMITED TIME",
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      action: "grocery"
    },
    {
      title: "Lightning Fast Service",
      description: "Home services available in 2 hours",
      badge: "SAME DAY",
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      action: "services"
    },
    {
      title: "Street Food Special",
      description: "Authentic local flavors delivered hot",
      badge: "POPULAR",
      color: "bg-gradient-to-r from-orange-500 to-amber-600",
      action: "food"
    },
    {
      title: "Weekend Super Saver",
      description: "Extra 30% off on weekend orders",
      badge: "WEEKEND",
      color: "bg-gradient-to-r from-green-500 to-teal-600",
      action: "grocery"
    }
  ];

  const handleOfferClick = (offer: typeof offers[0]) => {
    console.log(`Offer clicked: ${offer.title} - action: ${offer.action}`);
    // You can add navigation logic here later
    // navigate(`/${offer.action}`);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
          <Badge variant="outline" className="text-sm">
            <Percent className="w-3 h-3 mr-1" />
            Limited Time
          </Badge>
        </div>

        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {offers.map((offer, index) => (
              <Card 
                key={index} 
                className="flex-shrink-0 w-80 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
                onClick={() => handleOfferClick(offer)}
              >
                <CardContent className={`p-6 ${offer.color} text-white relative overflow-hidden`}>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {offer.badge}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-300 fill-current" />
                      <span className="text-sm font-medium">Special Offer</span>
                    </div>
                    <h3 className="text-xl font-bold">{offer.title}</h3>
                    <p className="text-sm opacity-90">{offer.description}</p>
                    <div className="flex items-center space-x-2 pt-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Valid till stocks last</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}