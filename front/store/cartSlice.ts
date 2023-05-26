import { createSlice } from "@reduxjs/toolkit";

interface cartState {
    items: string[];
}

const initialState: cartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, payload) => {
            const { _id } = payload.payload;
            state.items.push(_id);
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items.map((item) => item))
            );
        },
        removeItem: (state, payload) => {
            const { _id } = payload.payload;
            const pos = state.items.indexOf(_id);
            console.log(pos);
            if (pos !== -1) {
                state.items.splice(pos, 1);
            }
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items.map((item) => item))
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
