import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Modal } from 'react-bootstrap';
import { fetchProductById } from '../api/productApi'; // Correct the import for fetchProductById
import './ProductPage.css'; // Import the CSS file for styling
import config from '../config';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(productId);
        const productData = response.data.product;
        const productAttributes = response.data.productAttributes;
        const productMetadata = response.data.productMetadata;
        const productImages = response.data.productImage;
        const productTags = response.data.productTag;
        const productVariants = response.data.productVariants;

        setProduct({
          ...productData,
          attributes: productAttributes,
          metadata: productMetadata,
          images: productImages,
          tags: productTags,
          variants: productVariants,
        });

        // Set the primary image as the selected image
        const primaryImage = productImages.find(img => img.is_primary) || productImages[0];
        setSelectedImage(primaryImage?.url || "https://placehold.jp/600x400");
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleZoomClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={selectedImage ? config.imgBaseUrl + selectedImage : "https://placehold.jp/600x400"} className="large-image" />
            <div className="zoom-icon" onClick={handleZoomClick}>🔍</div> {/* Zoom icon */}
          </Card>
          <div className="image-thumbnails">
            {product.images.map(img => (
              <Image
                key={img.id}
                src={img.url ? config.imgBaseUrl + img.url : "https://placehold.jp/80x80"}
                thumbnail
                className="small-image"
                onClick={() => handleImageClick(img.url)}
              />
            ))}
          </div>
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <h4>Attributes:</h4>
          <ul>
            {product.attributes.map(attr => (
              <li key={attr.id}>{attr.attributeName}: {attr.attributeValue}</li>
            ))}
          </ul>
          <h4>Metadata:</h4>
          <ul>
            {product.metadata.map(meta => (
              <li key={meta.id}>{meta.key}: {meta.value}</li>
            ))}
          </ul>
          <h4>Tags:</h4>
          <ul>
            {product.tags.map(tag => (
              <li key={tag.id}>{tag.tag}</li>
            ))}
          </ul>
          <h4>Variants:</h4>
          <ul>
            {product.variants.map(variant => (
              <li key={variant.id}>{variant.name} - ${variant.price} (Stock: {variant.stock})</li>
            ))}
          </ul>
        </Col>
      </Row>

      {/* Modal for zoomed image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <Image src={selectedImage ? config.imgBaseUrl + selectedImage : "https://placehold.jp/600x400"} fluid />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductPage;
