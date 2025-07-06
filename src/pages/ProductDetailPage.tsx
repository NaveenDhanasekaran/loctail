import { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, Share } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const { product } = location.state || {};

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <Button onClick={() => navigate('/grocery')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const originalPrice = product.price + Math.floor(Math.random() * 50) + 10;
  const discount = Math.floor(((originalPrice - product.price) / originalPrice) * 100);
  const rating = (4.0 + Math.random()).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 1000) + 100;

  const offers = [
    {
      brand: 'loctail',
      text: 'Set of 2 Fridge Magnets worth ₹349 for FREE!',
      color: 'text-orange-500'
    },
    {
      brand: 'loctail',
      text: 'Enjoy 50% Off on Your 1st Month Subscription!',
      color: 'text-pink-500'
    },
    {
      brand: 'loctail',
      text: 'Buy any 2 skincare products @ ₹699 + Extra 5% Off',
      color: 'text-blue-500'
    },
    {
      brand: 'loctail',
      text: 'Free Colored Frame with Photo worth ₹409 for FREE!',
      color: 'text-orange-500'
    },
    {
      brand: 'bhim',
      text: 'Get flat ₹15 discount with BHIM Payments App',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-2xl font-bold text-purple-600">loctail</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="w-full h-96 bg-white rounded-lg overflow-hidden shadow-sm">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            
            {/* Thumbnail */}
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-white rounded-lg border-2 border-purple-600 overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100"></div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
              <span className="text-purple-600 cursor-pointer">Loctail Store</span> >
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name.replace(/\([^)]*\)/g, '').trim()}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-600">Net Qty: 100 g</span>
                <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{rating}</span>
                </div>
                <span className="text-sm text-gray-500">({reviewCount})</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-lg text-gray-500 line-through">₹{originalPrice}</span>
                <Badge className="bg-green-100 text-green-800 text-sm">
                  {discount}% Off
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">MRP ₹{originalPrice}</span>
                <span className="text-xs text-gray-500">(incl. of all taxes)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-medium">Get it for ₹{product.price}</span>
                <Badge className="bg-gray-200 text-gray-800 text-xs">SUPER SAVER</Badge>
              </div>
            </div>

            {/* Offers */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Coupons & Offers</h3>
                <div className="space-y-3">
                  {offers.map((offer, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{offer.brand}</span>
                      </div>
                      <span className="text-sm text-gray-700 flex-1">{offer.text}</span>
                      <span className="text-gray-400">></span>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="text-pink-500 p-0 h-auto mt-2">
                  View all coupons
                </Button>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg font-medium"
                size="lg"
              >
                ADD to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}