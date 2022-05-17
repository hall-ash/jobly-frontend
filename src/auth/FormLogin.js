/**
 * Login form
 * 
 * Logs the user in and redirects to the homepage
 */
import React, { useState } from 'react';
import { Form, Button, Label, FormGroup, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './FormBase.css';

const FormLogin = ({ login }) => {

  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  // update data in form when input changes
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(old => ({ ...old, [name]: value }));
  }

  // login user and redirect to homepage
  // if error display error message next to inputs
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const loginStatus = await login(formData);
    if (loginStatus.success) history.push('/');
    else setErrorMsg(loginStatus.erorMessages);
  }


  return (
    <Form onSubmit={handleSubmit} className="FormBase col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="FormBase-title mb-4">Login</div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <FormGroup >
        <Label>Username</Label>
        <Input required
               id="username"
               name="username"
               type="text"
               onChange={handleChange}
               />
      </FormGroup>
      <FormGroup >
        <Label>Password</Label>
        <Input required
               id="password"
               name="password"
               type="password"
               onChange={handleChange}
               />
      </FormGroup>
      <Button>login</Button>
    </Form>
  );
};

export default FormLogin;