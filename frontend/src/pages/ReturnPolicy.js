import React from 'react';
import './CustomerPages.css'; // Import the shared CSS file

const ReturnPolicy = () => {
  return (
    <div className="customer-page-container">
      <h1>Return Policy</h1>
      <p>We want you to be completely satisfied with your purchase. If you are not satisfied, you can return the product within 30 days of purchase.</p>
      <h2>Return Process</h2>
      <p>To initiate a return, please contact our customer service team with your order details. We will provide you with instructions on how to return the product.</p>
      <h2>Refunds</h2>
      <p>Once we receive the returned product, we will inspect it and process your refund within 7-10 business days. The refund will be issued to the original payment method.</p>
      <h2>Exchanges</h2>
      <p>If you wish to exchange a product, please contact our customer service team. We will assist you with the exchange process.</p>
      <p>Thank you for shopping with us!</p>
    </div>
  );
};

export default ReturnPolicy;
