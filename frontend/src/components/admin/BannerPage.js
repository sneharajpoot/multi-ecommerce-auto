import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Image } from 'react-bootstrap';
import { fetchBanners, createBanner, updateBanner, deleteBanner } from '../../api/bannerApi'; // Import the banner API functions
import { showErrorMessage, showSuccessMessage } from '../../utils/toastUtils'; // Import toast functions
import config from '../../config';

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link_url: '',
    is_active: true,
    start_date: '',
    end_date: ''
  });
  const [editingBanner, setEditingBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const fetchBannerData = async () => {
    try {
      const response = await fetchBanners();
      setBanners(response.data);
    } catch (error) {
      showErrorMessage('Error fetching banners');
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bannerData = new FormData();
      bannerData.append('title', formData.title);
      bannerData.append('description', formData.description);
      bannerData.append('link_url', formData.link_url);
      bannerData.append('is_active', formData.is_active);
      bannerData.append('start_date', formData.start_date);
      bannerData.append('end_date', formData.end_date);
      if (imageFile) {
        bannerData.append('image', imageFile);
      }

      if (editingBanner) {
        await updateBanner(editingBanner.id, bannerData);
        showSuccessMessage('Banner updated successfully');
      } else {
        await createBanner(bannerData);
        showSuccessMessage('Banner created successfully');
      }
      setFormData({ title: '', description: '', imageUrl: '', link_url: '', is_active: true, start_date: '', end_date: '' });
      setEditingBanner(null);
      setShowModal(false);
      fetchBannerData();
    } catch (error) {
      showErrorMessage('Error saving banner');
      console.error('Error saving banner:', error);
    }
  };

  const handleEdit = (banner) => {
    setFormData({
      title: banner.title,
      description: banner.description,
      imageUrl: banner.imageUrl,
      link_url: banner.link_url,
      is_active: banner.is_active,
      start_date: banner.start_date ? banner.start_date.split('T')[0] : '',
      end_date: banner.end_date ? banner.end_date.split('T')[0] : ''
    });
    setEditingBanner(banner);
    setShowModal(true);
  };

  const handleDelete = async (bannerId) => {
    try {
      await deleteBanner(bannerId);
      showSuccessMessage('Banner deleted successfully');
      fetchBannerData();
    } catch (error) {
      showErrorMessage('Error deleting banner');
      console.error('Error deleting banner:', error);
    }
  };

  const handleShowModal = () => {
    setFormData({ title: '', description: '', imageUrl: '', link_url: '', is_active: true, start_date: '', end_date: '' });
    setEditingBanner(null);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <Container className="mt-5">
      <h1>Banners</h1>
      <Button variant="primary" onClick={handleShowModal} className="mb-3">Add Banner</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Link</th>
            <th>Active</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(banner => (
            <tr key={banner.id}>
              <td>{banner.title}</td>
              <td>{banner.description}</td>
              <td><img src={ config.imgBaseUrl + banner.image_url+'?imageType=banner' } alt={banner.title} style={{ width: '100px' }} /></td>
              <td>{banner.link_url}</td>
              <td>{banner.is_active ? 'Yes' : 'No'}</td>
              <td>{formatDate(banner.start_date)}</td>
              <td>{formatDate(banner.end_date)}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(banner)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(banner.id)} className="ml-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingBanner ? 'Edit Banner' : 'Add Banner'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange} 
              />
            </Form.Group>
            {editingBanner && (
              <Form.Group>
                <Form.Label>Current Image</Form.Label>
                <Image src={editingBanner.imageUrl} alt={editingBanner.title} fluid />
              </Form.Group>
            )}
            <Form.Group controlId="formImageFile">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group controlId="formlinkUrl">
              <Form.Label>Link URL</Form.Label>
              <Form.Control
                type="text"
                name="link_url"
                value={formData.link_url}
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group controlId="formIsActive">
              <Form.Check
                type="checkbox"
                name="is_active"
                label="Active"
                checked={formData.is_active}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formstart_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group controlId="formend_date">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange} 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editingBanner ? 'Update Banner' : 'Create Banner'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BannerPage;
