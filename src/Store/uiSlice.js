import { createSlice } from "@reduxjs/toolkit";

const initialState = {showCart: false, notification: null};
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        toggleCart(state){
            state.showCart = !state.showCart;
        },
        showNotification(state, action){
            state.notification = {status: action.payload.status, message: action.payload.message, error: action.payload.error};
        }
    }
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;