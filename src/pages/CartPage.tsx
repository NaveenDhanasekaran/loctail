import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity: newQuantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
    toast.success('Item removed from cart');
  };

  const proceedToCheckout = () => {
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
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
              <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <Button onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.style.backgroundColor = '#f3f4f6';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100"></div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{item.name}</h3>
                        <p className="text-sm text-white">₹{item.price} each</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Price & Remove */}
                      <div className="text-right">
                        <p className="font-semibold text-white">₹{item.price * item.quantity}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1 mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-white">
                    <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white">
                    <span>Delivery Fee</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <hr className="my-2 border-white" />
                  <div className="flex justify-between font-semibold text-lg text-white">
                    <span>Total</span>
                    <span>₹{state.total}</span>
                  </div>
                </div>

                <Button 
                  onClick={proceedToCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}