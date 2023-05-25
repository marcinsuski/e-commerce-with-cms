import Header from "@/components/Header";
import React from "react";
import * as S from "@/styles/Styles";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { ProductSchemaType } from "@/types/types";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Layout from "@/components/Layout";

type Props = {
    products: ProductSchemaType[];
};

const Products = ({ products }: Props) => {
    console.log(products);
    return (
        <Layout>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </Center>
        </Layout>
    );
};

export default Products;

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { _id: -1 } });
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}
