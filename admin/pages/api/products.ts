import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    await mongooseConnect();

    // GET - /api/products
    if (method === "GET") {
        // /api/products/id
        if (req.query?.id) {
            res.status(200).json(await Product.findOne({ _id: req.query.id }));
        } else {
            // /api/products
            res.status(200).json(await Product.find());
        }
    }
    // POST - /api/products/new
    if (method === "POST") {
        const { title, description, price, images, category } = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            category,
        });
        res.status(201).json(productDoc);
    }
    // PUT - /api/products/id
    if (method === "PUT") {
        const { title, description, price, images, category, _id } = req.body;
        await Product.updateOne(
            { _id },
            { title, description, price, images, category }
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
