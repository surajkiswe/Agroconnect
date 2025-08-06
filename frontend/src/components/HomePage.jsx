import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
  const roles = [
    { title: 'Farmer', description: 'Access schemes, sell crops, and get support.' },
    { title: 'Vendor', description: 'List products, manage inventory, and support farmers.' },
    { title: 'Government', description: 'Publish schemes and monitor agricultural initiatives.' },
    { title: 'Admin', description: 'Manage platform users and system configuration.' }
  ];

  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '50px',
        paddingBottom: '50px',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '40px 0' }}>
        <Container>
          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome to AgroConnect</h2>
            <p className="text-muted">Connecting Farmers, Vendors, Government, and Admins on one platform.</p>
          </div>

          <Row className="justify-content-center">
            {roles.map((role, idx) => (
              <Col key={idx} md={3} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{role.title}</Card.Title>
                    <Card.Text>{role.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
