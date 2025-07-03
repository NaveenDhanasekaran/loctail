import { CheckCircle, Home, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { orderId, orderData } = location.state || {};

  if (!orderId || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your order. We'll deliver it soon.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Order Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order ID:</span>
              <Badge variant="outline" className="font-mono">{orderId}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="text-lg font-bold text-green-600">₹{orderData.total}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Payment Method:</span>
              <span className="capitalize">{orderData.paymentMethod === 'cash' ? 'Cash on Delivery' : orderData.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between items-start">
              <span className="font-medium">Delivery Address:</span>
              <span className="text-right max-w-xs">{orderData.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Items Ordered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery Time</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">15-30 minutes</p>
              <p className="text-sm text-gray-600">We'll call you when we're nearby</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate('/orders')}
            variant="outline"
            className="flex-1"
          >
            Track Order
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
}