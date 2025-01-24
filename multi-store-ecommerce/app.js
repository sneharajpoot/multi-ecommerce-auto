const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const storeRoutes = require('./routes/storeRoutes'); // Import store routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes
const productRoutes = require('./routes/productRoutes'); // Import product routes
const shippingClassRoutes = require('./routes/shippingClassRoutes');
const bulkUploadLogRoutes = require('./routes/bulkUploadLogRoutes');
const relatedProductRoutes = require('./routes/relatedProductRoutes'); // Related products routes
const productAttributeRoutes = require('./routes/productAttributeRoutes'); // Product attributes routes
const productMetadataRoutes = require('./routes/productMetadataRoutes'); // Product metadata routes
const discountRoutes = require('./routes/discountRoutes'); // Uncommented discount routes
const productTagRoutes = require('./routes/productTagRoutes');
const productReviewRoutes = require('./routes/productReviewRoutes');
const productPricingTierRoutes = require('./routes/productPricingTierRoutes');
const taxRuleRoutes = require('./routes/taxRuleRoutes');
const moduleRoutes = require('./routes/moduleRoutes'); // Import module routes
const permissionRoutes = require('./routes/permissionRoutes'); // Import permission routes
const rolePermissionRoutes = require('./routes/rolePermissionRoutes'); // Import role permission routes
const roleAssignmentRoutes = require('./routes/roleAssignmentRoutes'); // Import role assignment routes
const productImageRoutes = require('./routes/productImageRoutes'); // Import product image routes
const productVariantRoutes = require('./routes/productVariantRoutes');
const cartRoutes = require('./routes/cartRoutes');
const shippingAddressRoutes = require('./routes/shippingAddressRoutes'); // Import shipping address routes
const shippingAddressHistoryRoutes = require('./routes/shippingAddressHistoryRoutes'); // Import shipping address history routes

dotenv.config(); // Load environment variables from .env file

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // HTTP request logging (for development)

// Set strict-origin-when-cross-origin header
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Multi-Store E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the Multi-Store E-commerce application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/stores', storeRoutes); // Use store routes
app.use('/api/categories', categoryRoutes); // Use category routes
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/shipping-classes', shippingClassRoutes);
app.use('/api/bulk-upload-logs', bulkUploadLogRoutes);
app.use('/api/related-products', relatedProductRoutes); // Related products routes
app.use('/api/product-attributes', productAttributeRoutes); // Product attributes routes
app.use('/api/product-metadata', productMetadataRoutes); // Product metadata routes
app.use('/api/discounts', discountRoutes); // Uncommented discount routes
app.use('/api/product-tags', productTagRoutes);
app.use('/api/product-reviews', productReviewRoutes);
app.use('/api/product-pricing-tiers', productPricingTierRoutes);
app.use('/api/tax-rules', taxRuleRoutes);
app.use('/api/modules', moduleRoutes); // Use module routes
app.use('/api/permissions', permissionRoutes); // Use permission routes
app.use('/api/role-permissions', rolePermissionRoutes); // Use role permission routes
app.use('/api/role-assignments', roleAssignmentRoutes); // Use role assignment routes
app.use('/api/product-images', productImageRoutes); // Use product image routes
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/shipping-addresses', shippingAddressRoutes); // Use shipping address routes
app.use('/api/shipping-address-histories', shippingAddressHistoryRoutes); // Use shipping address history routes

// Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).send('Multi-Store E-commerce Backend is Running');
});

// Error Handling Middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;