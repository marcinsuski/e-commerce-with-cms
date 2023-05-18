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

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.4fr;
    gap: 40px;
    margin-top: 40px;
`;

type Props = {
    product: ProductType;
};

const ProductPage = ({ product }: Props) => {
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <Image
                            src={product.images ? product.images[0] : ""}
                            alt={product.title || "product image"}
                            width={100}
                            height={100}
                        />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
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
