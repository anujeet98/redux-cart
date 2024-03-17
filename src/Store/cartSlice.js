import { createSlice } from "@reduxjs/toolkit";
import { uiSliceActions } from "./uiSlice";

const initialState = {cart: []};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, action){
            let isItemAvailable = false;
            state.cart.forEach(item => {
                if(item.id === action.payload.id){
                    item.quantity++;
                    isItemAvailable = true;
                }
            });
            if(!isItemAvailable)
                state.cart.push({...action.payload, quantity:1});
        },
        removeFromCart(state, action){
            state.cart = state.cart.map(item => {
                if(item.id === action.payload){
                    item.quantity--;;
                }
                return item;
            }).filter(item=>item.quantity!==0);
        },
        updateCart(state, action){
            state.cart = action.payload;
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        //can do asyn/effect code here
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
          })();

    };
}

export const getCartData = () => {
    return (dispatch) => {
        (async()=>{
            try{
                const res = await fetch('https://expense-tracker-6d78c-default-rtdb.firebaseio.com/reduxcart.json');
                const resData = await res.json();
                if(!res.ok){
                    throw new Error(resData);  
                }
                dispatch(cartSliceActions.updateCart(resData));
                dispatch(uiSliceActions.showNotification({title: 'Success!', status: 'success', message: 'Cart data fetched successfully!'}));
            }
            catch(err){
                dispatch(uiSliceActions.showNotification({title: 'Error!', status: 'error', message: 'Fetching cart data failed!'}));
            }
        })()
    }
}

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;