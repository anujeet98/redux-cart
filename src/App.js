import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { uiSliceActions } from './Store/uiSlice';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart.cart);
  const notification = useSelector(state => state.ui.notification);
  let isInitial = true;
  console.log(isInitial)
  useEffect(()=>{
    console.log(isInitial)
    if(isInitial){
      isInitial=false;  
      console.log(isInitial)
      return;
    }
    (async()=>{
      try{
        const res = await fetch('https://expense-tracker-6d78c-default-rtdb.firebaseio.com/reduxcart.json',{
          method: 'PUT',
          body: JSON.stringify(cart),
        });
        const resData = await res.json();
        if(!res.ok){
          throw new Error(resData);
        }

        dispatch(uiSliceActions.showNotification({title: 'Success!', status: 'success', message: 'Sent cart data successfully!'}));
      }
      catch(err){
        dispatch(uiSliceActions.showNotification({title: 'Error!', status: 'error', message: 'Sending cart data failed!'}));
      }
    })()
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
