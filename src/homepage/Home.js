/**
 * Displays the homepage.
 * 
 * If logged in, displays a welcome message.
 * If not logged in displays buttons to sign up or login.
 */
import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const goToLoginForm = evt => {
    history.push('/login');
  }

  const goToSignUpForm = evt => {
    history.push('/signup');
  }

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs in one convenient place.</p>
      {user ? <p>Welcome, {user.username}!</p> :
      <div className="Home-buttons">
        <Button onClick={goToLoginForm}>Log in</Button>
        <Button onClick={goToSignUpForm}>Sign up</Button>
      </div>}
    </div> 
  );
}

export default Home;