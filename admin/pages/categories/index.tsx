import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import axios from "axios";

type Category = string;

const Categories: React.FC = () => {
    const [name, setName] = useState<Category>("");
    const [categories, setCategories] = useState<Array<Category>>([]);
    useEffect(() => {
        axios
            .get("api/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [name]);

    const saveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/api/categories", { name });
            setName("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <h2>Categories</h2>
            <form onSubmit={saveCategory}>
                <label htmlFor="category_name">New category name</label>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                    <input
                        style={{ margin: "0" }}
                        type="text"
                        name="category_name"
                        placeholder={"Category name"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        value={name}
                    />
                    <button type="submit" className={styles.btn_primary}>
                        Save
                    </button>
                </div>
            </form>
            <table className={styles.basic__table}>
                <thead>
                    <tr>
                        <td>Category name</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <tr>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default Categories;
