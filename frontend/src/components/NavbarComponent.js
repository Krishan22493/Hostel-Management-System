import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/iit.webp'

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/home" style={{ marginLeft: '25px', fontSize: 'x-large', display: 'flex', alignItems: 'center' }}>
        <img 
          src={logo} 
          alt="logo" 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '60%',
            fontWeight:'700',
            marginRight: '10px'  // Space between the image and text
          }}
        />
        IIT ROPAR
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ flexDirection: 'row-reverse', marginRight:'40px', fontSize:'larger' }}>
        <Nav>
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
