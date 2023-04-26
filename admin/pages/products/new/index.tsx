import React from "react";
import Layout from "../../../components/Layout";
import Head from "next/head";
import ProductForm from "../../../components/ProductForm";

const NewProduct = () => {
    return (
        <>
            <Head>
                <title>New Product</title>
                <meta name="description" content="New Product" />
            </Head>
            <Layout>
                <h2>New Product</h2>
                <ProductForm />
            </Layout>
        </>
    );
};

export default NewProduct;
