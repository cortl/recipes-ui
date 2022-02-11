import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, Link as CLink } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import styles from "../../../styles/Home.module.css";

interface ILayout {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ title, description, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.pathname !== "/" && (
        <Box mt={5} ml={5}>
          <Link href="/" passHref>
            <CLink>
              <ArrowBackIcon w={6} h={6}/>
            </CLink>
          </Link>
        </Box>
      )}
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
