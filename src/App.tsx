import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/context/CartContext';
import { LocationProvider } from '@/context/LocationContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AddAddressPage from './pages/AddAddressPage';
import GroceryPage from './pages/GroceryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FoodPage from './pages/FoodPage';
import ServicesPage from './pages/ServicesPage';
import ServiceBookingPage from './pages/ServiceBookingPage';
import ServiceConfirmationPage from './pages/ServiceConfirmationPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/add-address" element={<AddAddressPage />} />
                <Route path="/grocery" element={<GroceryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/food" element={<FoodPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/service-booking" element={<ServiceBookingPage />} />
                <Route path="/service-confirmation" element={<ServiceConfirmationPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/orders" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Orders - Coming Soon</h1></div>} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;