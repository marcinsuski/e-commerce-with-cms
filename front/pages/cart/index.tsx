import Button from "@/components/Button";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { addItem, removeItem } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import * as S from "@/styles/Styles";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

export interface ProductType {
    title?: string;
    description?: string | undefined;
    price?: number;
    _id?: number;
    images?: string[];
    category?: string | "";
    properties?: PropertyType;
}

export type PropertyType = {
    name?: string;
    values?: string;
};

const CartPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        if (cart.items.length > 0) {
            axios.post("/api/cart", { ids: cart.items }).then((response) => {
                setProducts(response.data);
            });
        }
    }, [cart]);

    let total = 0;
    for (const productId of cart.items) {
        if (products.length > 0) {
            const price =
                products?.find(
                    (product) => product._id?.toString() === productId
                )?.price || 0;
            total += price;
        }
    }

    return (
        <>
            <Header />
            <S.Center>
                <S.ColumnsWrapper>
                    <S.Box className="cart">
                        <h2>Cart</h2>
                        {!cart.items.length && <div>Your cart is empty</div>}
                        {cart.items.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <S.ProductInfoCell>
                                                <S.ProductImageBox>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={
                                                            product.images
                                                                ? product
                                                                      .images[0]
                                                                : ""
                                                        }
                                                        alt=""
                                                    />
                                                </S.ProductImageBox>
                                                {product.title}:
                                            </S.ProductInfoCell>
                                            <td>
                                                <Button
                                                    style={{
                                                        padding: "0px 8px",
                                                    }}
                                                    onClick={() =>
                                                        dispatch(
                                                            removeItem(product)
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <S.QuantityLabel>
                                                    {
                                                        cart.items.filter(
                                                            (id) =>
                                                                id ===
                                                                product._id?.toString()
                                                        ).length
                                                    }
                                                </S.QuantityLabel>
                                                <Button
                                                    style={{
                                                        padding: "0px 8px",
                                                    }}
                                                    onClick={() =>
                                                        dispatch(
                                                            addItem(product)
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </td>
                                            <td>
                                                $
                                                {cart.items &&
                                                    product.price &&
                                                    cart.items.filter(
                                                        (id) =>
                                                            id ===
                                                            product._id?.toString()
                                                    ).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td>Total:</td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </S.Box>
                    {!!cart && (
                        <S.Box className="infobox">
                            <h2>Order information</h2>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Address"
                            />
                            <label htmlFor="address2">Address 2</label>
                            <input
                                type="text"
                                id="adddress2"
                                placeholder="Addres 2"
                            />
                            <Button black={1} block={1}>
                                Continue to checkout
                            </Button>
                        </S.Box>
                    )}
                </S.ColumnsWrapper>
            </S.Center>
        </>
    );
};

export default CartPage;
