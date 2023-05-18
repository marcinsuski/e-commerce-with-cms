import React from "react";
import ProductBox from "./ProductBox";
import * as S from "@/styles/Styles";
import Center from "./Center";
import { ProductSchemaType } from "@/types/types";

type Props = {
    products: ProductSchemaType[];
};

const NewProducts = ({ products }: Props) => {
    return (
        <Center>
            <S.NewTitle>New Arrivals</S.NewTitle>
            <S.ProductsGrid>
                {products.length > 0 &&
                    products.map((product) => (
                        <ProductBox key={product._id} {...product} />
                    ))}
            </S.ProductsGrid>
        </Center>
    );
};

export default NewProducts;
