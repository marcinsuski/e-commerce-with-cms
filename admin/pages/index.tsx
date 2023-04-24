import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Layout from "../components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession<boolean>();
    if (!session) return;
    const userName = session.user?.name;
    const image = session?.user?.image;

    console.log(session);
    return (
        <Layout>
            <div className={styles.header}>
                <div>
                    {userName && (
                        <span>
                            Hello, <b>{userName}</b>
                        </span>
                    )}
                </div>
                <div className={styles.admin}>
                    {image && <img src={image} alt="" />}
                    {session?.user?.name}
                </div>
            </div>
        </Layout>
    );
}
