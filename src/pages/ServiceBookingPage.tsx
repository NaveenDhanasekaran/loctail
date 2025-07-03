import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, User } from 'lucide-react';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useLocation } from '@/context/LocationContext';
import { toast } from 'sonner';

export default function ServiceBookingPage() {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { state: locationState } = useLocation();
  
  const { professional, category } = routerLocation.state || {};
  
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '2',
    description: '',
    paymentMethod: 'cash'
  });

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookService = () => {
    // Validate form
    if (!bookingData.date || !bookingData.time) {
      toast.error('Please select date and time');
      return;
    }

    // Generate booking ID and navigate to confirmation
    const bookingId = 'SB' + Date.now().toString().slice(-6);
    const totalAmount = professional.pricePerHour * parseInt(bookingData.duration);
    
    navigate('/service-confirmation', { 
      state: { 
        bookingId,
        professional,
        category,
        bookingData: { ...bookingData, totalAmount },
        location: locationState.currentLocation
      }
    });
  };

  if (!professional || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Service not found</h2>
          <Button onClick={() => navigate('/services')}>Back to Services</Button>
        </div>
      </div>
    );
  }

  const totalAmount = professional.pricePerHour * parseInt(bookingData.duration);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="mb-4 p-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Book Service</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                    <p className="text-sm text-gray-600">{category.name} • {professional.experience}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {professional.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Service</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration">Estimated Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="8"
                    value={bookingData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Service Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{locationState.currentLocation?.name}</p>
                  <p className="text-sm text-gray-600">{locationState.currentLocation?.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="description">Describe your requirements (optional)</Label>
                  <Textarea
                    id="description"
                    value={bookingData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please describe the work you need done..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={bookingData.paymentMethod} 
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <span>💰</span>
                      <span>Cash on Completion</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Service</span>
                    <span>{category.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Professional</span>
                    <span>{professional.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rate per hour</span>
                    <span>₹{professional.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span>{bookingData.duration} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date & Time</span>
                    <span>
                      {bookingData.date && bookingData.time 
                        ? `${bookingData.date} at ${bookingData.time}`
                        : 'Not selected'
                      }
                    </span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{totalAmount}</span>
                </div>

                <div className="text-xs text-gray-500">
                  * Payment to be made after service completion
                </div>

                <Button 
                  onClick={handleBookService}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}