import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../index.css';
import { Row, Col } from 'react-bootstrap';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  function MouseOver(event) {
    event.target.style.color = 'black';
    
  }
  function MouseOut(event){
    event.target.style.color="#494848";
  }

  function changeBackground(e) {
    e.target.style.background = '#121212';
  }

  function returnBackground(e) {
    e.target.style.background = 'black';
  }

  return (
    <Container className="small-container" >
      <Helmet>
        <title >Connexion</title>
      </Helmet>
      <h1 className='h1'  >Connexion</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group  className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button onMouseOver={changeBackground} onMouseOut={returnBackground}  className='btn1' type="submit">Connexion</Button>
        </div>
        <Row className="py-3 d-block">
        <Col className='center'>
          Besoin d'aide ?{' '}
          <Link onMouseOver={MouseOver} onMouseOut={MouseOut} className='link' to={`/forgotpassword?redirect=${redirect}`}>
            Mot de passe oublié
          </Link>
        </Col>
        <Col className='center'>
          Nouveau client ?{' '}
          <Link onMouseOver={MouseOver} onMouseOut={MouseOut} className='signuplink' to={`/signup?redirect=${redirect}`}>
            S'inscrire
          </Link>
        </Col>
      </Row>
        
      </Form>
    </Container>
  );
}