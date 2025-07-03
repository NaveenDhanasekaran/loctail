import { useState } from 'react';
import { ArrowLeft, User, MapPin, Phone, Mail, Edit, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { toast } from 'sonner';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state: authState, updateProfile, logout } = useAuth();
  const { state: locationState, removeLocation, setDefaultLocation } = useLocation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: authState.user?.name || '',
    phone: authState.user?.phone || '',
    email: authState.user?.email || ''
  });

  if (!authState.isAuthenticated || !authState.user) {
    navigate('/auth');
    return null;
  }

  const handleSaveProfile = () => {
    if (!editData.name || !editData.phone || !editData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editData.phone.length !== 13) { // +91 format
      toast.error('Please enter a valid phone number');
      return;
    }

    updateProfile({
      name: editData.name,
      phone: editData.phone,
      email: editData.email
    });

    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleDeleteLocation = (locationId: string) => {
    if (locationState.savedLocations.length <= 1) {
      toast.error('You must have at least one saved location');
      return;
    }
    removeLocation(locationId);
    toast.success('Location removed');
  };

  const handleSetDefault = (locationId: string) => {
    setDefaultLocation(locationId);
    toast.success('Default location updated');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-white">My Profile</h1>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      handleSaveProfile();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {authState.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-white">{authState.user.name}</h2>
                  <p className="text-gray-300">Member since {authState.user.joinedDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editData.name : authState.user.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-black-50 text-white' : 'text-white'}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editData.email : authState.user.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-black-50 text-white' : 'text-white'}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={isEditing ? editData.phone : authState.user.phone}
                    onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-black-50 text-white' : 'text-white'}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Addresses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Saved Addresses</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/add-address')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationState.savedLocations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-white">{location.name}</h3>
                        {location.isDefault && (
                          <Badge variant="default" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!location.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetDefault(location.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLocation(location.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">No orders yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/')}
                >
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}