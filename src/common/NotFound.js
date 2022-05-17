/**
 * Not found page
 * 
 * Renders when user accesses a forbidden or invalid route.
 * If not logged in, will display buttons prompting to log in or sign up.
 * If logged in, will display not found message and link directing back to the
 * homepage. 
 */
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import './NotFound.css';
import '../homepage/Home.css';
import AuthContext from '../auth/AuthContext';

const NotFound = ({ message }) => {

  const { user } = useContext(AuthContext);
  const history = useHistory();

  if (user) {
    return (
      <div className="NotFound">
        <h1>Sorry, this page isn't available.</h1>
        <p>
          {message ? message
          : 'The link you followed may be broken, or the page may have been removed. '} 
        </p>
        <p>
          <Link to="/" >Go back to Jobly.</Link>
        </p>
      </div>
    );
  } 

  return (
    <div className="NotFound">
    <h1>Login or create an account:</h1>
    <div className="Home-buttons">
        <Button onClick={() => history.push('/login')}>Log in</Button>
        <Button onClick={() => history.push('/signup')}>Sign up</Button>
    </div>
  </div>
  )
 
};

export default NotFound;