const db = require('../models'); // Correct path to models
const { Users } = db;
const bcrypt = require('bcryptjs');

// Update User
const updateUser = async (id, data) => {
  try {
    console.log("updateUser", id, data);
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(data);
    return user;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

// Delete User (Soft Delete)
const deleteUser = async (id) => {
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.is_deleted = true;
    await user.save();
    return { id, deleted: true };
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

/**
 * Get a paginated list of users
 * @param {Object} data - Data passed from the route (contains page, limit, etc.)
 */
const getUserList = async ({ page = 1, limit = 10 }) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Users.findAndCountAll({
      where: { is_deleted: false },
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt', 'uuid', 'status'],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      users: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

// Update User Status
const updateUserStatus = async (id, status) => {
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.status = status;
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error updating user status: ' + error.message);
  }
};

// Create User
const createUser = async (req, res) => {
  console.log("createUser", req.body);
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const assignRole = async (req, res) => {
  // Implement the logic to assign a role to a user
  res.send('Role assigned');
};

module.exports = {
  getUserList,
  assignRole,
  updateUser,
  deleteUser,
  createUser,
  updateUserStatus,
};

