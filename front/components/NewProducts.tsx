import React from "react";
import * as S from "@/styles/Styles";
import Center from "./Center";
import { ProductSchemaType } from "@/types/types";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

type Props = {
    products: ProductSchemaType[];
};

const NewProducts = ({ products }: Props) => {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} />
        </Center>
    );
};

export default NewProducts;
