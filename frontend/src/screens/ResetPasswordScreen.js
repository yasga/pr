import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { React, useState, useReducer  } from 'react';
import '../index.css';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const reducer = (state, action) => {
  switch (action.type) {
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

export default function ResetPasswordScreen() {

  const [{ loading, message ,error}, dispatch] =
  useReducer(reducer, {
    loading: false,
    error: '',

  });
 
  const params = useParams(); 
  const { token } = params;
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)

  //const { state } = useContext(Store);
  //const { userInfo } = state; 

  const submitHandler = async (e) => {
    e.preventDefault();

     dispatch({ type: 'USER_RESET_PASSWORD_REQUEST' });
    try {
      if (password !== confirmPassword) {
        setPasswordErrorMessage('Les mots de passe ne sont pas indentiques');
        dispatch({
          type: 'USER_RESET_PASSWORD_FAIL',
          payload: getError(error),
        });
      }
      else {
      console.log(token);
      setPasswordErrorMessage(null)
      const { data } = await Axios.patch(`/api/users/resetpassword/${token}`, { password },);
      dispatch({ type: 'USER_RESET_PASSWORD_SUCCESS', payload: data });
      
    }
      } catch (err) {
      dispatch({
        type: 'USER_RESET_PASSWORD_FAIL',
        payload: getError(err),
      });     
    }
  };

  function changeBackground(e) {
    e.target.style.background = '#121212';
  }

  function returnBackground(e) {
    e.target.style.background = 'black';
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Réinitialiser le mot de passe</title>
      </Helmet>
      <h1 className="h1">Réinitialiser le mot de passe</h1>

      {passwordErrorMessage && (
        <MessageBox variant="danger">{passwordErrorMessage}</MessageBox>
      )}
      {message && <MessageBox variant="success">{message}</MessageBox>}
      {message && <Link to="/signin">Se connecter</Link>}
      {error && <MessageBox variant="danger">error</MessageBox>}
      {loading && <LoadingBox />}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Nouveau mot de passe</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Comfirmer votre nouveau mot de passe</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button onMouseOver={changeBackground} onMouseOut={returnBackground}  className='btn1' type="submit">Enregistrer</Button>
        </div>
      </Form>
    </Container>
  );
}
