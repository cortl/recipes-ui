import Head from "next/head";
import React from "react";

import styles from "../../../styles/Home.module.css";

interface ILayout {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer className={styles.footer}>
        <a href="https://cortlan.dev" target="_blank" rel="noopener noreferrer">
          Built with 💖 by Cortlan
        </a>
      </footer>
    </>
  );
};

export { Layout };
