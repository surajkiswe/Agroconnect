import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Welcome to AgroConnect</h1>
      <p className="mb-5">A smart way to connect Farmers, Vendors, Government & Admin</p>
      <Row>
        {["Farmer", "Vendor", "Government", "Admin"].map((role) => (
          <Col key={role} md={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{role}</Card.Title>
                <Button variant="primary" onClick={() => navigate(`/${role.toLowerCase()}/login`)}>
                  Login as {role}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
