import Head from "next/head";
import Header from "@/components/Header";
import FeaturedProduct from "@/components/FeaturedProduct";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { ProductSchemaType } from "@/types/types";
import Layout from "@/components/Layout";

export type HomeProps = {
    featuredProduct: ProductSchemaType;
    newProducts: ProductSchemaType[];
};

export default function Home({ featuredProduct, newProducts }: HomeProps) {
    return (
        <>
            <Layout>
                <FeaturedProduct product={featuredProduct} />
                <NewProducts products={newProducts} />
            </Layout>
        </>
    );
}

export async function getServerSideProps() {
    const featuredProductId = "6458d34b5fb99b3bb2fcb006";
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, { sort: { _id: -1 } });
    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        },
    };
}
