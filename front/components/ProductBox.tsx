import React from "react";
import Button from "./Button";
import * as S from "@/styles/Styles";

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

const ProductBox = ({
    key,
    _id,
    title,
    description,
    price,
    images,
    properties,
    category,
}: Props) => {
    const url = `/product/${_id}`;
    return (
        <S.ProductWrapper>
            <S.WhiteBox href={url} key={key}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={images && images[0]} alt="" />
                </div>
            </S.WhiteBox>
            <S.ProductInfoBox>
                <S.ProductBoxTitle href={url}>{title}</S.ProductBoxTitle>
                <S.PriceRow>
                    <S.Price>${price}</S.Price>
                    <Button primary={1} outline={1}>
                        Add to cart
                    </Button>
                </S.PriceRow>
            </S.ProductInfoBox>
        </S.ProductWrapper>
    );
};

export default ProductBox;
