import React from "react";
import Button from "./Button";
import * as S from "@/styles/Styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { addItem } from "@/store/cartSlice";

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
        <S.ProductWrapper>
            <S.WhiteBox href={url} key={product._id}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.images && product.images[0]} alt="" />
                </div>
            </S.WhiteBox>
            <S.ProductInfoBox>
                <S.ProductBoxTitle href={url}>
                    {product.title}
                </S.ProductBoxTitle>
                <S.PriceRow>
                    <S.Price>${product.price}</S.Price>
                    <Button
                        primary={1}
                        outline={1}
                        onClick={() => dispatch(addItem(product._id))}
                    >
                        Add to cart
                    </Button>
                </S.PriceRow>
            </S.ProductInfoBox>
        </S.ProductWrapper>
    );
};

export default ProductBox;
