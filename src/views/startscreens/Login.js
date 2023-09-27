import React, { useEffect, useState } from "react";
import { Link, useNavigate, } from 'react-router-dom';
import {
  Card,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import useAuthsStore from '../../store/Auth';
import { authType } from '../../store/types';

const Login = () => {
  const navigate = useNavigate();
  const { authStatus, authUser, authError, signInWithEmail, } = useAuthsStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const onSubmit = () => {
    if (!email) {
      setErrorText('Please enter an email')
    } else if (!password) {
      setErrorText('Please enter a password')
    } else {
      setErrorText('');
      signInWithEmail({
        email,
        password,
      })
    }
  }

  useEffect(() => {
    if (authUser) {
      navigate('/')
    }
  }, [authUser]);

  useEffect(() => {
    if (authStatus === authType.SIGNIN_FAIL) {
      setErrorText(authError)
    }
  }, [authStatus]);

  return (
    <div className="main-container">
      <div className="form-container">
        <Card >
          <Card.Header>
            <Card.Title ><h1>Login</h1></Card.Title>
          </Card.Header>
          <Card.Body>
            <Form className="mb-10" onSubmit={() => onSubmit()}>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" security="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
            <Card.Text>Don't have an account?
              <Link className="m-1" to={'/register'} >Register</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default Login;
