import { ProductSchemaType } from "@/models/Product";
import React from "react";
import ProductBox from "./ProductBox";
import * as S from "@/styles/Styles";

type Props = {
    products: ProductSchemaType[];
};

const NewProducts = ({ products }: Props) => {
    return (
        <S.Center>
            <S.NewTitle>New Arrivals</S.NewTitle>
            <S.ProductsGrid>
                {products.length > 0 &&
                    products.map((product) => (
                        <ProductBox key={product._id} {...product} />
                    ))}
            </S.ProductsGrid>
        </S.Center>
    );
};

export default NewProducts;
