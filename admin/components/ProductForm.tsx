import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Loader from "./Loader";
import { ReactSortable } from "react-sortablejs";

export interface ProductType {
    title?: string;
    description?: string | undefined;
    price?: number;
    _id?: number;
    images?: string[];
}

const initialState = {
    title: "",
    description: "",
    price: 0,
    images: [],
};

const ProductForm = ({
    title,
    description,
    price,
    _id,
    images,
}: ProductType) => {
    const [product, setProduct] = useState<ProductType>(
        { title, description, price, images } || initialState
    );
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    // add product title to state
    const AddTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            title: e.target.value,
        });
    };

    // add product description to state
    const AddDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            description: e.target.value,
        });
    };

    // add product price to state
    const AddPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            price: parseFloat(e.target.value),
        });
    };
    // add product images to state
    const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target?.files;
        if (files && files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const response = await axios.post("/api/upload", data);
            console.log(response.data);
            if (product.images) {
                setProduct({
                    ...product,
                    images: [...(images as []), ...response.data.links],
                });
            } else {
                setProduct({
                    ...product,
                    images: [...response.data.links],
                });
            }
            setIsUploading(false);
        }
    };

    const updateImagesOrder = (newImages: string[]) => {
        setProduct({
            ...product,
            images: [...newImages],
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
                <label>Photos</label>
                <div className={styles.photos}>
                    <div>
                        <ReactSortable
                            className={styles.photos__list}
                            list={product.images as any}
                            setList={updateImagesOrder as any}
                        >
                            {!!product.images?.length &&
                                product.images.map((link) => (
                                    <div
                                        className={styles.photos__item}
                                        key={link}
                                    >
                                        <img
                                            src={link}
                                            alt=""
                                            className={styles.photos__img}
                                        />
                                    </div>
                                ))}
                        </ReactSortable>
                    </div>
                    {isUploading && (
                        <div className={styles.upload}>
                            <Loader />
                        </div>
                    )}
                    <div className={styles.photos__add}>
                        <label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                width="16px"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <div>Upload</div>
                            <input
                                type="file"
                                onChange={uploadImages}
                                className={styles.hidden}
                            />
                        </label>
                    </div>
                </div>
                <label htmlFor="description">Description</label>
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