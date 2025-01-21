import React from 'react';
import './CustomerPages.css'; // Import the shared CSS file

const Contact = () => {
  return (
    <div className="customer-page-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, please feel free to contact us:</p>
      <ul>
        <li>Email: support@ecommerce.com</li>
        <li>Phone: +1 234 567 890</li>
        <li>Address: 123 E-commerce St, Shopping City, SC 12345</li>
      </ul>
      <p>We are here to help you with any inquiries or issues you may have. Thank you for reaching out to us!</p>
    </div>
  );
};

export default Contact;
