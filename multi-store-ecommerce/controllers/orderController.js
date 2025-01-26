const { Orders, OrderItems, ShippingAddressHistory, Cart, sequelize } = require('../models');
const orderStatusHistoryController = require('./OrderStatusHistoryController');

// Get all orders with pagination
exports.getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const orders = await sequelize.query(
            `SELECT 
        Orders.id, 
        Orders.uuid, 
        Orders.customer_id,  
        Orders.total_amount, 
        Orders.status, 
        Orders.createdAt, 
        Orders.updatedAt, 
        Orders.shipping_address_history_id, 
        Orders.tracking_number, 
        ShippingAddressHistory.address_line1, 
        ShippingAddressHistory.address_line2, 
        ShippingAddressHistory.city, 
        ShippingAddressHistory.state, 
        ShippingAddressHistory.postal_code, 
        ShippingAddressHistory.country 
      FROM Orders 
      JOIN ShippingAddressHistory ON Orders.shipping_address_history_id = ShippingAddressHistory.id
      LIMIT :limit OFFSET :offset`,
            {
                replacements: { limit: parseInt(limit), offset: parseInt(offset) },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const orderIds = orders.map(order => order.id);

        const orderItems = await sequelize.query(
            `SELECT 
        OrderItems.id, 
        OrderItems.order_id, 
        OrderItems.product_id, 
        OrderItems.variant_id, 
        OrderItems.quantity, 
        OrderItems.price, 
        OrderItems.createdAt, 
        OrderItems.updatedAt 
      FROM OrderItems 
      WHERE OrderItems.order_id IN (:orderIds)`,
            {
                replacements: { orderIds },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const ordersWithItems = orders.map(order => {
            order.items = orderItems.filter(item => item.order_id === order.id);
            return order;
        });

        res.status(200).json({ success: true, data: ordersWithItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getOrderByOrderId = async (req, res) => {
    try {
        console.log("req.user", req.user)
        let { order_id } = req.params;
        //role == admin
        let customer_id = req.user.id;

        const orders = await sequelize.query(
            `SELECT 
          Orders.id, 
          Orders.uuid, 
          Orders.customer_id,  
          Orders.total_amount, 
          Orders.status, 
          Orders.createdAt, 
          Orders.updatedAt, 
          Orders.shipping_address_history_id, 
          Orders.tracking_number, 
          ShippingAddressHistory.address_line1, 
          ShippingAddressHistory.address_line2, 
          ShippingAddressHistory.city, 
          ShippingAddressHistory.state, 
          ShippingAddressHistory.postal_code, 
          ShippingAddressHistory.country 
        FROM Orders 
        JOIN ShippingAddressHistory ON Orders.shipping_address_history_id = ShippingAddressHistory.id
        WHERE Orders.id = :order_id AND Orders.customer_id = :customer_id`,
            {
                replacements: { order_id, customer_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const orderItems = await sequelize.query(
            `SELECT 
          OrderItems.id, 
          OrderItems.order_id, 
          OrderItems.product_id, 
          OrderItems.variant_id, 
          OrderItems.quantity, 
          OrderItems.price, 
          OrderItems.createdAt, 
          OrderItems.updatedAt 
        FROM OrderItems 
        WHERE OrderItems.order_id = :order_id`,
            {
                replacements: { order_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const order = orders[0];
        order.items = orderItems;

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getOrderByOrderIdAdmin = async (req, res) => {
    try {
        console.log("req.user", req.user)
        let { order_id } = req.params;

        const orders = await sequelize.query(
            `SELECT 
          Orders.id, 
          Orders.uuid, 
          Orders.customer_id,  
          Orders.total_amount, 
          Orders.status, 
          Orders.createdAt, 
          Orders.updatedAt, 
          Orders.shipping_address_history_id, 
          Orders.tracking_number, 
          ShippingAddressHistory.address_line1, 
          ShippingAddressHistory.address_line2, 
          ShippingAddressHistory.city, 
          ShippingAddressHistory.state, 
          ShippingAddressHistory.postal_code, 
          ShippingAddressHistory.country 
        FROM Orders 
        left JOIN ShippingAddressHistory ON Orders.shipping_address_history_id = ShippingAddressHistory.id
        WHERE Orders.id = :order_id  `,
            {
                replacements: { order_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        console.log("orders-----", orders)
        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const orderItems = await sequelize.query(
            `SELECT 
          OrderItems.id, 
          OrderItems.order_id, 
          OrderItems.product_id, 
          OrderItems.variant_id, 
          OrderItems.quantity, 
          OrderItems.price, 
          OrderItems.createdAt, 
          OrderItems.updatedAt 
        FROM OrderItems 
        WHERE OrderItems.order_id = :order_id`,
            {
                replacements: { order_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const order = orders[0];
        order.items = orderItems;

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCustomerOrderById = async (req, res) => {
    try {
        let customer_id = req.user.id;

        const orders = await sequelize.query(
            `SELECT 
          Orders.id, 
          Orders.uuid, 
          Orders.customer_id,  
          Orders.total_amount, 
          Orders.status, 
          Orders.createdAt, 
          Orders.updatedAt, 
          Orders.shipping_address_history_id, 
          Orders.tracking_number, 
          ShippingAddressHistory.address_line1, 
          ShippingAddressHistory.address_line2, 
          ShippingAddressHistory.city, 
          ShippingAddressHistory.state, 
          ShippingAddressHistory.postal_code, 
          ShippingAddressHistory.country 
        FROM Orders 
        JOIN ShippingAddressHistory ON Orders.shipping_address_history_id = ShippingAddressHistory.id
        WHERE Orders.customer_id = :customer_id`,
            {
                replacements: { customer_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const orderIds = orders.map(order => order.id);

        const orderItems = await sequelize.query(
            `SELECT 
          OrderItems.id, 
          OrderItems.order_id, 
          OrderItems.product_id, 
          OrderItems.variant_id, 
          OrderItems.quantity, 
          OrderItems.price, 
          OrderItems.createdAt, 
          OrderItems.updatedAt 
        FROM OrderItems 
        WHERE OrderItems.order_id IN (:orderIds)`,
            {
                replacements: { orderIds },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const ordersWithItems = orders.map(order => {
            order.items = orderItems.filter(item => item.order_id === order.id);
            return order;
        });

        res.status(200).json({ success: true, data: ordersWithItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a new order
exports.addOrder = async (req, res) => {
    const { addressId } = req.body;
    const userId = req.user.id;

    try {
        console.log('Start processing order for user:', userId);

        // Get cart items for the user
        const cartItems = await sequelize.query(
            `SELECT 
        Cart.id, 
        Cart.product_id, 
        Cart.variant_id, 
        Cart.quantity,   
        Products.price AS product_price, 
        Product_Variants.price AS variant_price

      FROM Cart 
      JOIN Products ON Cart.product_id = Products.id 
      LEFT JOIN Product_Variants ON Cart.variant_id = Product_Variants.id 
      WHERE Cart.customer_id = :userId`,
            {
                replacements: { userId },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (cartItems.length === 0) {
            console.log('No items in cart for user:', userId);
            return res.status(400).json({ success: false, message: 'No items in cart' });
        }

        console.log('Cart items retrieved for user:', userId);

        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => {
            const price = item.variant_price || item.product_price;
            return total + (price * item.quantity);
        }, 0);

        console.log('Total amount calculated for user:', userId, 'Amount:', totalAmount);

        // Get shipping address
        const shippingAddress = await sequelize.query(
            `SELECT * FROM ShippingAddress WHERE id = :addressId AND customer_id = :userId`,
            {
                replacements: { addressId, userId },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (shippingAddress.length === 0) {
            console.log('Shipping address not found for user:', userId);
            return res.status(404).json({ success: false, message: 'Shipping address not found' });
        }

        console.log('Shipping address retrieved for user:', userId);

        // Create shipping address history
        const [newShippingAddressHistory] = await sequelize.query(
            `INSERT INTO ShippingAddressHistory (uuid, customer_id, order_id, address_line1, address_line2, city, state, postal_code, country, latitude, longitude, createdAt, updatedAt)
       VALUES (UUID(), :customer_id, :order_id, :address_line1, :address_line2, :city, :state, :postal_code, :country, :latitude, :longitude, NOW(), NOW())`,
            {
                replacements: {
                    customer_id: userId,
                    order_id: 0,
                    address_line1: shippingAddress[0].address_line1,
                    address_line2: shippingAddress[0].address_line2,
                    city: shippingAddress[0].city,
                    state: shippingAddress[0].state,
                    postal_code: shippingAddress[0].postal_code,
                    country: shippingAddress[0].country,
                    latitude: shippingAddress[0].latitude,
                    longitude: shippingAddress[0].longitude
                },
                type: sequelize.QueryTypes.INSERT
            }
        );

        console.log('Shipping address history created for user:', userId);

        // Create order
        const [newOrder] = await sequelize.query(
            `INSERT INTO Orders (uuid, customer_id,  total_amount, shipping_address_history_id, tracking_number, status)
       VALUES (UUID(), :customerId,  :totalAmount, :shippingAddressHistoryId, NULL, 'pending')`,
            {
                replacements: { 
                    customerId: userId,
                    totalAmount,
                    shippingAddressHistoryId: newShippingAddressHistory
                },
                type: sequelize.QueryTypes.INSERT
            }
        );

        console.log('Order created for user:', userId, 'Order ID:', newOrder);

        // Create order items
        await Promise.all(
            cartItems.map(async (item) => {
                const price = item.variant_price || item.product_price;
                await sequelize.query(
                    `INSERT INTO OrderItems (store_id, order_id, product_id, variant_id, quantity, price, createdAt, updatedAt)
           VALUES (:storeId, :orderId, :productId, :variantId, :quantity, :price, NOW(), NOW())`,
                    {
                        replacements: {
                            storeId: item.store_id,
                            orderId: newOrder,
                            productId: item.product_id,
                            variantId: item.variant_id,
                            quantity: item.quantity,
                            price
                        },
                        type: sequelize.QueryTypes.INSERT
                    }
                );
            })
        );

        console.log('Order items created for order ID:', newOrder);

        // Clear cart
        await sequelize.query(
            `DELETE FROM Cart WHERE customer_id = :userId`,
            {
                replacements: { userId },
                type: sequelize.QueryTypes.DELETE
            }
        );

        console.log('Cart cleared for user:', userId);

        res.status(201).json({ success: true, message: 'Order added successfully', data: { orderId: newOrder } });
    } catch (error) {
        console.error('Error processing order for user:', userId, 'Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderItems, shippingAddress, ...orderData } = req.body;

        // Update order
        const [updated] = await Orders.update(orderData, { where: { id } });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        const updatedOrder = await Orders.findByPk(id);

        // Update shipping address history
        if (shippingAddress) {
            await ShippingAddressHistory.update(shippingAddress, { where: { id: updatedOrder.shippingAddressHistoryId } });
        }

        // Update order items
        if (orderItems && orderItems.length > 0) {
            await Promise.all(
                orderItems.map(async (item) => {
                    const { id: itemId, ...itemData } = item;
                    const [itemUpdated] = await OrderItems.update(itemData, { where: { id: itemId, orderId: id } });
                    if (!itemUpdated) {
                        await OrderItems.create({ ...itemData, orderId: id });
                    }
                })
            );
        }

        res.status(200).json({ success: true, message: 'Order updated successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Orders.findByPk(id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        await order.destroy();
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
exports.getStatusList = async (req, res) => {
    try {
        let result = await orderStatusHistoryController.getStatusList();
        res.status(200).json({ success: true, data: result, message: 'Order status list retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
// New controller function for getting list of order statuses
exports.getOrderStatuses = async (req, res) => {
    try {
        const orderStatuses = await sequelize.query(
            `SELECT 
            id, 
            status_name, 
            description, 
            created_at 
            FROM OrderStatuses`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ success: true, data: orderStatuses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

