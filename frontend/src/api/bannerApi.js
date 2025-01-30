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

export const fetchBanners = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/banners`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

export const createBanner = async (bannerData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/banners`, bannerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders().headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

export const updateBanner = async (bannerId, bannerData) => {
  try {
    const response = await axios.put(`${config.apiBaseUrl}/banners/${bannerId}`, bannerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders().headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
};

export const deleteBanner = async (bannerId) => {
  try {
    const response = await axios.delete(`${config.apiBaseUrl}/banners/${bannerId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
};

export const uploadBannerImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axios.post(`${config.apiBaseUrl}/banners/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders().headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
