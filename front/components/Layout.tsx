import StyledComponentsRegistry from "@/lib/registry";
import Header from "./Header";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
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
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <nav>
                <Header />
            </nav>
            <main>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </main>
            <footer></footer>
        </>
    );
}
