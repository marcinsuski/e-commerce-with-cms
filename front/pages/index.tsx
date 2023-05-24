import Head from "next/head";
import Header from "@/components/Header";
import FeaturedProduct from "@/components/FeaturedProduct";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { ProductSchemaType } from "@/types/types";

type Props = {
    featuredProduct: ProductSchemaType;
    newProducts: ProductSchemaType[];
};

export default function Home({ featuredProduct, newProducts }: Props) {
    return (
        <>
            <Head>
                <title>TechStore</title>

                <meta
                    name="description"
                    content="The only tech store you need to know."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header />
                <FeaturedProduct product={featuredProduct} />
                <NewProducts products={newProducts} />
            </main>
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
