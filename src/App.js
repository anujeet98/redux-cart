import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect, useState } from 'react';
import Notification from './components/UI/Notification';

function App() {
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart.cart);
  const [isNotification, setIsNotification] = useState(null);
 
  useEffect(()=>{
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

        setIsNotification({title: 'Success!', status: 'success', message: 'Sent cart data successfully!'})
      }
      catch(err){
        setIsNotification({title: 'Error!', status: 'error', message: 'Sending cart data failed!'});
      }
    })()
  },[cart]);

  setTimeout(()=>{
    setIsNotification(null);
  },3000);

  return (
    <Fragment>
      { isNotification && <Notification title={isNotification.title} status={isNotification.status} message={isNotification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
