/**
 * Displays the profile page for the user.
 * 
 * Autofills the user's first name, last name, and email.
 * Allows user to change first/last name and email on
 * input of valid password.
 * Displays error messages next to input if invalid input entered.
 */
import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Label, FormGroup, Input } from 'reactstrap';
import AuthContext from '../auth/AuthContext';
import './FormProfile.css';
import JoblyApi from '../api';

const FormProfile = () => {

  const { user: { username, firstName, lastName, email }, updateUserInfo } = useContext(AuthContext);
  const [formData, setFormData] = useState({ firstName, lastName, email, password: '' });
  const [errorMsg, setErrorMsg] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(old => ({ ...old, [name]: value }));
  }

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();

      const { firstName, lastName, email, password } = formData;
      // validate password
      await JoblyApi.authenticate({ username, password} );

      // if valid password, update user
      const newData = await JoblyApi.updateUser(username, 
                            { firstName, lastName, email });
      
      // update the application's state
      updateUserInfo(newData);

      setErrorMsg({}); // clear error messages
      setSuccess(true); // successful submission = true
    } catch(errs) {

      const inputTypes = ['password', 'email'];
      // create obj that maps input to error message
      const errorMessages = errs.reduce((messages, msg) => {
        const errType = inputTypes.find(input => msg.includes(input));
        return { ...messages, [errType]: msg.replace('instance.', '') };
      }, {});
 
      setErrorMsg(errorMessages); // display msgs in form
    }
 
    setFormData(old => ({ ...old, password: '' })); // clear user password
  }

  // clears success message after 1 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <Form onSubmit={handleSubmit} className="FormProfile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="FormProfile-title mb-4">{username}</div>
      <FormGroup >
        <Label>First Name</Label>
        <Input 
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={formData.firstName}
                />
      </FormGroup>
      <FormGroup >
        <Label>Last Name</Label>
        <Input 
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={formData.lastName}
                />
      </FormGroup>
      <FormGroup >
        <Label>Email</Label>
        <Input 
       
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                />
        {errorMsg['email'] && <p className="error-msg">{errorMsg['email']}</p>}
      </FormGroup>
      <FormGroup >
        <Label>Confirm password to make changes:</Label>
        <Input required
      
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                />
        {errorMsg['password'] && <p className="error-msg">{errorMsg['password']}</p>}
      </FormGroup>
      <Button>update</Button>
      {success && <p className="FormProfile-success-msg">Your changes have been saved.</p>}
    </Form> 
  );
};

export default FormProfile;