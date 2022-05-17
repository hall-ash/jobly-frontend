/**
 * Sign up form
 * 
 * Registers the user for an account and redirects to the homepage
 */
import React, { useState } from 'react';
import { Form, Button, Label, FormGroup, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './FormBase.css';

const FormSignUp = ({ signup }) => {

  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  const history = useHistory();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(old => ({ ...old, [name]: value }));
  }

   // create a user account and redirect to homepage
  // if error display error message next to inputs
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const signupStatus = await signup(formData);
    if (signupStatus.success) history.push('/');
    else setErrorMsg(signupStatus.errorMessages);
  }


  return (
    <Form onSubmit={handleSubmit} className="FormBase col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="FormBase-title mb-4">Sign Up</div>
      <FormGroup >
        <Label>Username</Label>
        <Input required
               id="username"
               name="username"
               type="text"
               onChange={handleChange}
               />
        {errorMsg['username'] && <p className="error-msg">{errorMsg['username']}</p>}
      </FormGroup>
      <FormGroup >
        <Label>Password</Label>
        <Input required
               id="password"
               name="password"
               type="password"
               onChange={handleChange}
               />
        {errorMsg['password'] && <p className="error-msg">{errorMsg['password']}</p>}
      </FormGroup>
      <FormGroup >
        <Label>First Name</Label>
        <Input required
               id="firstName"
               name="firstName"
               type="text"
               onChange={handleChange}
               />
      </FormGroup>
      <FormGroup >
        <Label>Last Name</Label>
        <Input required
               id="lastName"
               name="lastName"
               type="text"
               onChange={handleChange}
               />
      </FormGroup>
      <FormGroup >
        <Label>Email</Label>
        <Input required
               id="email"
               name="email"
               type="email"
               onChange={handleChange}
               />
        {errorMsg['email'] && <p className="error-msg">{errorMsg['email']}</p>}
      </FormGroup>
      <Button>sign up</Button>
    </Form>
  );
};

export default FormSignUp;