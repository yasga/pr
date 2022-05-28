import { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ImgB from '../components/ImgB';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {  useState } from 'react';
import { getError } from '../utils';
import Axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const reducer2 = (state, action) => {
  switch (action.type) {
    case 'USER_FORGOT_PASSWORD_REQUEST':
      return { loading2: true };
  
    case 'USER_FORGOT_PASSWORD_SUCCESS':
      return { loading2: false, message2: action.payload.message };
        
    case 'USER_FORGOT_PASSWORD_FAIL':
      return { loading2: false, error2: action.payload };
        
    case 'USER_RESET_PASSWORD_REQUEST':
      return { loading2: true };
  
    case 'USER_RESET_PASSWORD_SUCCESS':
      return { loading2: false, message2: action.payload.message };
  
    case 'USER_RESET_PASSWORD_FAIL':
      return { loading2: false, error2: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products}, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: false,
    error: '',
  });
  const [{ loading2, message2 ,error2}, dispatch2] =
  useReducer(reducer2, {
    loading2: false,
    error2: '',
  });
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const [email2, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch2({ type: 'USER_FORGOT_PASSWORD_REQUEST' });
    try {
      const { data } = await Axios.post('/api/users/mailclient', {email2});

      dispatch2({ type: 'USER_FORGOT_PASSWORD_SUCCESS', payload: data });
    } catch (err) {
      dispatch2({
        type: 'USER_FORGOT_PASSWORD_FAIL',
        payload: getError(error),
      });
    }
  };
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await Axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);


  function changeBackground(e) {
    e.target.style.background = '#121212';
  }

  function returnBackground(e) {
    e.target.style.background = 'black';
  }

  return (
    <div>
      <Helmet>
        <title>JayShop</title>
      </Helmet>
      <ImgB/>
      <ToastContainer className="p-3" position='middle-center' >
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Recevoir le catalogue de la collection de l'été 2022 🎊🎊🎊</strong>
            <small >à l'instant</small>
          </Toast.Header>
          <Toast.Body><Form onSubmit={submitHandler}>
          {error2 && <MessageBox variant="danger">{error2}</MessageBox>}
          {message2 && <MessageBox variant="success">{message2}</MessageBox>}
          {loading2 && <LoadingBox />}
        <Form.Group className="mb-3" controlId="email2">
          <Form.Label>Email 😄</Form.Label>
          <Form.Control
            type="email"
            name="email2"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button onMouseOver={changeBackground} onMouseOut={returnBackground}  className='btn11' type="submit">Continuer🚀</Button>
        </div>     
      </Form></Toast.Body>
        </Toast>
        </ToastContainer>
      <h1 className="titreProducts">Produits populaires</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
