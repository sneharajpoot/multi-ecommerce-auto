import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the CSS file for Footer

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/return-policy">Return Policy</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Newsletter</h5>
            <Form>
              <Form.Group controlId="formNewsletter">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Subscribe
              </Button> 
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2023 E-commerce Site. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
