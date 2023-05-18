import React from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { ProductType } from "@/types/types";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { GetServerSideProps } from "next";
import { styled } from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import Image from "next/image";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/CartIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { addItem } from "@/store/cartSlice";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.4fr;
    gap: 40px;
    margin-top: 40px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Price = styled.span`
    font-size: 1.4rem;
`;

type Props = {
    product: ProductType;
};

const ProductPage = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages
                            id={product._id || ""}
                            title={product.title || ""}
                            images={product.images || []}
                        />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <Price>${product.price}</Price>
                            <div>
                                <Button
                                    primary={1}
                                    onClick={() => dispatch(addItem(product))}
                                >
                                    {" "}
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { id } = ctx.query;
    await mongooseConnect();
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
};
