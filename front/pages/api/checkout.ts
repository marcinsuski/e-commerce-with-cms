import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { LineItems, OrderData, ProductSchemaType } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.json("Should be a POST request");
        return;
    }
    const {
        name,
        email,
        city,
        street,
        postalCode,
        country,
        products,
    }: OrderData = req.body;
    await mongooseConnect();
    const productsIds: string[] = products;
    const uniqueProductIds: string[] = [...new Set(productsIds)];
    const productsInformation: ProductSchemaType[] = await Product.find({
        _id: uniqueProductIds,
    });

    let line_items: LineItems[] = [];
    for (const productId of uniqueProductIds) {
        const productDetails = productsInformation.find(
            (product) => product._id.toString() === productId
        );
        const productQuantity =
            productsIds.filter((id) => id === productId).length || 0;
        if (productQuantity > 0 && productDetails) {
            line_items.push({
                quantity: productQuantity,
                price_data: {
                    currency: "USD",
                    product_data: { name: productDetails.title },
                    unit_amount: productQuantity * productDetails.price * 100,
                },
            });
        }
    }

    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        street,
        country,
        paid: false,
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: email,
        success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
        cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
        metadata: { orderId: orderDoc._id.toString() },
    });

    res.json({
        url: session.url,
    });
}
