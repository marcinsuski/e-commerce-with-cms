import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === "GET") {
        if (req.query?.id) {
            res.status(200).json(await Product.findOne({ _id: req.query.id }));
        } else {
            // /api/products
            res.status(200).json(await Product.find());
        }
    }
    // POST - /api/products/new
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
    // PUT - /api/products/id
    if (method === "PUT") {
        const { title, description, price, images, category, properties, _id } =
            req.body;
        await Product.updateOne(
            { _id },
            { title, description, price, images, category, properties }
        );
        res.status(204).json(true);
    }

    // DELETE - /api/products/id
    if (method === "DELETE") {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.status(204).json(true);
        }
    }
}
