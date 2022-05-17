/**
 * Displays the navbar. 
 * If user is logged in displays links to jobs, companies, profile pages. 
 * If not logged in, displays links to the sign up and login forms.
 */
import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'reactstrap';
import NavItemsLoggedIn from './NavItemsLoggedIn';
import NavItemsLoggedOut from './NavItemsLoggedOut';
import './NavBar.css';

const NavBar = ({ logout }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="NavBar mb-4">
       <Navbar color="light" expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ms-auto" navbar>
          {user ? <NavItemsLoggedIn logout={logout} /> 
            : <NavItemsLoggedOut /> }
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;