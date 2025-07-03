import { useState } from 'react';
import { ArrowLeft, MapPin, Home, Building, Heart, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MapSelector from '@/components/MapSelector';
import { useLocation } from '@/context/LocationContext';
import { toast } from 'sonner';

export default function AddAddressPage() {
  const navigate = useNavigate();
  const { addLocation } = useLocation();
  
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState({
    lat: 28.6139,
    lng: 77.2090,
    mapAddress: '',
    type: 'home',
    name: '',
    doorNo: '',
    landmark: '',
    receiverName: '',
    receiverPhone: ''
  });

  const [isLocating, setIsLocating] = useState(false);

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setAddressData(prev => ({
      ...prev,
      lat,
      lng,
      mapAddress: address
    }));
  };

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddressData(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
            mapAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)} - Current Location`
          }));
          setIsLocating(false);
          toast.success('Location detected successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default Delhi location
          setAddressData(prev => ({
            ...prev,
            lat: 28.6139,
            lng: 77.2090,
            mapAddress: '28.6139, 77.2090 - New Delhi, India (Default)'
          }));
          setIsLocating(false);
          toast.info('Using default location. You can adjust it manually.');
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setAddressData(prev => ({
        ...prev,
        lat: 28.6139,
        lng: 77.2090,
        mapAddress: '28.6139, 77.2090 - New Delhi, India (Default)'
      }));
      setIsLocating(false);
      toast.info('Geolocation not supported. Using default location.');
    }
  };

  const handleManualLocation = () => {
    const address = prompt('Enter your address manually:');
    if (address && address.trim()) {
      setAddressData(prev => ({
        ...prev,
        mapAddress: address.trim()
      }));
      toast.success('Address added manually!');
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!addressData.mapAddress) {
        toast.error('Please select a location');
        return;
      }
      setStep(2);
    }
  };

  const handleSaveAddress = () => {
    // Validate form
    if (!addressData.name || !addressData.doorNo || !addressData.receiverName || !addressData.receiverPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (addressData.receiverPhone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    // Create full address
    const fullAddress = `${addressData.doorNo}, ${addressData.landmark ? addressData.landmark + ', ' : ''}${addressData.mapAddress}`;

    // Add location
    addLocation({
      name: addressData.name,
      address: fullAddress,
      isDefault: false
    });

    toast.success('Address saved successfully!');
    navigate('/profile');
  };

  const addressTypes = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'work', name: 'Work', icon: Building },
    { id: 'other', name: 'Other', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => step === 1 ? navigate('/profile') : setStep(1)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="ml-4 text-xl font-bold text-white">
              {step === 1 ? 'Select Location' : 'Address Details'}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 ? (
          // Step 1: Location Selection
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <MapPin className="w-5 h-5" />
                <span>Choose Your Location</span>
              </CardTitle>
              <p className="text-sm text-gray-400">
                We'll use this to show you nearby stores and delivery options
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Options */}
              <div className="space-y-4">
                <Button
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  {isLocating ? 'Detecting Location...' : 'Use Current Location'}
                </Button>
                
                <div className="text-center text-gray-500">or</div>
                
                <Button
                  onClick={handleManualLocation}
                  variant="outline"
                  className="w-full py-3 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Enter Address Manually
                </Button>
              </div>

              {/* Interactive Map */}
              <MapSelector 
                onLocationSelect={handleLocationSelect}
                initialPosition={[addressData.lat, addressData.lng]}
              />
              
              {addressData.mapAddress && (
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <p className="text-sm font-medium text-purple-300">Selected Location:</p>
                  <p className="text-sm text-purple-200">{addressData.mapAddress}</p>
                </div>
              )}
              
              <Button 
                onClick={handleNextStep}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!addressData.mapAddress}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Step 2: Address Details
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Complete Address Details</CardTitle>
              <p className="text-sm text-gray-400">
                Provide additional details for accurate delivery
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address Type */}
              <div>
                <Label className="text-base font-medium text-gray-300">Address Type</Label>
                <RadioGroup 
                  value={addressData.type} 
                  onValueChange={(value) => setAddressData(prev => ({ ...prev, type: value }))}
                  className="grid grid-cols-3 gap-4 mt-2"
                >
                  {addressTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.id} className="flex items-center space-x-2 p-3 border border-gray-600 rounded-lg bg-gray-700">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="flex items-center space-x-2 cursor-pointer flex-1 text-gray-300">
                          <Icon className="w-4 h-4" />
                          <span>{type.name}</span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Address Name */}
              <div>
                <Label htmlFor="name" className="text-gray-300">Save Address As *</Label>
                <Input
                  id="name"
                  value={addressData.name}
                  onChange={(e) => setAddressData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={`My ${addressData.type === 'home' ? 'Home' : addressData.type === 'work' ? 'Office' : 'Address'}`}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Door Number */}
              <div>
                <Label htmlFor="doorNo" className="text-gray-300">House/Flat/Door No. *</Label>
                <Input
                  id="doorNo"
                  value={addressData.doorNo}
                  onChange={(e) => setAddressData(prev => ({ ...prev, doorNo: e.target.value }))}
                  placeholder="e.g., A-123, 2nd Floor"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Landmark */}
              <div>
                <Label htmlFor="landmark" className="text-gray-300">Landmark (Optional)</Label>
                <Input
                  id="landmark"
                  value={addressData.landmark}
                  onChange={(e) => setAddressData(prev => ({ ...prev, landmark: e.target.value }))}
                  placeholder="e.g., Near Metro Station"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Receiver Details */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-300">Receiver Details</h3>
                
                <div>
                  <Label htmlFor="receiverName" className="text-gray-300">Receiver Name *</Label>
                  <Input
                    id="receiverName"
                    value={addressData.receiverName}
                    onChange={(e) => setAddressData(prev => ({ ...prev, receiverName: e.target.value }))}
                    placeholder="Who will receive the order?"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="receiverPhone" className="text-gray-300">Receiver Phone *</Label>
                  <Input
                    id="receiverPhone"
                    type="tel"
                    value={addressData.receiverPhone}
                    onChange={(e) => setAddressData(prev => ({ ...prev, receiverPhone: e.target.value }))}
                    placeholder="10-digit phone number"
                    maxLength={10}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Selected Location Display */}
              <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                <p className="text-sm font-medium text-gray-300">Selected Location:</p>
                <p className="text-sm text-gray-400">{addressData.mapAddress}</p>
              </div>

              <Button 
                onClick={handleSaveAddress}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Save Address
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}