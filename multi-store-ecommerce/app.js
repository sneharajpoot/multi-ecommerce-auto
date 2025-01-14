const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const shippingClassRoutes = require('./routes/shippingClassRoutes');
const bulkUploadLogRoutes = require('./routes/bulkUploadLogRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Category routes
const relatedProductRoutes = require('./routes/relatedProductRoutes'); // Related products routes
const productAttributeRoutes = require('./routes/productAttributeRoutes'); // Product attributes routes
const productMetadataRoutes = require('./routes/productMetadataRoutes'); // Product metadata routes
const discountRoutes = require('./routes/discountRoutes'); // Uncommented discount routes
const productTagRoutes = require('./routes/productTagRoutes');
const productReviewRoutes = require('./routes/productReviewRoutes');
const productPricingTierRoutes = require('./routes/productPricingTierRoutes');
const taxRuleRoutes = require('./routes/taxRuleRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes

dotenv.config(); // Load environment variables from .env file

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // HTTP request logging (for development)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/shipping-classes', shippingClassRoutes);
app.use('/api/bulk-upload-logs', bulkUploadLogRoutes);
app.use('/api/categories', categoryRoutes); // Category routes
app.use('/api/related-products', relatedProductRoutes); // Related products routes
app.use('/api/product-attributes', productAttributeRoutes); // Product attributes routes
app.use('/api/product-metadata', productMetadataRoutes); // Product metadata routes
app.use('/api/discounts', discountRoutes); // Uncommented discount routes
app.use('/api/product-tags', productTagRoutes);
app.use('/api/product-reviews', productReviewRoutes);
app.use('/api/product-pricing-tiers', productPricingTierRoutes);
app.use('/api/tax-rules', taxRuleRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes); // Use product routes

// Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).send('Multi-Store E-commerce Backend is Running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;