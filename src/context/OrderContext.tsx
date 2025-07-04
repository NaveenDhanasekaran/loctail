import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from '@/context/CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    fullName: string;
    mobile: string;
    address: string;
    email?: string;
  };
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  restaurantEmail?: string;
}

interface OrderState {
  orders: Order[];
}

type OrderAction =
  | { type: 'ADD_ORDER'; order: Order }
  | { type: 'UPDATE_ORDER_STATUS'; orderId: string; status: Order['status'] }
  | { type: 'CLEAR_ORDERS' };

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  addOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'estimatedDelivery' | 'status'>) => string;
  sendOrderEmail: (order: Order) => Promise<void>;
} | null>(null);

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        orders: [action.order, ...state.orders]
      };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        orders: state.orders.map(order =>
          order.id === action.orderId
            ? { ...order, status: action.status }
            : order
        )
      };
    
    case 'CLEAR_ORDERS':
      return { orders: [] };
    
    default:
      return state;
  }
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'estimatedDelivery' | 'status'>): string => {
    const orderId = 'LT' + Date.now().toString().slice(-6);
    const orderDate = new Date().toISOString();
    const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes from now
    
    const order: Order = {
      ...orderData,
      id: orderId,
      orderDate,
      estimatedDelivery,
      status: 'pending',
      restaurantEmail: 'naveen16043@gmail.com' // Your email for receiving orders
    };

    dispatch({ type: 'ADD_ORDER', order });
    
    // Send email notification
    sendOrderEmail(order);
    
    return orderId;
  };

  const sendOrderEmail = async (order: Order): Promise<void> => {
    try {
      // In a real application, you would send this to your backend API
      // For now, we'll simulate the email sending and log the details
      
      const emailContent = {
        to: 'naveen16043@gmail.com',
        subject: `New Order Received - ${order.id}`,
        html: `
          <h2>New Order Received</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Customer:</strong> ${order.customerInfo.fullName}</p>
          <p><strong>Phone:</strong> ${order.customerInfo.mobile}</p>
          <p><strong>Address:</strong> ${order.customerInfo.address}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Total Amount:</strong> ₹${order.total}</p>
          
          <h3>Order Items:</h3>
          <ul>
            ${order.items.map(item => 
              `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}</li>`
            ).join('')}
          </ul>
          
          <p><strong>Order Time:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleString()}</p>
        `
      };

      // Log email content for development (in production, this would be sent via email service)
      console.log('Order Email Content:', emailContent);
      
      // Simulate API call to send email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Order notification sent to ${emailContent.to}`);
      
    } catch (error) {
      console.error('Failed to send order email:', error);
    }
  };

  return (
    <OrderContext.Provider value={{
      state,
      dispatch,
      addOrder,
      sendOrderEmail
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};