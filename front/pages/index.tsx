import Head from "next/head";
import Header from "@/components/Header";
import FeaturedProduct from "@/components/FeaturedProduct";
import { Product, ProductSchemaType } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

type Props = {
    product: ProductSchemaType;
};

export default function Home({ product }: Props) {
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
                <FeaturedProduct product={product} />
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const featuredProductId = "6458d34b5fb99b3bb2fcb006";
    await mongooseConnect();
    const product = await Product.findById(featuredProductId);
    return {
        props: { product: JSON.parse(JSON.stringify(product)) },
    };
}
