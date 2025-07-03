import { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    paymentMethod: 'cash'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.fullName || !formData.mobile || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    // Generate order ID and navigate to confirmation
    const orderId = 'BN' + Date.now().toString().slice(-6);
    
    // Clear cart and navigate to confirmation
    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation', { 
      state: { 
        orderId, 
        orderData: { ...formData, items: state.items, total: state.total }
      }
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No items in cart</h2>
          <p className="text-gray-600 mb-4">Add some items before checkout</p>
          <Button onClick={() => navigate('/')}>Go Shopping</Button>
        </div>
      </div>
    );
  }

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
                onClick={() => navigate('/cart')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Banknote className="w-5 h-5 text-green-600" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex items-center space-x-2 cursor-not-allowed flex-1">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <span>Credit/Debit Card (Coming Soon)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm text-white">
                      <div className="flex-1">
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-gray-300">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-white">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Subtotal</span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white">
                    <span>Delivery Fee</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t text-white">
                    <span>Total</span>
                    <span>₹{state.total}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}