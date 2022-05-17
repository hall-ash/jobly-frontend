/**
 * Routes for the application.
 * 
 * Accessible routes when logged in:
 * - /profile
 * - /companies/:handle
 * - /companies
 * - /jobs
 * - / (home)
 * 
 * Accessible routes when not logged in:
 * - /login
 * - /signup
 * - / (home)
 */
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import CompanyDetail from '../companies/CompanyDetail';
import Home from '../homepage/Home';
import NotFound from '../common/NotFound';
import AuthContext from '../auth/AuthContext';
import CompaniesPage from '../companies/CompaniesPage';
import JobsPage from '../jobs/JobsPage';
import FormProfile from '../profile/FormProfile';
import FormLogin from '../auth/FormLogin';
import FormSignUp from '../auth/FormSignUp';

const Routes = ({ updateUserInfo, login, signup }) => {

  const { user } = useContext(AuthContext);

  const homeRoute = <Route exact path="/"><Home /></Route>;
  const notFoundRoute = <Route><NotFound /></Route>;

  return user ? (
    <Switch>
      <Route exact path="/profile" >
        <FormProfile updateUserInfo={updateUserInfo} /> 
      </Route>
      <Route exact path="/companies/:handle" >
        <CompanyDetail /> 
      </Route>
      <Route exact path="/companies" >
        <CompaniesPage /> 
      </Route>
      <Route exact path="/jobs" >
        <JobsPage /> 
      </Route>
      {homeRoute}
      {notFoundRoute}
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/signup" >
        <FormSignUp signup={signup} /> 
      </Route>
      <Route exact path="/login" >
        <FormLogin login={login} /> 
      </Route> 
      {homeRoute}
      {notFoundRoute}
    </Switch>
  );
}

export default Routes;