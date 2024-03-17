import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;