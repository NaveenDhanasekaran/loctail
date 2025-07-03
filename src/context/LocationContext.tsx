import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Location {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

interface LocationState {
  currentLocation: Location | null;
  savedLocations: Location[];
}

interface LocationContextType {
  state: LocationState;
  setCurrentLocation: (location: Location) => void;
  addLocation: (location: Omit<Location, 'id'>) => void;
  removeLocation: (locationId: string) => void;
  setDefaultLocation: (locationId: string) => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

const defaultLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'Home',
    address: 'No 6 Gengu road Egmore Chennai 600008',
    isDefault: true
  },
  {
    id: 'loc-2',
    name: 'Office',
    address: 'No 138 Dr santhosh Nagar Egmore Chennai 600008',
    isDefault: false
  },
  {
    id: 'loc-3',
    name: 'Mom\'s Place',
    address: 'Lajpat Nagar, New Delhi, Delhi 110024',
    isDefault: false
  }
];

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LocationState>({
    currentLocation: defaultLocations[0],
    savedLocations: defaultLocations
  });

  const setCurrentLocation = (location: Location) => {
    setState(prev => ({ ...prev, currentLocation: location }));
  };

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation: Location = {
      ...location,
      id: `loc-${Date.now()}`,
    };
    setState(prev => ({
      ...prev,
      savedLocations: [...prev.savedLocations, newLocation]
    }));
  };

  const removeLocation = (locationId: string) => {
    setState(prev => ({
      ...prev,
      savedLocations: prev.savedLocations.filter(loc => loc.id !== locationId),
      currentLocation: prev.currentLocation?.id === locationId 
        ? prev.savedLocations.find(loc => loc.isDefault) || prev.savedLocations[0] 
        : prev.currentLocation
    }));
  };

  const setDefaultLocation = (locationId: string) => {
    setState(prev => ({
      ...prev,
      savedLocations: prev.savedLocations.map(loc => ({
        ...loc,
        isDefault: loc.id === locationId
      }))
    }));
  };

  return (
    <LocationContext.Provider value={{
      state,
      setCurrentLocation,
      addLocation,
      removeLocation,
      setDefaultLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};