import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import axios, { AxiosResponse } from "axios";
import { withSwal } from "react-sweetalert2";
import { AlertResult, CategoryType } from "../../types/types";
import { PropertyType } from "../../types/types";
import Loader from "../../components/Loader";

const Categories = ({ swal }: any) => {
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(
        null
    ); // specified category that is edited
    const [name, setName] = useState<string>(""); // name of the category
    const [parentCategory, setParentCategory] = useState<string>(""); // parent category
    const [categories, setCategories] = useState<CategoryType[]>([]); // array of categories
    const [properties, setProperties] = useState<PropertyType[]>([]); // array of properties

    useEffect(() => {
        fecthCategories();
    }, []);

    const fecthCategories = (): void => {
        axios
            .get("/api/categories")
            .then((res: AxiosResponse<any, any>) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveCategory = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
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

    const editCategory = (category: CategoryType): void => {
        setEditedCategory(category);
        setName(category.name);

        setProperties(category.properties);

        category.parent?._id?.length
            ? setParentCategory(category.parent?._id)
            : setParentCategory("");
    };

    const deleteCategory = (category: CategoryType): void => {
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

    const addProperty = (): void => {
        setProperties((prev) => [...prev, { name: "", values: "" }]);
    };

    const updatePropertyName = (
        index: number,
        property: PropertyType,
        newName: string
    ): void => {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };

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

    const cancelEditingCategory = (): void => {
        setEditedCategory(null);
        setName("");
        setProperties([]);
        setParentCategory("");
    };

    return (
        <Layout>
            <h2>Categories</h2>
            <div className={styles.category__form}>
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
                        <div className={styles.properties__header}>
                            <label>Properties</label>
                            <button
                                type="button"
                                className={styles.btn__basic}
                                onClick={addProperty}
                            >
                                Add new property
                            </button>
                        </div>
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
                                        className={`${styles.properties__btn} ${styles.btn__delete}`}
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
                                              className={styles.btn__edit}
                                          >
                                              {" "}
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  height="18px"
                                                  strokeWidth={1.5}
                                                  stroke="currentColor"
                                              >
                                                  <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                  />
                                              </svg>
                                              Edit
                                          </button>
                                          <button
                                              className={styles.btn__delete}
                                              onClick={() =>
                                                  deleteCategory(category)
                                              }
                                          >
                                              {" "}
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  height="18px"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth={1.5}
                                                  stroke="currentColor"
                                              >
                                                  <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                  />
                                              </svg>
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
