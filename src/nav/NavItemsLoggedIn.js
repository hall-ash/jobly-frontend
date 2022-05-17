/**
 * Nav items displayed when the user is logged in.
 */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';
import AuthContext from '../auth/AuthContext';

const NavItemsLoggedIn = ({ logout }) => {

  const { user } = useContext(AuthContext);

  return (
    <React.Fragment >
      <NavItem >
        <NavLink exact to={`/companies`}>Companies</NavLink>
      </NavItem> 
      <NavItem >
        <NavLink exact to={`/jobs`}>Jobs</NavLink>
      </NavItem> 
      <NavItem >
        <NavLink exact to={`/profile`}>{user.username}</NavLink>
      </NavItem> 
      <NavItem>
        <Button className="logout-btn" color="light" onClick={logout}>Log out</Button>
      </NavItem>
    </React.Fragment> 
  );
}

export default NavItemsLoggedIn;