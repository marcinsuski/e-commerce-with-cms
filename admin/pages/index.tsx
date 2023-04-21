import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>ecommerce Admin panel</title>
                    <meta name="description" content="Admin panel" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
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
    if (session) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>ecommerce Admin panel</title>
                    <meta name="description" content="Admin panel" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <div className={styles.btn_wrapper}>
                        <div>Logged in {session.user?.email}</div>
                    </div>
                </main>
            </div>
        );
    }
}
