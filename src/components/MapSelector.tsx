import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';

let DefaultIcon = L.divIcon({
  html: `<div class="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
    <div class="w-2 h-2 bg-white rounded-full"></div>
  </div>`,
  className: 'custom-div-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialPosition?: [number, number];
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position} />
  );
}

export default function MapSelector({ onLocationSelect, initialPosition = [28.6139, 77.2090] }: MapSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationSelect = async (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    
    // Simulate reverse geocoding (in real app, use Google Maps API or similar)
    const mockAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)} - New Delhi, India`;
    onLocationSelect(lat, lng, mockAddress);
  };

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-600 bg-gray-800">
      <MapContainer
        center={initialPosition}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="dark-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker onLocationSelect={handleLocationSelect} />
      </MapContainer>
    </div>
  );
}