import React from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import {
  withRouter,
} from 'react-router-dom';
import {RouterLink} from '../helpers';
let ChatNav = ({location, isAuthenticated, logout, history}) => {
  return (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <RouterLink to="/" className="navbar-brand">Home</RouterLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/topics">Topic</RouterLink>
        {isAuthenticated ? null : <RouterLink to="/login">Login</RouterLink>}
        {isAuthenticated ? <NavItem onClick={logout.bind(this, history)}>Logout</NavItem> : null}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
}
export default ChatNav = withRouter(ChatNav);
