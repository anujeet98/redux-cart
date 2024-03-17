import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { getCartData, sendCartData } from './Store/cartSlice';

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart.cart);
  const notification = useSelector(state => state.ui.notification);
  useEffect(()=>{
    if(isInitial){
      dispatch(getCartData());
      isInitial=false;  
      return;
    }
    dispatch(sendCartData(cart));
  },[cart, dispatch]);

  // setTimeout(()=>{
  //   dispatch(uiSliceActions.null);
  // },3000);

  return (
    <Fragment>
      { notification && <Notification title={notification.title} status={notification.status} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
