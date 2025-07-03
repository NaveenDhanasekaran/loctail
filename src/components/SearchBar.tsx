import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { groceryProducts } from '@/data/products';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/context/CartContext';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = groceryProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      setFilteredProducts(filtered);
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (product: Product) => {
    setSearchQuery('');
    setIsOpen(false);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/grocery?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-2 w-full rounded-lg bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="search-dropdown">
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2 px-2">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </div>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="search-item flex items-center space-x-3 rounded-md"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.style.backgroundColor = '#4b5563';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {product.category.replace('-', ' ')}
                  </p>
                </div>
                <div className="text-sm font-semibold text-green-400">
                  ₹{product.price}
                </div>
              </div>
            ))}
          </div>
          
          {searchQuery.trim() && (
            <div className="border-t border-gray-600 p-2">
              <button
                onClick={() => {
                  navigate(`/grocery?search=${encodeURIComponent(searchQuery)}`);
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-2 text-sm text-purple-400 hover:text-purple-300 rounded-md hover:bg-gray-700"
              >
                Search for "{searchQuery}" in all products
              </button>
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {isOpen && searchQuery.trim() && filteredProducts.length === 0 && (
        <div className="search-dropdown">
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400 mb-2">No products found</p>
            <button
              onClick={() => {
                navigate(`/grocery?search=${encodeURIComponent(searchQuery)}`);
                setIsOpen(false);
              }}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Search in all categories
            </button>
          </div>
        </div>
      )}
    </div>
  );
}