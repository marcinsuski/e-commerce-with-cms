import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export interface ProductType {
    title?: string;
    description?: string | undefined;
    price?: number;
    _id?: number;
}

const initialState = {
    title: "",
    description: "",
    price: 0,
};

const ProductForm = ({ title, description, price, _id }: ProductType) => {
    const [product, setProduct] = useState<ProductType>(
        { title, description, price } || initialState
    );
    const router = useRouter();

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

    // submit form to add new product to database or edit a product
    const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (_id) {
            await axios.put("/api/products", { ...product, _id });
        } else {
            await axios.post("/api/products", product);
        }
        setProduct(initialState); // clear inputs
        router.push("/products");
    };

    return (
        <>
            <form onSubmit={saveProduct}>
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
        </>
    );
};

export default ProductForm;
