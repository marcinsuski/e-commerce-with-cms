import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { useEffect } from "react";

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
            state.items.push(payload.payload);
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items.map((item) => item))
            );
        },
        addFeaturedItem: (state, payload) => {
            state.items.push(payload.payload._id);
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items.map((item) => item))
            );
        },
        removeItem: (state, payload) => {
            state.items.pop(payload.payload._id);
        },
    },
});

export const { addItem, removeItem, addFeaturedItem } = cartSlice.actions;

export default cartSlice.reducer;
