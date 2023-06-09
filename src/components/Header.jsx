import React from "react";
import { Navbar, Container, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function Header () {
    return (
        <>
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect >
      <Container>
        <LinkContainer to='/home'>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className="fa fa-shopping-cart"></i>
                &nbsp;Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signin'>
              <Nav.Link>
                <i className="fa fa-user"></i>
                &nbsp;Signin</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    )
}
export default Header;
