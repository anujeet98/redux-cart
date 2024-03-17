import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiSliceActions } from '../../Store/uiSlice';

const CartButton = (props) => {
  const Qty = useSelector(state=>state.cart.cart.length);
  const dispatch = useDispatch();
  return (
    <button className={classes.button} onClick={()=>{dispatch(uiSliceActions.toggleCart())}}>
      <span>My Cart</span>
      <span className={classes.badge}>{Qty}</span>
    </button>
  );
};

export default CartButton;
