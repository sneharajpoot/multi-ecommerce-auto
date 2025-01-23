const { Cart } = require('../models');

// Get all cart items
exports.getCartItems = async (req, res) => {
    try {
        let { customer_id } = req.params;
        const cartItems = await Cart.findAll();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

// Add a new cart item
exports.addAndUpdateCartItem = async (req, res) => {
    const { product_id, quantity, variant_id } = req.body;
    const {customer_id} = req.params;

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