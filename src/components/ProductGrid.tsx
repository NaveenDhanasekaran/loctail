import { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product, useCart } from '@/context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductGridProps {
  products: Product[];
  category?: string;
}

export default function ProductGrid({ products, category }: ProductGridProps) {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', product });
    toast.success(`${product.name} added to cart!`);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Filter products based on category and search query
  let filteredProducts = products;
  
  if (searchQuery) {
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (category && category !== 'all') {
    filteredProducts = products.filter(product => product.category === category);
  }

  return (
    <div className="bg-gray-900">
      {searchQuery && (
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            Search results for "{searchQuery}"
          </h2>
          <p className="text-sm text-gray-300">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gray-800 hover:bg-gray-700 group card-dark"
            onClick={() => handleProductClick(product)}
          >
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative w-full h-40 bg-gray-700 rounded-t-lg overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.backgroundColor = '#374151';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
                
                {/* Discount Badge */}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                    ₹{Math.floor(Math.random() * 20) + 5} Off
                  </Badge>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-3 space-y-2">
                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-white">₹{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price + Math.floor(Math.random() * 50) + 10}
                  </span>
                </div>
                
                {/* Product Name */}
                <h3 className="text-sm font-medium text-white line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{(4.0 + Math.random()).toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ({Math.floor(Math.random() * 1000) + 100})
                  </span>
                </div>
                
                {/* Quantity and Add Button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-400">
                    {Math.floor(Math.random() * 500) + 100}g
                  </span>
                  <Button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 h-8 text-xs rounded-md"
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            {searchQuery ? `No products found for "${searchQuery}"` : 'No products found in this category'}
          </p>
          <Button 
            onClick={() => navigate('/grocery')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Browse All Products
          </Button>
        </div>
      )}
    </div>
  );
}