import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import {  useState, useReducer } from 'react';
//import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_FORGOT_PASSWORD_REQUEST':
      return { loading: true };
  
    case 'USER_FORGOT_PASSWORD_SUCCESS':
      return { loading: false, message: action.payload.message };
        
    case 'USER_FORGOT_PASSWORD_FAIL':
      return { loading: false, error: action.payload };
        
    case 'USER_RESET_PASSWORD_REQUEST':
      return { loading: true };
  
    case 'USER_RESET_PASSWORD_SUCCESS':
      return { loading: false, message: action.payload.message };
  
    case 'USER_RESET_PASSWORD_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ForgotPasswordScreen() {

  const [{ loading, message ,error}, dispatch] =
  useReducer(reducer, {
    loading: false,
    error: '',
  });
 
  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'USER_FORGOT_PASSWORD_REQUEST' });
    try {
      const { data } = await Axios.post('/api/users/forgotpassword', {email});

    
      dispatch({ type: 'USER_FORGOT_PASSWORD_SUCCESS', payload: data });
    } catch (err) {
      dispatch({
        type: 'USER_FORGOT_PASSWORD_FAIL',
        payload: getError(error),
      });
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Assistance du mot de passe</title>
      </Helmet>
      <h1 className="my-3">Assistance du mot de passe</h1>
      <p>Saisissez l'adresse e-mail associée à votre compte.</p>

      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {message && <MessageBox variant="success">{message}</MessageBox>}
      {loading && <LoadingBox />}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Continuer</Button>
        </div>     
      </Form>
    </Container>
  );
}
