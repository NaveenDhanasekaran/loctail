import { Product } from '@/context/CartContext';

export interface ServiceProfessional {
  id: string;
  name: string;
  category: string;
  experience: string;
  rating: number;
  pricePerHour: number;
  skills: string[];
  image?: string;
}

export const serviceCategories = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Pipe repairs, leaks, installations',
    icon: '🔧'
  },
  {
    id: 'electrical',
    name: 'Electrician',
    description: 'Wiring, repairs, installations',
    icon: '⚡'
  },
  {
    id: 'ac-repair',
    name: 'AC Repair',
    description: 'AC servicing, repairs, installation',
    icon: '❄️'
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    description: 'Home cleaning, deep cleaning',
    icon: '🧹'
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    description: 'Furniture repair, custom work',
    icon: '🔨'
  },
  {
    id: 'painting',
    name: 'Painting',
    description: 'Wall painting, touch-ups',
    icon: '🎨'
  },
  {
    id: 'appliance',
    name: 'Appliance Repair',
    description: 'Washing machine, refrigerator repair',
    icon: '🔧'
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    description: 'Termite, cockroach treatment',
    icon: '🐛'
  }
];

export const serviceProfessionals: ServiceProfessional[] = [
  // Plumbing
  {
    id: 'plumber-1',
    name: 'Rajesh Kumar',
    category: 'plumbing',
    experience: '8 years',
    rating: 4.5,
    pricePerHour: 300,
    skills: ['Pipe Repair', 'Leak Fixing', 'Bathroom Fitting']
  },
  {
    id: 'plumber-2',
    name: 'Amit Singh',
    category: 'plumbing',
    experience: '5 years',
    rating: 4.2,
    pricePerHour: 250,
    skills: ['Drain Cleaning', 'Water Heater', 'Pipe Installation']
  },
  {
    id: 'plumber-3',
    name: 'Suresh Sharma',
    category: 'plumbing',
    experience: '12 years',
    rating: 4.7,
    pricePerHour: 400,
    skills: ['Commercial Plumbing', 'Emergency Repairs', 'Bathroom Renovation']
  },

  // Electrical
  {
    id: 'electrician-1',
    name: 'Vikash Yadav',
    category: 'electrical',
    experience: '6 years',
    rating: 4.4,
    pricePerHour: 350,
    skills: ['Wiring', 'Switch Installation', 'Fan Repair']
  },
  {
    id: 'electrician-2',
    name: 'Ravi Gupta',
    category: 'electrical',
    experience: '10 years',
    rating: 4.6,
    pricePerHour: 450,
    skills: ['Home Automation', 'Panel Installation', 'LED Setup']
  },
  {
    id: 'electrician-3',
    name: 'Manoj Kumar',
    category: 'electrical',
    experience: '4 years',
    rating: 4.1,
    pricePerHour: 280,
    skills: ['Basic Wiring', 'Socket Repair', 'Light Installation']
  },

  // AC Repair
  {
    id: 'ac-1',
    name: 'Deepak Technician',
    category: 'ac-repair',
    experience: '7 years',
    rating: 4.5,
    pricePerHour: 500,
    skills: ['AC Servicing', 'Gas Refilling', 'Installation']
  },
  {
    id: 'ac-2',
    name: 'Rohit AC Expert',
    category: 'ac-repair',
    experience: '9 years',
    rating: 4.7,
    pricePerHour: 600,
    skills: ['Split AC', 'Window AC', 'Central AC']
  },

  // Cleaning
  {
    id: 'cleaner-1',
    name: 'Sunita Cleaning Services',
    category: 'cleaning',
    experience: '3 years',
    rating: 4.3,
    pricePerHour: 200,
    skills: ['Deep Cleaning', 'Regular Cleaning', 'Kitchen Cleaning']
  },
  {
    id: 'cleaner-2',
    name: 'Perfect Clean Team',
    category: 'cleaning',
    experience: '5 years',
    rating: 4.6,
    pricePerHour: 250,
    skills: ['Bathroom Cleaning', 'Sofa Cleaning', 'Carpet Cleaning']
  },

  // Carpentry
  {
    id: 'carpenter-1',
    name: 'Ramesh Carpenter',
    category: 'carpentry',
    experience: '15 years',
    rating: 4.8,
    pricePerHour: 400,
    skills: ['Furniture Repair', 'Custom Furniture', 'Door Installation']
  },
  {
    id: 'carpenter-2',
    name: 'Sunil Wood Works',
    category: 'carpentry',
    experience: '8 years',
    rating: 4.4,
    pricePerHour: 350,
    skills: ['Cabinet Making', 'Shelf Installation', 'Wood Polishing']
  },

  // Painting
  {
    id: 'painter-1',
    name: 'Color Master Painters',
    category: 'painting',
    experience: '6 years',
    rating: 4.5,
    pricePerHour: 300,
    skills: ['Wall Painting', 'Texture Work', 'Exterior Painting']
  },
  {
    id: 'painter-2',
    name: 'Premium Paint Services',
    category: 'painting',
    experience: '10 years',
    rating: 4.7,
    pricePerHour: 450,
    skills: ['Interior Design', 'Decorative Painting', 'Waterproofing']
  }
];

export const serviceProducts: Product[] = [
  { id: 'service-1', name: 'Electrician Service', price: 300, category: 'electrical' },
  { id: 'service-2', name: 'Plumbing Repair', price: 250, category: 'plumbing' },
  { id: 'service-3', name: 'AC Servicing', price: 500, category: 'ac-repair' },
  { id: 'service-4', name: 'Carpenter Work', price: 400, category: 'carpentry' },
  { id: 'service-5', name: 'House Painting', price: 800, category: 'painting' },
  { id: 'service-6', name: 'WiFi Installation', price: 200, category: 'internet' }
];