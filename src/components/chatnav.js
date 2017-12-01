import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import {
  withRouter,
} from 'react-router-dom';
import {RouterLink} from '../helpers';
import ChatLogin from './chatLogin';
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
        {isAuthenticated ? (
        <Nav pullRight>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/topics">Topic</RouterLink>
        {isAuthenticated ? <NavItem onClick={logout.bind(this, history)}>Logout</NavItem> : null}
        </Nav>
        ) :
        (
        <ChatLogin />
        )

      }
    </Navbar.Collapse>
  </Navbar>
)
}
export default ChatNav = withRouter(ChatNav);

