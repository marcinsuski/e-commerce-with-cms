import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import axios, { AxiosResponse } from "axios";
import { withSwal } from "react-sweetalert2";
import { AlertResult, CategoryType } from "../../types/types";
import { PropertyType } from "../../types/types";

const Categories = ({ swal }: any) => {
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(
        null
    ); // specified category that is edited
    const [name, setName] = useState<string>(""); // name of the category
    const [parentCategory, setParentCategory] = useState<string>(""); // parent category
    const [categories, setCategories] = useState<CategoryType[]>([]); // array of categories
    const [properties, setProperties] = useState<PropertyType[]>([]); // array of properties

    //fetch data on mount
    useEffect(() => {
        fecthCategories();
    }, []);

    // fetch categories when updated
    const fecthCategories = () => {
        axios
            .get("/api/categories")
            .then((res: AxiosResponse<any, any>) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // save the form data
    const saveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            name,
            parentCategory,
            properties: properties.map(({ name, values }: PropertyType) => ({
                name: name,
                values: values ? values.split(",") : [],
            })),
        };
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
        setParentCategory("");
        setProperties([]);
        fecthCategories();
    };

    // edit category data
    const editCategory = (category: CategoryType) => {
        setEditedCategory(category);
        setName(category.name);

        setProperties(category.properties);

        category.parent?._id?.length
            ? setParentCategory(category.parent?._id)
            : setParentCategory("");
    };

    // delete category modal
    const deleteCategory = (category: CategoryType) => {
        swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete "${category.name}"?`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, Delete!",
            confirmButtonColor: "#d55",
            reverseButtons: true,
        })
            .then(async (result: AlertResult) => {
                const { _id } = category;
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/categories?_id=${_id}`);
                    } catch (err) {
                        console.log(err);
                    }
                    fecthCategories();
                }
            })
            .catch((error: {}) => {
                console.log(error);
            });
    };

    const addProperty = () => {
        setProperties((prev) => [...prev, { name: "", values: "" }]);
    };

    // add new property name to category
    const updatePropertyName = (
        index: number,
        property: PropertyType,
        newName: string
    ) => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };

    // add new property values to category
    const updatePropertyValues = (
        index: number,
        property: PropertyType,
        newValues: string
    ) => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    };

    const removeProperty = (indexToRemove: number) => {
        setProperties((prev) => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    };

    const cancelEditingCategory = () => {
        setEditedCategory(null);
        setName("");
        setProperties([]);
        setParentCategory("");
    };

    return (
        <Layout>
            <h2>Categories</h2>
            <div
                style={{
                    padding: "1rem",
                    boxShadow: "0px 0px 10px 5px rgb(220, 220, 220)",
                }}
            >
                <label htmlFor="category_name">
                    {editedCategory
                        ? `Edit category "${editedCategory.name}"`
                        : "Create new category"}
                </label>
                <form onSubmit={saveCategory}>
                    <div className={styles.flex}>
                        <div style={{ width: "100%" }}>
                            <label
                                htmlFor="category_name"
                                className={styles.small__label}
                            >
                                Category name
                            </label>
                            <input
                                style={{ margin: "0" }}
                                type="text"
                                id="category_name"
                                name="category_name"
                                placeholder={"Category name"}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <label
                                htmlFor="category_parent"
                                className={styles.small__label}
                            >
                                Parent category
                            </label>
                            <select
                                id="category_parent"
                                style={{ margin: "0" }}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => setParentCategory(e.target.value)}
                                value={parentCategory}
                            >
                                <option value="">No parent category</option>
                                {categories.length > 0 &&
                                    categories.map((category) => (
                                        <option
                                            value={category._id}
                                            key={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={{ marginRight: "0.5rem" }}>
                            Properties
                        </label>
                        <button
                            type="button"
                            className={styles.btn__default}
                            onClick={addProperty}
                        >
                            Add new property
                        </button>
                        {properties &&
                            properties.length > 0 &&
                            properties.map((property, index) => (
                                <div className={styles.properties__grid}>
                                    <label
                                        className={`${styles.properties__label1} ${styles.small__label}`}
                                        htmlFor="property_name"
                                    >
                                        property name (example: color)
                                    </label>
                                    <input
                                        className={styles.properties__input1}
                                        type="text"
                                        onChange={(e) =>
                                            updatePropertyName(
                                                index,
                                                property,
                                                e.target.value
                                            )
                                        }
                                        id="property_name"
                                        placeholder="property name (example: color)"
                                        value={property.name}
                                    />

                                    <label
                                        className={`${styles.properties__label2} ${styles.small__label}`}
                                        htmlFor="property_value"
                                    >
                                        values, comma separated
                                    </label>
                                    <input
                                        className={styles.properties__input2}
                                        type="text"
                                        id="property_value"
                                        placeholder="values, comma separated"
                                        onChange={(e) =>
                                            updatePropertyValues(
                                                index,
                                                property,
                                                e.target.value
                                            )
                                        }
                                        value={property.values}
                                    />

                                    <button
                                        onClick={() => removeProperty(index)}
                                        type="button"
                                        className={`${styles.properties__btn} ${styles.btn__default}`}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.2rem",
                        }}
                    >
                        {editedCategory && (
                            <button
                                type="button"
                                className={styles.btn__default}
                                onClick={cancelEditingCategory}
                            >
                                Cancel
                            </button>
                        )}
                        <button type="submit" className={styles.btn_primary}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
            {!editedCategory && (
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
                            ? categories.map((category: CategoryType) => (
                                  <tr>
                                      <td>{category?.name}</td>
                                      <td>{category.parent?.name}</td>
                                      <td
                                          className={
                                              styles.basic__table_buttons
                                          }
                                      >
                                          <button
                                              onClick={() =>
                                                  editCategory(category)
                                              }
                                              className={styles.btn_primary}
                                          >
                                              Edit
                                          </button>
                                          <button
                                              className={styles.btn_primary}
                                              onClick={() =>
                                                  deleteCategory(category)
                                              }
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))
                            : []}
                    </tbody>
                </table>
            )}
        </Layout>
    );
};

export default withSwal(({ swal }: any, ref: any) => (
    <Categories swal={swal} />
));
