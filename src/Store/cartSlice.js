import { createSlice } from "@reduxjs/toolkit";

const initialState = {showCart: false};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        toggleCart(state){
            state.showCart = !state.showCart;
        }
    }
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;