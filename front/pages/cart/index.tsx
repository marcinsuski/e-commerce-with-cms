import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { addItem, removeItem } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import * as S from "@/styles/Styles";
import { ProductType, ClientData } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const initialValue = {
    name: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
};

const CartPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [clientData, setClientData] = useState<ClientData>(initialValue);
    useEffect(() => {
        if (cart.items.length > 0) {
            axios.post("/api/cart", { ids: cart.items }).then((response) => {
                setProducts(response.data);
            });
        }
    }, [cart]);

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData((prev) => {
            return { ...prev, name: e.target.value };
        });
    };

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData((prev) => {
            return { ...prev, email: e.target.value };
        });
    };

    const updateStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData((prev) => {
            return { ...prev, street: e.target.value };
        });
    };

    const updateCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData((prev) => {
            return { ...prev, city: e.target.value };
        });
    };

    const updatePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData((prev) => {
            return { ...prev, postalCode: e.target.value };
        });
    };

    const updateCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData((prev) => {
            return { ...prev, country: e.target.value };
        });
    };

    console.log(clientData);

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
                            <Input
                                type="text"
                                placeholder="Name"
                                value={clientData.name}
                                id="name"
                                onChange={(e) => updateName(e)}
                            />
                            <Input
                                type="text"
                                placeholder="Email"
                                value={clientData.email}
                                id="email"
                                onChange={(e) => updateEmail(e)}
                            />
                            <Input
                                type="text"
                                placeholder="Street Address"
                                value={clientData.street}
                                id="street"
                                onChange={(e) => updateStreet(e)}
                            />
                            <S.CityHolder>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    value={clientData.city}
                                    id="city"
                                    onChange={(e) => updateCity(e)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={clientData.postalCode}
                                    id="postalCode"
                                    onChange={(e) => updatePostalCode(e)}
                                />
                            </S.CityHolder>
                            <Input
                                type="text"
                                placeholder="Country"
                                value={clientData.country}
                                id="country"
                                onChange={(e) => updateCountry(e)}
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
