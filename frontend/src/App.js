


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import FarmerDashboard from './components/Farmer/FarmerDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import GovernmentDashboard from './components/Government/GovernmentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddScheme from './components/Government/AddScheme';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './components/slices/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ViewScheme from './components/Government/ViewScheme'; 
import EditScheme from './components/Government/EditScheme';
import AllScheme from './components/Government/AllScheme';

 import AddVendorProductsByCategory from './components/Vendor/AddVendorProductsByCategory';
import VendorProductCart from './components/Vendor/VendorProductCart';
import ViewSchemes from './components/Farmer/ViewSchemes';
import ViewProducts from './components/Farmer/ViewProducts';      

function AppContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      {/* Header Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">AgroConnect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center">
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              ) : (
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Routes */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/government/dashboard" element={<GovernmentDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/government/addscheme" element={<AddScheme />} />
          <Route path="/government/viewschemes" element={<ViewScheme />} />
          <Route path="/editscheme/:id" element={<EditScheme />} />
          <Route path="/allschemes" element={<AllScheme />} />
          <Route path='/viewschemes' element={<ViewScheme/>}/>
          
           

          <Route path="/farmer/ViewSchemes" element={<ViewSchemes />} />
          <Route path="/farmer/viewproducts" element={<ViewProducts />} />

        <Route path="/vendor/AddVendorProductsByCategory" element={<AddVendorProductsByCategory />} />

         <Route path="/vendor/VendorProductCart" element={<VendorProductCart />} />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
