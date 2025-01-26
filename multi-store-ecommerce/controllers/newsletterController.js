const db = require('../models'); // Import models
const { Newsletter } = db;

// Subscribe to the newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists
    let subscription = await Newsletter.findOne({ where: { email } });

    if (subscription) {
      if (subscription.is_subscribed) {
        return res.status(400).json({ success: false, message: 'Already subscribed' });
      } else {
        subscription.is_subscribed = true;
        subscription.status = 'active';
        subscription.subscribed_at = new Date();
        await subscription.save();
        return res.status(200).json({ success: true, message: 'Resubscribed successfully', subscription });
      }
    }

    // Create a new subscription
    const newSubscription = await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully', subscription: newSubscription });
  } catch (error) {
    console.error('Error subscribing:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Fetch all subscriptions
exports.getSubscriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: subscriptions } = await Newsletter.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      subscriptions,
      totalSubscriptions: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10)
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Unsubscribe from the newsletter
exports.unsubscribe = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Newsletter.findByPk(id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    subscription.is_subscribed = false;
    subscription.status = 'unsubscribed';
    subscription.unsubscribed_at = new Date();
    await subscription.save();

    res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
