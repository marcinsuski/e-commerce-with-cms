import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

type Props = {
    children?: React.ReactNode;
};

function Layout(props: Props) {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>ecommerce Admin panel</title>
                    <meta name="description" content="Admin panel login" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <div className={styles.btn_wrapper}>
                        <button
                            data-type="login-btn"
                            onClick={() => signIn("google")}
                        >
                            Login with Google
                        </button>
                    </div>
                </main>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <main className={styles.wrapper}>
                <Nav />
                <div className={styles.main}>
                    <div>{props?.children}</div>
                </div>
            </main>
        </div>
    );
}

export default Layout;
