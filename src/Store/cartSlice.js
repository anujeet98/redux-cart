import { createSlice } from "@reduxjs/toolkit";

const initialState = {showCart: false, cart: []};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        toggleCart(state){
            state.showCart = !state.showCart;
        },
        addToCart(state, action){
            let isItemAvailable = false;
            state.cart.forEach(item => {
                if(item.title === action.payload.title){
                    item.quantity++;
                    isItemAvailable = true;
                }
            });
            if(!isItemAvailable)
                state.cart.push({...action.payload, quantity:1});
        },
        removeFromCart(state, action){
            state.cart = state.cart.map(item => {
                if(item.title === action.payload){
                    item.quantity--;;
                }
                return item;
            }).filter(item=>item.quantity!==0);
        }
    }
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;