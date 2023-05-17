import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { OrderData } from "../../types/types";

const OrdersPage = (): JSX.Element => {
    const [orders, setOrders] = useState<OrderData[]>([]);

    useEffect(() => {
        axios.get("/api/orders").then((response) => {
            response.data;
            setOrders(response.data);
        });
    }, []);

    return (
        <Layout>
            <h1>Orders</h1>
            <table className={styles.basic__table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 &&
                        orders.map((order) => (
                            <tr>
                                <td>
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td>
                                    name: {order.name || "---"} <br />
                                    email: {order.email || "---"}
                                    <br />
                                    city: {order.city}{" "}
                                    {order.postalCode || "---"} <br />
                                    street: {order.street || "---"}
                                    <br />
                                    country: {order.country || "---"}
                                </td>
                                <td>
                                    {order.line_items.map((item) => (
                                        <>
                                            {item.price_data?.product_data.name}{" "}
                                            x {item.quantity}
                                        </>
                                    ))}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default OrdersPage;
