import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export type CategoryType = {
    _id?: string;
    name: string;
    parent: CategoryType | undefined;
};

const Categories: React.FC = () => {
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(
        null
    );
    const [name, setName] = useState<string>("");
    const [parentCategory, setParentCategory] = useState<string>("");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    useEffect(() => {
        fecthCategories();
    }, []);

    const fecthCategories = () => {
        axios
            .get("/api/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name, parentCategory };
        if (editedCategory) {
            try {
                await axios.put("/api/categories", {
                    ...data,
                    _id: editedCategory._id,
                });
                setEditedCategory(null);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axios.post("/api/categories", data);
            } catch (err) {
                console.log(err);
            }
        }
        setName("");
        fecthCategories();
    };

    const editCategory = (category: CategoryType) => {
        setEditedCategory(category);
        setName(category.name);
        category.parent?._id?.length
            ? setParentCategory(category.parent?._id)
            : setParentCategory("");
    };

    return (
        <Layout>
            <h2>Categories</h2>
            <form onSubmit={saveCategory}>
                <label htmlFor="category_name">
                    {editedCategory
                        ? `Edit category "${editedCategory.name}"`
                        : "Create new category"}
                </label>
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
                    <select
                        id="category_parent"
                        style={{ margin: "0" }}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setParentCategory(e.target.value)
                        }
                        value={parentCategory}
                    >
                        <option value="">No parent category</option>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>

                    <button type="submit" className={styles.btn_primary}>
                        Save
                    </button>
                </div>
            </form>
            <table className={styles.basic__table}>
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0
                        ? categories.map((category) => (
                              <tr>
                                  <td>{category?.name}</td>
                                  <td>{category.parent?.name}</td>
                                  <td className={styles.basic__table_buttons}>
                                      <button
                                          onClick={() => editCategory(category)}
                                          className={styles.btn_primary}
                                      >
                                          Edit
                                      </button>
                                      <button className={styles.btn_primary}>
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))
                        : []}
                </tbody>
            </table>
        </Layout>
    );
};

export default Categories;
