import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Désolé. Le produit est en rupture de stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  function changeBackground(e) {
    e.target.style.color = '#121212';
  }

  function returnBackground(e) {
    e.target.style.color = '#494848';
  }
  function MouseOver(event) {
    event.target.style.background = 'black';
  }
  function MouseOut(event){
    event.target.style.background="#121212";
  }

  return (
    <div>
      <Helmet>
        <title>Panier</title>
      </Helmet>
      <br></br><br></br>
      <h1 className='title'>Résumé De L'article( {cartItems.reduce((a, c) => a + c.quantity, 0)}{' '})</h1>
      <br></br><br></br>
      <Col md={8}>
      <ListGroup horizontal>
       
      <Col className='a' md={4}>Articles(s)</Col>
      <Col className='a' md={3}>Quantité(s)</Col>
      <Col className='a' md={3}>Prix</Col>
      <Col className='a' md={2}>Effacer</Col>
     
      </ListGroup>
      </Col>
      <br></br>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Le panier est vide. <Link className="link1" onMouseOver={changeBackground} onMouseOut={returnBackground}  to="/">Aller faire les courses</Link>
            </MessageBox>
          ) : (
            

            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                        
                      ></img>{' '}
                      
                      <Link  to={`/product/${item.slug}`} className="link1" onMouseOver={changeBackground} onMouseOut={returnBackground} >{item.name}</Link>
                      
                    </Col>
                    
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3} className="p">{item.price}DH</Col>
                    <Col md={2}>
                      <Button className='b'
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className='f1'>Résumé De Votre Commande</div><br></br>
                  <div className='f2'>
                   Subtotal: 
                   <span className='f3' >  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} DH </span> 
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                    onMouseOver={MouseOver} onMouseOut={MouseOut}
                    className='btn'
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Payer
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}