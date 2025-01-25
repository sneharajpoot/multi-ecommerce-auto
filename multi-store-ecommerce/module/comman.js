const { Orders, sequelize, OrderStatusHistory } = require('../models');

exports.addOrderStatusHistory = async (order_id, status_id, is_visible = 0, action_date = null) => {
    const [responseAdd] = await sequelize.query(
        ` INSERT INTO  OrderStatusHistory (  order_id ,  status_id ,  is_visible, action_date  ) 
       VALUES ( :order_id ,  :status_id ,  :is_visible. :action_date) `,
        {
            replacements: {
                order_id, status_id, is_visible, action_date
            },
            type: sequelize.QueryTypes.INSERT
        }
    );

    return responseAdd;
};
