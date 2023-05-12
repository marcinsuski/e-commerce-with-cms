import { ProductSchemaType } from "@/models/Product";
import React from "react";
import { styled } from "styled-components";
import Button from "./Button";
import Link from "next/link";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    aspect-ratio: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
    img {
        max-width: 100%;
        max-height: 100px;
    }
`;

const Title = styled(Link)`
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

const Price = styled.div`
    font-size: 1.5rem;
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
        <ProductWrapper>
            <WhiteBox href={url} key={key}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={images && images[0]} alt="" />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button primary={1} outline={1}>
                        Add to cart
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
};

export default ProductBox;
