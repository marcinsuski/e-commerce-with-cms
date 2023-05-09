import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn } from "next-auth/react";
import Nav from "../components/Nav";
import Logo from "./Logo";

type Props = {
    children?: React.ReactNode;
};

function Layout(props: Props) {
    const [showNav, setShowNav] = useState<boolean>(false);
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>ecommerce Admin panel</title>
                    <meta name="description" content="Admin panel login" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.wrapper}>
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
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <button
                    onClick={() => setShowNav(!showNav)}
                    className={styles.btn__hamburger}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        width="22"
                        height="22"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
                <Logo showNav={showNav} />
            </div>
            <main className={styles.wrapper}>
                <Nav showNav={showNav} />
                <div className={styles.main}>
                    <div>{props?.children}</div>
                </div>
            </main>
        </div>
    );
}

export default Layout;
