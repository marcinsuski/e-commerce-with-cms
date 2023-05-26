import Button from "@/components/Button";
import { addItem, clearCart, removeItem } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { ProductType, ClientData } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Center from "@/components/Center";
import WhiteBox from "@/components/WhiteBox";
import { styled } from "styled-components";
import Layout from "@/components/Layout";
import {
    addEmail,
    addName,
    addStreet,
    addCity,
    addPostalCode,
    addCountry,
    clearClientData,
} from "@/store/clientSlice";

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
    const client = useAppSelector((state: RootState) => state.client);
    const [products, setProducts] = useState<ProductType[]>([]);
    const router = useRouter();

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
    const goToPayment = async () => {
        if (products.length === 0) {
            return;
        } else {
            const response = await axios.post("/api/checkout", {
                name: client.name,
                email: client.email,
                city: client.city,
                postalCode: client.postalCode,
                street: client.street,
                country: client.country,
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
            dispatch(clearClientData());
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
                                value={client.name}
                                id="name"
                                name="name"
                                required={true}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => dispatch(addName(e.target.value))}
                            />
                            <StyledInput
                                type="text"
                                placeholder="Email"
                                value={client.email}
                                id="email"
                                name="email"
                                required={true}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => dispatch(addEmail(e.target.value))}
                            />
                            <StyledInput
                                type="text"
                                placeholder="Street Address"
                                value={client.street}
                                id="street"
                                name="street"
                                required={true}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => dispatch(addStreet(e.target.value))}
                            />
                            <CityHolder>
                                <StyledInput
                                    type="text"
                                    placeholder="City"
                                    value={client.city}
                                    id="city"
                                    name="city"
                                    required={true}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => dispatch(addCity(e.target.value))}
                                />
                                <StyledInput
                                    type="text"
                                    placeholder="Postal Code"
                                    value={client.postalCode}
                                    id="postalCode"
                                    name="postalCode"
                                    required={true}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        dispatch(addPostalCode(e.target.value))
                                    }
                                />
                            </CityHolder>
                            <StyledInput
                                type="text"
                                placeholder="Country"
                                value={client.country}
                                id="country"
                                name="country"
                                required={true}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => dispatch(addCountry(e.target.value))}
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
