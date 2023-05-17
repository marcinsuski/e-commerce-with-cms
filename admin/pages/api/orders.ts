import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../lib/mongoose";

import { Order } from "../../models/Order";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await mongooseConnect();
    res.json(await Order.find().sort({ createdAt: -1 }));
}
