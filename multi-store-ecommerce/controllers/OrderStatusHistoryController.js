const { Orders, sequelize, OrderStatusHistory, OrderStatuses } = require('../models');
const commanModule = require('../module/comman');

exports.updateOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { status } = req.body;

        const order = await Orders.findByPk(order_id);
        order.status_id = status;
        await order.save();

        await commanModule.addOrderStatusHistory(order_id, status, 1);

        res.status(200).json({ success: true, message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addOrderStatusHistory = async (order_id, status_id, is_visible = 0) => {
    const [responseAdd] = await sequelize.query(
        ` INSERT INTO  OrderStatusHistory (  order_id ,  status_id ,  is_visible  ) 
       VALUES ( :order_id ,  :status_id ,  :is_visible) `,
        {
            replacements: {
                order_id, status_id, is_visible
            },
            type: sequelize.QueryTypes.INSERT
        }
    );

    return responseAdd;
};
exports.addOrderStatusHistory = async (req, res) => {
    try {
        const { order_id } = req.params;
        const statuses = req.body;

        for (const status of statuses) {
            if (status.id === 0) {
                // Add new status history record
                await OrderStatusHistory.create({
                    order_id,
                    status_id: status.status,
                    description: status.description,
                    is_visible: status.is_visible,
                    action_date: status.action_date,
                });
            } else {
                // Update existing status history record
                await OrderStatusHistory.update(
                    {
                        status_id: status.status,
                        description: status.description,
                        is_visible: status.is_visible,
                        action_date: status.action_date,

                    },
                    { where: { id: status.id } }
                );
            }
        }

        res.status(200).json({ success: true, message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 

exports.getStatusList = async (req, res) => {
    try {

        
        const orders = await sequelize.query(
            `SELECT  * FROM OrderStatuses  `,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
 
        res.status(200).json({ success: true, data: orders, message: 'Order status list retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// New controller function for getting order history by order ID
exports.getOrderHistoryByOrderId = async (req, res) => {
    try {
        const { order_id } = req.params;

        const orderHistory = await sequelize.query(
            `SELECT 
            OrderStatusHistory.id, 
            OrderStatusHistory.order_id, 
            OrderStatusHistory.status_id, 
            OrderStatusHistory.is_visible, 
            OrderStatusHistory.action_date,
            OrderStatusHistory.created_at, 
            OrderStatusHistory.updated_at, 
            OrderStatuses.status_name, 
            OrderStatuses.description 
            FROM OrderStatusHistory 
            JOIN OrderStatuses ON OrderStatusHistory.status_id = OrderStatuses.id 
            WHERE OrderStatusHistory.order_id = :order_id`,
            {
                replacements: { order_id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ success: true, data: orderHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


