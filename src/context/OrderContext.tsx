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
      // Send email using a simple email service API
      const emailData = {
        to: 'naveen16043@gmail.com',
        from: 'orders@loctail.com',
        subject: `New Order Received - ${order.id}`,
        text: `
New Order Details:

Order ID: ${order.id}
Customer: ${order.customerInfo.fullName}
Phone: ${order.customerInfo.mobile}
Email: ${order.customerInfo.email || 'Not provided'}
Address: ${order.customerInfo.address}
Payment Method: ${order.paymentMethod}
Total Amount: ₹${order.total}

Order Items:
${order.items.map(item => 
  `- ${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
).join('\n')}

Order Time: ${new Date(order.orderDate).toLocaleString()}
Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleString()}

Please prepare the order for delivery.

Best regards,
Loctail Team
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8b5cf6;">New Order Received - ${order.id}</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${order.customerInfo.fullName}</p>
              <p><strong>Phone:</strong> ${order.customerInfo.mobile}</p>
              <p><strong>Email:</strong> ${order.customerInfo.email || 'Not provided'}</p>
              <p><strong>Address:</strong> ${order.customerInfo.address}</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Order Details</h3>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
              <p><strong>Total Amount:</strong> ₹${order.total}</p>
              <p><strong>Order Time:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleString()}</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Order Items</h3>
              <ul>
                ${order.items.map(item => 
                  `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}</li>`
                ).join('')}
              </ul>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              Please prepare the order for delivery as soon as possible.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #8b5cf6; font-weight: bold;">Loctail Team</p>
              <p style="color: #6b7280; font-size: 12px;">Your Hyperlocal Super App</p>
            </div>
          </div>
        `
      };
      
      // Try to send email using EmailJS or similar service
      // For now, we'll use a simple fetch to a mock email service
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: 'default_service',
            template_id: 'template_order',
            user_id: 'public_key',
            template_params: {
              to_email: 'naveen16043@gmail.com',
              from_name: 'Loctail Orders',
              subject: emailData.subject,
              message: emailData.text,
              html_message: emailData.html
            }
          })
        });
        
        if (response.ok) {
          console.log('Email sent successfully to naveen16043@gmail.com');
        } else {
          throw new Error('Email service failed');
        }
      } catch (emailError) {
        // Fallback: Log detailed email content
        console.log('Email Service Error - Logging email content:', emailError);
        console.log('=== ORDER EMAIL CONTENT ===');
        console.log('To:', emailData.to);
        console.log('Subject:', emailData.subject);
        console.log('Content:', emailData.text);
        console.log('=== END EMAIL CONTENT ===');
        
        // Also try to send via browser's mailto (will open email client)
        const mailtoLink = `mailto:naveen16043@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.text)}`;
        window.open(mailtoLink, '_blank');
      }
      
      console.log(`Order notification processed for ${emailData.to}`);
      
    } catch (error) {
      console.error('Failed to send order email:', error);
      
      // Fallback notification
      console.log('=== FALLBACK ORDER NOTIFICATION ===');
      console.log(`New order ${order.id} from ${order.customerInfo.fullName}`);
      console.log(`Phone: ${order.customerInfo.mobile}`);
      console.log(`Total: ₹${order.total}`);
      console.log(`Items: ${order.items.length} items`);
      console.log('=== END NOTIFICATION ===');
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