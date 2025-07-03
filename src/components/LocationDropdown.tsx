import { useState } from 'react';
import { MapPin, ChevronDown, Plus, Home, Building, Heart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocation } from '@/context/LocationContext';

export default function LocationDropdown() {
  const { state, setCurrentLocation } = useLocation();

  const getLocationIcon = (name: string) => {
    if (name.toLowerCase().includes('home')) return <Home className="w-4 h-4" />;
    if (name.toLowerCase().includes('office') || name.toLowerCase().includes('work')) return <Building className="w-4 h-4" />;
    return <Heart className="w-4 h-4" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 text-left max-w-xs">
          <MapPin className="w-4 h-4 text-blue-600" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {state.currentLocation?.name || 'Select Location'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {state.currentLocation?.address || 'Choose delivery location'}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>Delivery Locations</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {state.savedLocations.map((location) => (
          <DropdownMenuItem
            key={location.id}
            onClick={() => setCurrentLocation(location)}
            className="flex items-start space-x-3 p-3 cursor-pointer"
          >
            <div className="text-gray-600 mt-0.5">
              {getLocationIcon(location.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{location.name}</span>
                {location.isDefault && (
                  <Badge variant="secondary" className="text-xs">Default</Badge>
                )}
                {state.currentLocation?.id === location.id && (
                  <Badge variant="default" className="text-xs bg-blue-600">Current</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{location.address}</p>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center space-x-2 p-3 cursor-pointer text-blue-600">
          <Plus className="w-4 h-4" />
          <span>Add New Location</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}