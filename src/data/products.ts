import { Product } from '@/context/CartContext';

export const groceryProducts: Product[] = [
  // Fruits
  { 
    id: 'fruit-1', 
    name: 'Fresh Red Apples (1kg)', 
    price: 120, 
    category: 'fruits',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'fruit-2', 
    name: 'Ripe Bananas (1 dozen)', 
    price: 60, 
    category: 'fruits',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'fruit-3', 
    name: 'Sweet Oranges (1 kg)', 
    price: 80, 
    category: 'fruits',
    image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'fruit-4', 
    name: 'Green Grapes (500g)', 
    price: 90, 
    category: 'fruits',
    image: 'https://images.pexels.com/photos/23042/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'fruit-5', 
    name: 'Fresh Mangoes (1kg)', 
    price: 150, 
    category: 'fruits',
    image: 'data:image/jpeg;base64,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'
  },
  { 
    id: 'fruit-6', 
    name: 'Pomegranate (500g)', 
    price: 180, 
    category: 'fruits',
    image: 'https://toneopeats-strapi-prod.s3.ap-south-1.amazonaws.com/Pomegranate_Benefits_1c9932b0cc.jpg'
  },
  
  // Vegetables
  { 
    id: 'veg-1', 
    name: 'Fresh Tomatoes (1 kg)', 
    price: 40, 
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'veg-2', 
    name: 'Red Onions (1 kg)', 
    price: 35, 
    category: 'vegetables',
    image: 'data:image/jpeg;base64,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'
  },
  { 
    id: 'veg-3', 
    name: 'Potatoes (1 kg)', 
    price: 30, 
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'veg-4', 
    name: 'Fresh Carrots (500g)', 
    price: 25, 
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'veg-5', 
    name: 'Green Capsicum (500g)', 
    price: 45, 
    category: 'vegetables',
    image: 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'veg-6', 
    name: 'Fresh Spinach (250g)', 
    price: 20, 
    category: 'vegetables',
    image: 'data:image/jpeg;base64,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'
  },
  
  // Dairy
  { 
    id: 'dairy-1', 
    name: 'Fresh Milk (1L)', 
    price: 55, 
    category: 'dairy',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'dairy-2', 
    name: 'Greek Yogurt (400g)', 
    price: 45, 
    category: 'dairy',
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'dairy-3', 
    name: 'Cheese Slices (200g)', 
    price: 120, 
    category: 'dairy',
    image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'dairy-4', 
    name: 'Butter (100g)', 
    price: 65, 
    category: 'dairy',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'dairy-5', 
    name: 'Paneer (250g)', 
    price: 80, 
    category: 'dairy',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'dairy-6', 
    name: 'Cream (200ml)', 
    price: 35, 
    category: 'dairy',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  
  // Snacks
  { 
    id: 'snack-1', 
    name: 'Potato Chips (50g)', 
    price: 20, 
    category: 'snacks',
    image: 'https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'snack-2', 
    name: 'Digestive Biscuits', 
    price: 35, 
    category: 'snacks',
    image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'snack-3', 
    name: 'Dark Chocolate Bar', 
    price: 45, 
    category: 'snacks',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'snack-4', 
    name: 'Mixed Nuts (100g)', 
    price: 180, 
    category: 'snacks',
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'snack-5', 
    name: 'Cookies Pack', 
    price: 25, 
    category: 'snacks',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'snack-6', 
    name: 'Namkeen Mix (200g)', 
    price: 40, 
    category: 'snacks',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
    { 
    id: 'snack-7', 
    name: 'Dairy milk', 
    price: 10, 
    category: 'snacks',
    image: 'https://neelamfoodlandmumbai.com/cdn/shop/files/3301_1_800x.jpg?v=1736099335'
  },
  // Toys
{ 
  id: 'toy-1', 
  name: 'Remote Control Car', 
  price: 899, 
  category: 'toys',
  subcategory: 'kids',
  image: 'https://images.pexels.com/photos/4200787/pexels-photo-4200787.jpeg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'toy-2', 
  name: 'Lego Building Blocks', 
  price: 1599, 
  category: 'toys',
  subcategory: 'kids',
  image: 'https://images.pexels.com/photos/163743/lego-duplo-bricks-play-163743.jpeg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'toy-3', 
  name: 'Adult Puzzle', 
  price: 499, 
  category: 'toys',
  subcategory: 'adult',
  image: 'https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=400'
},

// Fashion
{ 
  id: 'fashion-1', 
  name: "Men's T-Shirt", 
  price: 699, 
  category: 'fashion',
  subcategory: 'men',
  image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'fashion-2', 
  name: "Women's Summer Dress", 
  price: 1299, 
  category: 'fashion',
  subcategory: 'women',
  image: 'https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'fashion-3', 
  name: 'Unisex Sneakers', 
  price: 2499, 
  category: 'fashion',
  subcategory: 'unisex',
  image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'fashion-4', 
  name: 'Kids Hoodie', 
  price: 899, 
  category: 'fashion',
  subcategory: 'kids',
  image: 'https://images.pexels.com/photos/1648376/pexels-photo-1648376.jpeg?auto=compress&cs=tinysrgb&w=400'
},

// Everything Else
{ 
  id: 'other-1', 
  name: 'Bluetooth Earphones', 
  price: 1499, 
  category: 'electronics',
  image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'other-2', 
  name: 'Notebook Journal', 
  price: 150, 
  category: 'stationery',
  image: 'https://images.pexels.com/photos/5984/pen-writing-notes-studying.jpg?auto=compress&cs=tinysrgb&w=400'
},
{ 
  id: 'other-3', 
  name: 'Coffee Mug', 
  price: 299, 
  category: 'home',
  image: 'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=400'
},
   {
    id: 'book-1',
    name: 'Atomic Habits',
    price: 450,
    category: 'books',
    image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'book-2',
    name: 'The Alchemist',
    price: 350,
    category: 'books',
    image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'book-3',
    name: 'Rich Dad Poor Dad',
    price: 400,
    category: 'books',
    image: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Electronics
  {
    id: 'elec-1',
    name: 'iPhone 14',
    price: 79999,
    category: 'electronics',
    subcategory: 'mobiles',
    image: 'https://images.pexels.com/photos/1647970/pexels-photo-1647970.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'elec-2',
    name: 'Dell Laptop',
    price: 59999,
    category: 'electronics',
    subcategory: 'laptops',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'elec-3',
    name: 'Bluetooth Headphones',
    price: 1500,
    category: 'electronics',
    subcategory: 'audio',
    image: 'https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'elec-4',
    name: 'Smart Watch',
    price: 2999,
    category: 'electronics',
    subcategory: 'wearables',
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'elec-5',
    name: 'USB-C Charger',
    price: 799,
    category: 'electronics',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/159220/powerbank-battery-charger-energy-159220.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Phones
  {
    id: 'phone-1',
    name: 'iPhone 14 Pro',
    price: 124999,
    category: 'mobiles',
    image: 'https://images.pexels.com/photos/1647970/pexels-photo-1647970.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'phone-2',
    name: 'Samsung Galaxy S23',
    price: 89999,
    category: 'mobiles',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'phone-3',
    name: 'OnePlus 12',
    price: 64999,
    category: 'mobiles',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Beauty
  {
    id: 'beauty-1',
    name: 'Herbal Face Wash',
    price: 199,
    category: 'beauty',
    subcategory: 'skincare',
    image: 'https://images.pexels.com/photos/373834/pexels-photo-373834.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'beauty-2',
    name: 'Aloe Vera Gel',
    price: 150,
    category: 'beauty',
    subcategory: 'skincare',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'beauty-3',
    name: 'Sunscreen SPF 50',
    price: 299,
    category: 'beauty',
    subcategory: 'skincare',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'beauty-4',
    name: 'Argan Hair Oil',
    price: 250,
    category: 'beauty',
    subcategory: 'haircare',
    image: 'https://images.pexels.com/photos/373834/pexels-photo-373834.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'beauty-5',
    name: 'Matte Lipstick',
    price: 399,
    category: 'beauty',
    subcategory: 'makeup',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'beauty-6',
    name: 'Unisex Perfume',
    price: 599,
    category: 'beauty',
    subcategory: 'unisex',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Feature Phones (mobiles)
  {
    id: 'mobile-fp-1',
    name: 'Nokia 3310',
    price: 2499,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-2',
    name: 'Samsung Guru',
    price: 1799,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-3',
    name: 'Lava A1',
    price: 1299,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-4',
    name: 'Micromax X1i',
    price: 1399,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-5',
    name: 'Karbonn K9',
    price: 1199,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-6',
    name: 'Itel Power 110',
    price: 1099,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-7',
    name: 'Intex Eco',
    price: 999,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-8',
    name: 'Spice Z101',
    price: 899,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-9',
    name: 'Celkon C9',
    price: 799,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-fp-10',
    name: 'Zen M72',
    price: 699,
    category: 'mobiles',
    subcategory: 'featurephones',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Accessories (mobiles)
  {
    id: 'mobile-acc-1',
    name: 'Mobile Back Cover',
    price: 299,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-2',
    name: 'Screen Guard',
    price: 199,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-3',
    name: 'Earphones',
    price: 499,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-4',
    name: 'Power Bank',
    price: 999,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-5',
    name: 'Bluetooth Speaker',
    price: 1299,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-6',
    name: 'Car Charger',
    price: 399,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-7',
    name: 'Selfie Stick',
    price: 249,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-8',
    name: 'OTG Cable',
    price: 149,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-9',
    name: 'SIM Adapter',
    price: 99,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mobile-acc-10',
    name: 'Mobile Stand',
    price: 199,
    category: 'mobiles',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Seasonal Picks
  {
    id: 'seasonal-1',
    name: 'Mangoes (Seasonal)',
    price: 180,
    category: 'seasonal',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'seasonal-2',
    name: 'Watermelon (Seasonal)',
    price: 60,
    category: 'seasonal',
    image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Exotics & Premium
  {
    id: 'exotic-1',
    name: 'Dragon Fruit',
    price: 250,
    category: 'exotics',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'exotic-2',
    name: 'Avocado',
    price: 300,
    category: 'exotics',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Leafy, Herbs & Seasonings
  {
    id: 'herb-1',
    name: 'Coriander Leaves',
    price: 20,
    category: 'herbs',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'herb-2',
    name: 'Mint Leaves',
    price: 25,
    category: 'herbs',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Organics & Hydroponics
  {
    id: 'organic-1',
    name: 'Organic Tomatoes',
    price: 80,
    category: 'organics',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'organic-2',
    name: 'Hydroponic Lettuce',
    price: 120,
    category: 'organics',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];


