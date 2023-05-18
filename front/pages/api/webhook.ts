import { mongooseConnect } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "@/models/Order";

const endpointSecret =
    "whsec_920253cb36298931ed32076c90be3a2532d01c1a94c55c410dd9fd0336ed632e";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await mongooseConnect();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            await buffer(req),
            sig,
            endpointSecret
        );
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).send(`Webhook Error: ${err.message} `);
            return;
        }
    }

    switch (event.type) {
        case "checkout.session.completed":
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === "paid";
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true,
                });
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("ok");
}

export const config = {
    api: { bodyParser: false },
};
