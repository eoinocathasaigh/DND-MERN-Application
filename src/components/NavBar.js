import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
        <Navbar bg="red" data-bs-theme="red" color='red'>
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Characters">Character Creation</Nav.Link>
              <Nav.Link href="/Sessions">Session Tracker</Nav.Link>
              <Nav.Link href="/Combat">Combat Tracker</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
  );
};

export default NavigationBar;