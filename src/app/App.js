/**
 * React frontend for job board application. 
 */
import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from '../nav/NavBar';
import Routes from '../routes/Routes';
import AuthContext from '../auth/AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import JoblyApi from '../api';
import Loading from '../common/Loading';

const App = () => {

  // fetch token from localStorage
  const [token, setToken] = useLocalStorage('joblyToken'); 

  // user object, shared via AuthContext
  const [user, setUser] = useState(); 

  // set to true when fetching user data
  const [isLoading, setIsLoading] = useState(true);
  
  // set token and user data to null when logging out
  const history = useHistory();
  const logout = () => {
    setToken(null);
    setUser(null);
    history.push('/');
  }

  // signup for account, sets the token
  // returns success=true if successful
  // else returns object containing error messages
  const signup = async (formData) => {
    try {
      const newToken = await JoblyApi.register(formData);
      setToken(newToken);
      return { success: true };
    } catch (errs) {
      const inputTypes = ['password', 'email', 'username'];
      const errorMessages = errs.reduce((messages, msg) => {
        const errType = inputTypes.find(input => msg.includes(input));
        return { ...messages, [errType]: msg.replace('instance.', '') };
      }, {});
 
      return { success: false, errorMessages };
    }
  }

  // login to account, sets the token
  // returns success=true if successful
  // else returns object containing error messages
  const login = async (formData) => {
    try {
      const newToken = await JoblyApi.authenticate(formData);
      setToken(newToken);
      return { success: true };

    } catch (errs) {
      return { success: false, errorMessages: errs };
    }
  }

  // update user info with new data
  const updateUserInfo = (newData) => {
    setUser(oldData => ({ ...oldData, ...newData }));
  }

  // fetch user data from the api
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (token) { // load user if they have a token
          JoblyApi.token = token; // lets api call protected routes
          const { username } = jwt_decode(token);
          const userData = await JoblyApi.getUser(username);
          setUser(userData);
        }
      } catch (e) {
        console.error('App loadUser:', e);
        setUser(null);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    loadUser();
  }, [token])


  if (isLoading) return <Loading />;
  return (
    <div className="App">
      <AuthContext.Provider value={{ user, updateUserInfo }} >
        <NavBar logout={logout} />
          <main>
            <Routes login={login} signup={signup} /> 
            </main>
      
      </AuthContext.Provider>
    </div>
  );
}

export default App;
