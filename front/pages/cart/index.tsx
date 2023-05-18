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
        if (router.query.payment === "success") {
            dispatch(clearCart());
        }
    }, []);

    return (
        <>
            <Header />
            <Center>
                <S.ColumnsWrapper>
                    {router.query.payment === "success" ? (
                        <S.Box>
                            <h1>Thank You for Your order</h1>
                            <p>
                                We will email you when your order will be sent.
                            </p>
                        </S.Box>
                    ) : (
                        <S.Box className="cart">
                            <h2>Cart</h2>
                            {!cart.items.length && (
                                <div>Your cart is empty</div>
                            )}
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
                                                                removeItem(
                                                                    product
                                                                )
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
                                </Table>
                            )}
                        </S.Box>
                    )}
                    {!!cart && (
                        <S.Box className="infobox">
                            <h2>Order information</h2>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={clientData.name}
                                id="name"
                                name="name"
                                required={true}
                                onChange={(e) => updateName(e)}
                            />
                            <Input
                                type="text"
                                placeholder="Email"
                                value={clientData.email}
                                id="email"
                                name="email"
                                required={true}
                                onChange={(e) => updateEmail(e)}
                            />
                            <Input
                                type="text"
                                placeholder="Street Address"
                                value={clientData.street}
                                id="street"
                                name="street"
                                required={true}
                                onChange={(e) => updateStreet(e)}
                            />
                            <S.CityHolder>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    value={clientData.city}
                                    id="city"
                                    name="city"
                                    required={true}
                                    onChange={(e) => updateCity(e)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={clientData.postalCode}
                                    id="postalCode"
                                    name="postalCode"
                                    required={true}
                                    onChange={(e) => updatePostalCode(e)}
                                />
                            </S.CityHolder>
                            <Input
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
                        </S.Box>
                    )}
                </S.ColumnsWrapper>
            </Center>
        </>
    );
};

export default CartPage;
