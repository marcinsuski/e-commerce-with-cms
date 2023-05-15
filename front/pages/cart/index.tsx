import Header from "@/components/Header";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";

type Props = {};

const CartPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);

    // in case redux-toolkit doesn't persist
    // useEffect(() => {
    //     const items = localStorage.getItem("cartItems");
    //     items && JSON.parse(items);
    // }, []);

    return (
        <>
            <Header />
            <div></div>
        </>
    );
};

export default CartPage;
