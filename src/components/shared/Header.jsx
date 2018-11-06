import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={Link} to="/account/login">Log In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register">Register</NavLink>
    </NavItem>
  </Nav>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderGreeting(name) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <span className="nav-link">Welcome, {name}
            | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
          </span>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { isLoggedIn, firstName } = this.props.authentication;
    return (
      <header className="wrapper">
        <Navbar color="faed" light expand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">Tech&Fly</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/reservations">Reservaciones</NavLink>
              </NavItem>
            </Nav>
            { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() }
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
