import React, { useState, useEffect, } from "react";
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import useAuthsStore from '../../store/Auth';
import { authType } from '../../store/types';

const Register = () => {
  const { authStatus, authError, signUpWithEmail, } = useAuthsStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const onSubmit = () => {
    if (!email) {
      setErrorText('Please enter an email')
    } else if (!password) {
      setErrorText('Please enter a password')
    } else if (password !== retypePassword) {
      setErrorText('The password and re-typed password is not the same')
    } else {
      setErrorText('');
      signUpWithEmail({
        email,
        password,
      })
    }
  }

  useEffect(() => {
    if (authStatus === authType.SIGNUP_FAIL) {
      setErrorText(authError)
    }
  }, [authStatus]);

  return (
    <div className="main-container">
      <div className="form-container">
        <Card >
          <Card.Header>
            <Card.Title ><h1>Register</h1></Card.Title>
          </Card.Header>
          <Card.Body>
            <Form className="mb-10" >
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" security="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Re-type Password</Form.Label>
                <Form.Control type="password" security="" placeholder="Re-type Password" onChange={(e) => setRetypePassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" size="lg" type="submit" onClick={(e) => {
                e.stopPropagation();
                onSubmit();
              }}>
                Submit
              </Button>
            </Form>
            {
              !errorText ? null :
              <Alert key={'danger'} variant={'danger'} className="mt-2" >
                {errorText}
              </Alert>
            }
          </Card.Body>
          <Card.Footer>
            <Card.Text>Already have an account?
              <Link className="m-1" to={'/login'} >Login</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default Register;
