import React, { useState } from "react";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.css";
import axios from "axios";

export interface Product {
    title?: string;
    description?: string | undefined;
    price?: number;
}

const NewProduct = () => {
    const [product, setProduct] = useState<Product>({});

    const AddTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            title: e.target.value,
        });
    };

    const AddDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            description: e.target.value,
        });
    };

    const AddPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            price: parseFloat(e.target.value),
        });
    };

    const CreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("/api/products", product);
    };

    return (
        <Layout>
            <h2>New Product</h2>
            <form onSubmit={CreateProduct}>
                <label htmlFor="product_name">Product name</label>
                <input
                    value={product.title}
                    type="text"
                    name="product_name"
                    placeholder="product name"
                    onChange={AddTitle}
                ></input>
                <label htmlFor="pdescription">Description</label>
                <textarea
                    value={product.description}
                    onChange={AddDescription}
                    name="description"
                    placeholder="description"
                ></textarea>
                <label htmlFor="price">Price (in USD)</label>
                <input
                    value={product.price}
                    onChange={AddPrice}
                    type="number"
                    name="price"
                    placeholder="description"
                ></input>
                <button type="submit" className={styles.btn_primary}>
                    Save
                </button>
            </form>
        </Layout>
    );
};

export default NewProduct;
