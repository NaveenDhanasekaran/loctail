import { Product } from '@/context/CartContext';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image?: string;
  address: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const restaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Spice Garden',
    cuisine: 'South Indian',
    rating: 4.5,
    deliveryTime: '25-30 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 45, Anna Salai, Chennai - 600002',
    distance: '0.8 km',
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'rest-2',
    name: 'Street Food Corner',
    cuisine: 'Street Food',
    rating: 4.2,
    deliveryTime: '15-20 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 12, T Nagar Main Road, Chennai - 600017',
    distance: '1.2 km',
    coordinates: { lat: 13.0418, lng: 80.2341 }
  },
  {
    id: 'rest-3',
    name: 'North Indian Delights',
    cuisine: 'North Indian',
    rating: 4.7,
    deliveryTime: '30-35 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 78, Velachery Main Road, Chennai - 600042',
    distance: '2.1 km',
    coordinates: { lat: 12.9756, lng: 80.2207 }
  },
  {
    id: 'rest-4',
    name: 'Biryani House',
    cuisine: 'Biryani',
    rating: 4.6,
    deliveryTime: '20-25 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 23, Adyar Main Road, Chennai - 600020',
    distance: '1.5 km',
    coordinates: { lat: 13.0067, lng: 80.2206 }
  },
  {
    id: 'rest-5',
    name: 'Punjabi Dhaba',
    cuisine: 'Punjabi',
    rating: 4.3,
    deliveryTime: '25-30 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 56, OMR Road, Chennai - 600096',
    distance: '3.2 km',
    coordinates: { lat: 12.9698, lng: 80.2452 }
  },
  {
    id: 'rest-6',
    name: 'Pizza Palace',
    cuisine: 'Pizza',
    rating: 4.4,
    deliveryTime: '20-25 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 89, Express Avenue Mall, Chennai - 600002',
    distance: '1.8 km',
    coordinates: { lat: 13.0569, lng: 80.2091 }
  },
  {
    id: 'rest-7',
    name: 'Burger Junction',
    cuisine: 'Burger',
    rating: 4.1,
    deliveryTime: '15-20 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 34, Phoenix MarketCity, Chennai - 600015',
    distance: '2.5 km',
    coordinates: { lat: 13.0836, lng: 80.2095 }
  },
  {
    id: 'rest-8',
    name: 'Fresh Juice Bar',
    cuisine: 'Juices',
    rating: 4.0,
    deliveryTime: '10-15 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 67, Besant Nagar Beach Road, Chennai - 600090',
    distance: '4.1 km',
    coordinates: { lat: 13.0001, lng: 80.2668 }
  },
  {
    id: 'rest-9',
    name: 'Ice Cream Factory',
    cuisine: 'Ice Cream',
    rating: 4.5,
    deliveryTime: '15-20 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 91, Marina Beach Road, Chennai - 600013',
    distance: '3.7 km',
    coordinates: { lat: 13.0524, lng: 80.2824 }
  },
  {
    id: 'rest-10',
    name: 'Loctail Cafe',
    cuisine: 'Multi Cuisine',
    rating: 4.8,
    deliveryTime: '20-25 mins',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    address: 'No 15, Egmore High Road, Chennai - 600008',
    distance: '0.5 km',
    coordinates: { lat: 13.0732, lng: 80.2609 }
  }
];

export const restaurantMenus: Record<string, Product[]> = {
  'rest-1': [
    { id: 'menu-1-1', name: 'Masala Dosa', price: 80, category: 'main-course', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-1-2', name: 'Idli Sambar', price: 60, category: 'main-course', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-1-3', name: 'Vada', price: 40, category: 'starter', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-1-4', name: 'Filter Coffee', price: 30, category: 'beverage', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-1-5', name: 'Coconut Chutney', price: 20, category: 'sides', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-1-6', name: 'Rasam', price: 50, category: 'soup', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  'rest-2': [
    { id: 'menu-2-1', name: 'Pani Puri', price: 50, category: 'street-food', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-2-2', name: 'Bhel Puri', price: 60, category: 'street-food', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-2-3', name: 'Vada Pav', price: 40, category: 'street-food', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-2-4', name: 'Samosa', price: 30, category: 'street-food', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-2-5', name: 'Masala Chai', price: 25, category: 'beverage', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-2-6', name: 'Kulfi', price: 45, category: 'dessert', image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  'rest-3': [
    { id: 'menu-3-1', name: 'Butter Chicken', price: 280, category: 'main-course', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-3-2', name: 'Dal Makhani', price: 180, category: 'main-course', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-3-3', name: 'Naan', price: 60, category: 'bread', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-3-4', name: 'Basmati Rice', price: 120, category: 'rice', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-3-5', name: 'Paneer Tikka', price: 220, category: 'starter', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-3-6', name: 'Gulab Jamun', price: 80, category: 'dessert', image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  'rest-4': [
    { id: 'menu-4-1', name: 'Chicken Biryani', price: 320, category: 'biryani', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-4-2', name: 'Mutton Biryani', price: 380, category: 'biryani', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-4-3', name: 'Veg Biryani', price: 250, category: 'biryani', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-4-4', name: 'Raita', price: 60, category: 'sides', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-4-5', name: 'Shorba', price: 80, category: 'soup', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-4-6', name: 'Kheer', price: 90, category: 'dessert', image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  'rest-5': [
    { id: 'menu-5-1', name: 'Sarson Ka Saag', price: 200, category: 'main-course', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-5-2', name: 'Makki Ki Roti', price: 80, category: 'bread', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-5-3', name: 'Chole Bhature', price: 150, category: 'main-course', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-5-4', name: 'Lassi', price: 70, category: 'beverage', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-5-5', name: 'Amritsari Kulcha', price: 120, category: 'bread', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'menu-5-6', name: 'Jalebi', price: 60, category: 'dessert', image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ]
};