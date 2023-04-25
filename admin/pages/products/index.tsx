import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const Products = () => {
    return (
        <Layout>
            <Link className={styles.product_btn} href={"/products/new"}>
                Add new product
            </Link>
        </Layout>
    );
};

export default Products;
