import React from 'react';
import { useParams } from 'react-router-dom';
import OrderDetails from './admin/OrderDetails'; // Import the OrderDetails component

const OrderDetail = () => {
  const { orderId } = useParams(); // Get the orderId from the URL parameters

  return (
    <div>
      <OrderDetails orderId={orderId} isOpen={true} /> {/* Pass the orderId and isOpen prop */}
    </div>
  );
};

export default OrderDetail;
