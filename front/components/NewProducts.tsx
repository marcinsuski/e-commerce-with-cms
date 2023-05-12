import { ProductSchemaType } from "@/models/Product";
import React from "react";
import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
`;

type Props = {
    products: ProductSchemaType[];
};

const NewProducts = ({ products }: Props) => {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid>
                {products.length > 0 &&
                    products.map((product) => (
                        <ProductBox key={product._id} {...product} />
                    ))}
            </ProductsGrid>
        </Center>
    );
};

export default NewProducts;
