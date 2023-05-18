import React from "react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { addItem } from "@/store/cartSlice";
import { styled } from "styled-components";
import Link from "next/link";
import CartIcon from "./CartIcon";

export const ProductWrapper = styled.div`
    width: 150px;
    height: 150px;
    aspect-ratio: 1 / 1;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-area:
        "a a a"
        "a a a"
        "b b b"
        "c c c";
`;

export const WhiteBox = styled(Link)`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    grid-area: "a";
    img {
        max-width: 100%;
        max-height: 80px;
    }
`;

export const ProductBoxTitle = styled(Link)`
    font-size: clamp(0.5rem, 0.4rem + 1vw, 0.7rem);
    font-weight: normal;
    margin: 0;
    color: inherit;
    text-decoration: none;
    grid-area: "b";
`;

export const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

export const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    grid-area: "c";
`;

export const Price = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
`;

type Props = {
    key: string;
    _id: string;
    title: string;
    description?: string;
    price: number;
    images?: string[];
    category?: string;
    properties?: object;
};

const ProductBox = (product: Props) => {
    const url = `/product/${product._id}`;
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    return (
        <ProductWrapper>
            <WhiteBox href={url} key={product._id}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.images && product.images[0]} alt="" />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <ProductBoxTitle href={url}>{product.title}</ProductBoxTitle>
                <PriceRow>
                    <Price>${product.price}</Price>
                    <Button
                        primary={1}
                        outline={1}
                        size="m"
                        onClick={() => dispatch(addItem(product))}
                    >
                        <CartIcon />
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
};

export default ProductBox;
