import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === "GET") {
        if (req.query?.id) {
            res.status(200).json(await Product.findOne({ _id: req.query.id }));
        } else {
            res.status(200).json(await Product.find());
        }
    }

    if (method === "POST") {
        const { title, description, price, images, category, properties } =
            req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            category,
            properties,
        });
        res.status(201).json(productDoc);
    }

    if (method === "PUT") {
        const { title, description, price, images, category, properties, _id } =
            req.body;
        await Product.updateOne(
            { _id },
            { title, description, price, images, category, properties }
        );
        res.status(204).json(true);
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.status(204).json(true);
        }
    }
}
