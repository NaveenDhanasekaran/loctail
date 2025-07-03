import { CheckCircle, Home, Calendar, MapPin, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ServiceConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { bookingId, professional, category, bookingData, location: serviceLocation } = location.state || {};

  if (!bookingId || !professional || !bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Booked Successfully!</h1>
          <p className="text-gray-600">Your service professional will arrive at the scheduled time.</p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Booking Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Booking ID:</span>
              <Badge variant="outline" className="font-mono">{bookingId}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Service:</span>
              <span>{category.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Date & Time:</span>
              <span>{bookingData.date} at {bookingData.time}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Duration:</span>
              <span>{bookingData.duration} hours</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="text-lg font-bold text-green-600">₹{bookingData.totalAmount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Payment:</span>
              <span className="capitalize">Cash on Completion</span>
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Service Professional</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{professional.name}</h3>
                <p className="text-sm text-gray-600">{professional.experience} experience</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm">⭐ {professional.rating}</span>
                  <span className="text-sm text-gray-500">• ₹{professional.pricePerHour}/hour</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {professional.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Location */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Service Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{serviceLocation?.name}</p>
              <p className="text-sm text-gray-600">{serviceLocation?.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Important Notes</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Professional will call you 15 minutes before arrival</p>
                <p>• Payment to be made after service completion</p>
                <p>• You can reschedule up to 2 hours before the appointment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate('/orders')}
            variant="outline"
            className="flex-1"
          >
            View All Bookings
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
}