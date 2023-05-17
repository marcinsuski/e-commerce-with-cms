import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await mongooseConnect();
    const ids = req.body.ids;
    res.status(200).json(await Product.find({ _id: ids }));
}
