import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { addItem, clearCart, removeItem } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import * as S from "@/styles/Styles";
import { ProductType, ClientData } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Center from "@/components/Center";
import WhiteBox from "@/components/WhiteBox";
import { styled } from "styled-components";
import Layout from "@/components/Layout";

type Props = {};

export const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 40px;
    margin-top: 40px;
    .infobox {
        height: fit-content;
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-templte-rows: auto;
        .infobox {
         
            height: fit-content;
        }
`;

export const StyledTable = styled.table`
    width: 100%;
    th {
        text-align: left;
        text-transform: uppercase;
        color: #aaa;
        font-weight: 600;
        font-size: 0.7rem;
    }
    td {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

export const ProductInfoCell = styled.td`
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ProductImageBox = styled.div`
    width: 80px;
    height: 80px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 70px;
        max-height: 70px;
    }
`;

export const QuantityLabel = styled.span`
    padding: 0 6px;
    display: block;
    @media screen and (min-width: 700px) {
        display: inline-block;
    }
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

export const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

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
    const router = useRouter();

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
    const goToPayment = async () => {
        if (products.length === 0) {
            return;
        } else {
            const response = await axios.post("/api/checkout", {
                name: clientData.name,
                email: clientData.email,
                city: clientData.city,
                postalCode: clientData.postalCode,
                street: clientData.street,
                country: clientData.country,
                products: cart.items,
            });
            if (response.data.url) {
                router.push(response.data.url);
            }
        }
    };

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            router.query.payment === "success"
        ) {
            dispatch(clearCart());
        }
    }, []);

    return (
        <Layout>
            <Center>
                <ColumnsWrapper>
                    {typeof window !== "undefined" &&
                    router.query.payment === "success" ? (
                        <WhiteBox>
                            <h1>Thank You for Your order</h1>
                            <p>
                                We will email you when your order will be sent.
                            </p>
                        </WhiteBox>
                    ) : (
                        <WhiteBox className="cart">
                            <h2>Cart</h2>
                            {!cart.items.length && (
                                <div>Your cart is empty</div>
                            )}
                            {cart.items.length > 0 && (
                                <StyledTable>
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
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <Image
                                                            src={
                                                                product.images
                                                                    ? product
                                                                          .images[0]
                                                                    : ""
                                                            }
                                                            alt=""
                                                            width={70}
                                                            height={70}
                                                        />
                                                    </ProductImageBox>
                                                    {product.title}:
                                                </ProductInfoCell>
                                                <td>
                                                    <Button
                                                        style={{
                                                            padding: "0px 8px",
                                                        }}
                                                        onClick={() =>
                                                            dispatch(
                                                                removeItem(
                                                                    product
                                                                )
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <QuantityLabel>
                                                        {
                                                            cart.items.filter(
                                                                (id) =>
                                                                    id ===
                                                                    product._id?.toString()
                                                            ).length
                                                        }
                                                    </QuantityLabel>
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
                                                        ).length *
                                                            product.price}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>${total}</td>
                                        </tr>
                                    </tbody>
                                </StyledTable>
                            )}
                        </WhiteBox>
                    )}
                    {!!cart && (
                        <WhiteBox className="infobox">
                            <h2>Order information</h2>
                            <StyledInput
                                type="text"
                                placeholder="Name"
                                value={clientData.name}
                                id="name"
                                name="name"
                                required={true}
                                onChange={(e) => updateName(e)}
                            />
                            <StyledInput
                                type="text"
                                placeholder="Email"
                                value={clientData.email}
                                id="email"
                                name="email"
                                required={true}
                                onChange={(e) => updateEmail(e)}
                            />
                            <StyledInput
                                type="text"
                                placeholder="Street Address"
                                value={clientData.street}
                                id="street"
                                name="street"
                                required={true}
                                onChange={(e) => updateStreet(e)}
                            />
                            <CityHolder>
                                <StyledInput
                                    type="text"
                                    placeholder="City"
                                    value={clientData.city}
                                    id="city"
                                    name="city"
                                    required={true}
                                    onChange={(e) => updateCity(e)}
                                />
                                <StyledInput
                                    type="text"
                                    placeholder="Postal Code"
                                    value={clientData.postalCode}
                                    id="postalCode"
                                    name="postalCode"
                                    required={true}
                                    onChange={(e) => updatePostalCode(e)}
                                />
                            </CityHolder>
                            <StyledInput
                                type="text"
                                placeholder="Country"
                                value={clientData.country}
                                id="country"
                                name="country"
                                required={true}
                                onChange={(e) => updateCountry(e)}
                            />
                            <Button black={1} block={1} onClick={goToPayment}>
                                Continue to checkout
                            </Button>
                        </WhiteBox>
                    )}
                </ColumnsWrapper>
            </Center>
        </Layout>
    );
};

export default CartPage;
