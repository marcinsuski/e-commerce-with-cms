import { createSlice } from "@reduxjs/toolkit";

interface clientState {
    name: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

const initialState: clientState = {
    name: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
};

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        addName: (state, payload) => {
            const name = payload.payload;
            state.name = name;
        },
        addEmail: (state, payload) => {
            const email = payload.payload;
            state.email = email;
        },
        addStreet: (state, payload) => {
            const street = payload.payload;
            state.street = street;
        },
        addCity: (state, payload) => {
            const city = payload.payload;
            state.city = city;
        },
        addPostalCode: (state, payload) => {
            const postalCode = payload.payload;
            state.postalCode = postalCode;
        },
        addCountry: (state, payload) => {
            const country = payload.payload;
            state.country = country;
        },
        clearClientData: (state) => {
            state = {
                name: "",
                email: "",
                street: "",
                city: "",
                postalCode: "",
                country: "",
            };
        },
    },
});

export const {
    addName,
    addEmail,
    addStreet,
    addCity,
    addPostalCode,
    addCountry,
    clearClientData,
} = clientSlice.actions;

export default clientSlice.reducer;
