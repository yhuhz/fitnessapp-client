import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="py-0" style={{ backgroundColor: '#f9b464' }}>
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="navbar-brand-title fw-bold"
          style={{ fontSize: '25px' }}
        >
          FitCheck
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar">
          <Nav className="ms-auto">
            {user.id !== null ? (
              <>
                <Nav.Link as={NavLink} to="/logout" className="navbar-link">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/" className="navbar-link">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="navbar-link">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="navbar-link">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
