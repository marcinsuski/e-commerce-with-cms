import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../models/Category";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        const categories = await Category.find();
        res.status(200).json(categories);
    }

    // /api/categories
    if (method === "POST") {
        const { name } = req.body;
        const categoryDoc = await Category.create({ name });
        res.status(204).json(categoryDoc);
    }
}
