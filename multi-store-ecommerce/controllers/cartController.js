const e = require('express');
const { Cart, Product, Product_Variants, sequelize } = require('../models');

// Get all cart items by customer_id
exports.getCartItems = async (req, res) => {
    try {
        let { customer_id } = req.params;

        const cartItems = await sequelize.query(
            `SELECT 
                Cart.id, 
                Cart.customer_id, 
                Cart.product_id, 
                Cart.variant_id, 
                Cart.quantity, 
                Products.name AS product_name, 
                Products.description AS product_description, 
                Products.price AS product_price, 
                Product_Variants.name AS variant_name, 
                Product_Variants.price AS variant_price 
            FROM Cart 
            JOIN Products ON Cart.product_id = Products.id 
            LEFT JOIN Product_Variants ON Cart.variant_id = Product_Variants.id
            WHERE Cart.customer_id = :customer_id`,
            {
                replacements: { customer_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

exports.getCartItemsDetail = async (req, res) => {
    try {
        let { customer_id } = req.params;

        const cartItems = await sequelize.query(
            `SELECT 
                Cart.id, 
                Cart.customer_id, 
                Cart.product_id, 
                Cart.variant_id, 
                Cart.quantity, 
                Products.name AS product_name, 
                Products.description AS product_description, 
                Products.price AS product_price, 
                Product_Variants.name, 
                Product_Variants.price 
            FROM Cart 
            JOIN Products ON Cart.product_id = Products.id 
            JOIN Product_Variants ON Cart.variant_id = Product_Variants.id
            WHERE Cart.customer_id = :customer_id`,
            {
                replacements: { customer_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

// Add a new cart item
exports.addAndUpdateCartItem = async (req, res) => {
    const { product_id, quantity, variant_id } = req.body;
    const { customer_id } = req.params;

    try {
        //check if the product is already in the cart
        const cartItem = await Cart.findOne({ where: { customer_id, product_id, variant_id } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Cart item updated successfully', cartItem });
        }
        const newCartItem = await Cart.create({ customer_id, product_id, quantity, variant_id });
        res.status(201).json({ message: 'Cart item added successfully', cartItem: newCartItem });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};


// Add a new cart item
exports.updateCartItemCount = async (req, res) => {
    const { quantity } = req.body;
    const {   cart_id } = req.params;

    try {
        //check if the product is already in the cart
        const cartItem = await Cart.findOne({ where: { id: cart_id } });
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Cart item updated successfully', cartItem });
        } else {
            return res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
// Add a new cart item
exports.addCartItem = async (req, res) => {
    const { customer_id, product_id, qty, variant_id } = req.body;

    try {
        const newCartItem = await Cart.create({ customer_id, product_id, qty, variant_id });
        res.status(201).json({ message: 'Cart item added successfully', cartItem: newCartItem });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { qty } = req.body;

    try {
        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        cartItem.qty = qty;

        await cartItem.save();

        res.status(200).json({ message: 'Cart item updated successfully', cartItem });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await cartItem.destroy();

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};