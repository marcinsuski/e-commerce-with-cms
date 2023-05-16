// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import { ProductSchemaType } from "@/models/Product";
import { Product } from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[]>
) {
    await mongooseConnect();
    const ids = req.body.ids;
    res.status(200).json(await Product.find({ _id: ids }));
}
