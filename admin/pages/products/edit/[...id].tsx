import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { NextRouter, useRouter } from "next/router";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import ProductForm from "../../../components/ProductForm";

const EditProductPage: React.FC = () => {
    const [productInfo, setProductInfo] = useState<{} | null>(null);
    const router: NextRouter = useRouter();
    const { id }: ParsedUrlQuery = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/products?id=${id}`).then((response) => {
            setProductInfo(response.data);
        });
    }, [id]);

    return (
        <Layout>
            <h2>Edit Product</h2>
            {productInfo && <ProductForm {...productInfo} />}
        </Layout>
    );
};

export default EditProductPage;
