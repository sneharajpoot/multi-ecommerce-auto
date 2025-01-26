import axios from 'axios';
import config from '../config';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
export const fetchCartItems = async (customerId) => {
  if (customerId) {
    const cartItems = await axios.get(`${config.apiBaseUrl}/cart/${customerId}`,getAuthHeaders());
    return { data: { cartItems: cartItems.data } };
  } else {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return { data: { cartItems } };
  }
};

export const fetchCartItemsDetail = async (customerId) => {
  if (customerId) {
    return await axios.get(`${config.apiBaseUrl}/cart/${customerId}/detail`,getAuthHeaders());
  } else {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return { data: { cartItems } };
  }
};

export const removeCartItem = async (itemId, customerId) => {
  if (customerId) {
    return await axios.delete(`${config.apiBaseUrl}/cart/${itemId}`,getAuthHeaders());
  } else {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return { data: { cartItems } };
  }
};

export const addCartItem = async (item, customerId) => {
  if (customerId) {
    return await axios.put(`${config.apiBaseUrl}/cart/${customerId}`, item,getAuthHeaders());
  } else {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.productId === item.productId && cartItem.variantId === item.variantId);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += item.quantity;
    } else {
      cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return { data: { cartItems } };
  }
};

export const syncCartToServer = async (customerId) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  for (const item of cartItems) {
    await axios.put(`${config.apiBaseUrl}/cart/${customerId}`, item, getAuthHeaders());
  }
  localStorage.removeItem('cartItems');
};

export const syncCart = (cart) => {
  return axios.post(`${config.apiBaseUrl}/cart/sync`, cart, getAuthHeaders());
};

export const updateCartItemQuantity = async (cartId, customerId, quantity) => {
  if (customerId) {
    return await axios.put(`${config.apiBaseUrl}/cart/${customerId}/${cartId}`, { quantity }, getAuthHeaders());
  } else {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === cartId);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { data: { cartItems } };
    } else {
      throw new Error('Item not found in cart');
    }
  }
};
