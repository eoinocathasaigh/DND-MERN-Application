import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/"><b>Home</b></Nav.Link>
              <Nav.Link href="/Characters"><u>Character Creation</u></Nav.Link>
              <Nav.Link href="/Sessions"><u>Session Tracker</u></Nav.Link>
              <Nav.Link href="/Combat"><u>Combat Tracker</u></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
  );
};

export default NavigationBar;