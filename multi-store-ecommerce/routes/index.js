const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const warehouseRoutes = require('./warehouseRoutes');
const shippingClassRoutes = require('./shippingClassRoutes');
const bulkUploadLogRoutes = require('./bulkUploadLogRoutes');
const categoryRoutes = require('./categoryRoutes'); // Category routes
const relatedProductRoutes = require('./relatedProductRoutes'); // Related products routes
const productAttributeRoutes = require('./productAttributeRoutes'); // Product attributes routes
const productMetadataRoutes = require('./productMetadataRoutes'); // Product metadata routes
const discountRoutes = require('./discountRoutes'); // Uncommented discount routes
const productTagRoutes = require('./productTagRoutes');
const productReviewRoutes = require('./productReviewRoutes');
const productPricingTierRoutes = require('./productPricingTierRoutes');
const taxRuleRoutes = require('./taxRuleRoutes');
const storeRoutes = require('./storeRoutes');
const productRoutes = require('./productRoutes'); // Import product routes

module.exports =  { 
    authRoutes,
    userRoutes,
    roleRoutes,
    warehouseRoutes,
    shippingClassRoutes,
    bulkUploadLogRoutes,
    categoryRoutes,
    relatedProductRoutes,
    productAttributeRoutes,
    productMetadataRoutes,
    discountRoutes,
    productTagRoutes,
    productReviewRoutes,
    productPricingTierRoutes,
    taxRuleRoutes,
    storeRoutes,
    productRoutes,
}