import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>ecommerce Admin panel</title>
                <meta name="description" content="Admin panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.btn_wrapper}>
                    <button data-type="login-btn">Login with Google</button>
                </div>
            </main>
        </div>
    );
}
