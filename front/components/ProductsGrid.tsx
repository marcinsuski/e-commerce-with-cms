import { ProductSchemaType } from "@/types/types";
import React from "react";
import { styled } from "styled-components";
import ProductBox from "./ProductBox";

export const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;
    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    }
    @media (max-width: 580px) {
        gap: 20px;
        grid-template-columns: 1fr 1fr;
    }
`;

type Props = {
    products: ProductSchemaType[];
};

const ProductsGrid = ({ products }: Props) => {
    return (
        <StyledProductsGrid>
            {products.length > 0 &&
                products.map((product) => (
                    <ProductBox key={product._id} {...product} />
                ))}
        </StyledProductsGrid>
    );
};

export default ProductsGrid;
