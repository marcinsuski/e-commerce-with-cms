import Head from "next/head";
import Header from "@/components/Header";
import FeaturedProduct from "@/components/FeaturedProduct";

export default function Home() {
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
                <FeaturedProduct />
            </main>
        </>
    );
}
