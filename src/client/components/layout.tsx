import process from "process";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Link as CLink } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import styles from "../../../styles/Home.module.css";

interface ILayout {
  title: string;
  description?: string;
  image?: string | null;
  url?: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({
  title,
  description,
  url,
  image,
  children,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const useableTitle = isHomePage ? title : `${title} | Recipe Book`;
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <title>{useableTitle}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="title" content={title} />

        <meta
          property="twitter:domain"
          content={process.env.NEXT_PUBLIC_BASE_URL}
        />
        {url && (
          <>
            <meta property="twitter:url" content={url} />
            <meta property="og:url" content={url} />
          </>
        )}

        {description && (
          <>
            <meta name="twitter:description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="description" content={description} />
          </>
        )}
        {image && (
          <>
            <meta name="image" content={image} />
            <meta name="twitter:image" content={image} />
            <meta property="og:image" content={image} />
          </>
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isHomePage && (
        <Box mt={5} ml={5}>
          <Link href="/" passHref>
            <CLink>
              <ArrowBackIcon w={6} h={6} />
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
