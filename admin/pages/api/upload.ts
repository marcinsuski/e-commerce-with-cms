import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types"; // lib to find file types
import { mongooseConnect } from "../../lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

const bucketName = "marcin-next-ecommerce";

// upload file to S3
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const form = new multiparty.Form();
    const { fields, files }: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    // configure S3 client
    const client = new S3Client({
        region: "eu-central-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY ?? "",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
    });
    const links = [];
    // loop trough all files and upload file to S3
    for (const file of files.file) {
        const ext = file.originalFilename.split(".").pop();
        const newFilename = Date.now() + "." + ext;
        console.log({ ext, file });
        client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: "public-read",
                ContentType: `${mime.lookup(file.path)}`,
            })
        );
        // add to links array
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }
    return res.json({ links });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
