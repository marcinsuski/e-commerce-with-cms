import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import styles from "../../../styles/Home.module.css";
import { ProductType } from "../../../types/types";

const DeleteProductPage: React.FC = () => {
    const [productInfo, setProductInfo] = useState<ProductType | null>(null);
    const router = useRouter();
    const { id }: ParsedUrlQuery = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/products?id=${id}`).then((res) => {
            setProductInfo(res.data);
        });
    }, []);

    const goBack = () => {
        router.push("/products");
    };
    const deleteProduct = async () => {
        await axios.delete(`/api/products?id=${id}`);
        goBack();
    };

    return (
        <Layout>
            <h2 style={{ textAlign: "center" }}>
                Do You really want to delete "{productInfo?.title}"?
            </h2>{" "}
            <div
                style={{
                    display: "flex",
                    gap: "0.4rem",
                    justifyContent: "center",
                }}
            >
                <button className={styles.btn__delete} onClick={deleteProduct}>
                    Yes
                </button>
                <button className={styles.btn__basic} onClick={goBack}>
                    No
                </button>
            </div>
        </Layout>
    );
};

export default DeleteProductPage;
