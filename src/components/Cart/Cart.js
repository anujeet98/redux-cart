import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cart = useSelector(state=>state.cart.cart);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.map(cartItem => (
          <CartItem key= {cartItem.title}
          item={{id: cartItem.id, title: cartItem.title, quantity: cartItem.quantity, total: cartItem.price * cartItem.quantity , price: cartItem.price }}
        />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
