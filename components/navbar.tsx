import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars } from 'react-icons/fa';

const TedNavbar: React.FC = () => {
  return (
    <Navbar className="fixed-top" expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/slideshow/tedx/logo-white.png"  
            alt="TEDxCITBengaluru"
            style={{ height: '40px' }}  
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar">
          <FaBars style={{ color: 'white', fontSize: '1.5rem' }} />
        </Navbar.Toggle>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src="/slideshow/tedx/logo-white.png" 
                alt="TEDxCITBengaluru"
                style={{ height: '40px' }} 
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/speakers">Speakers & Performers</Nav.Link>
              <Nav.Link href="/partners">Partners</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default TedNavbar;

