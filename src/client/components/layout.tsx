import process from "process";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { SlGraph } from "react-icons/sl";
import {
  Box,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import styles from "../../../styles/Home.module.css";

const GraphIcon = chakra(SlGraph);

type NavigationTabProps = {
  readonly LinkIcon: React.FC;
  readonly text: string;
  readonly href: string;
};

const NavigationTab: React.FC<NavigationTabProps> = ({
  LinkIcon,
  text,
  href,
}) => {
  const router = useRouter();

  const isOnPage = router.pathname === href;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (isOnPage) return <></>;

  return (
    <LinkBox as={VStack}>
      <LinkIcon h={6} w={6} />
      <LinkOverlay href={href}>
        <Text fontSize="sm">{text}</Text>
      </LinkOverlay>
    </LinkBox>
  );
};

type ILayout = {
  readonly title: string;
  readonly description?: string;
  readonly image?: string | null;
  readonly url?: string;
  readonly children: React.ReactNode;
};

const Layout: React.FC<ILayout> = ({
  title,
  description,
  url,
  image,
  children,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isStatsPage = router.pathname === "/stats";
  const useableTitle = isHomePage ? title : `${title} | Recipe Book`;

  return (
    <>
      <Head>
        <meta content="website" property="og:type" />
        <meta content="summary_large_image" name="twitter:card" />

        <title>{useableTitle}</title>
        <meta content={title} property="og:title" />
        <meta content={title} name="twitter:title" />
        <meta content={title} name="title" />

        <meta
          content={process.env.NEXT_PUBLIC_BASE_URL}
          property="twitter:domain"
        />
        {url && (
          <>
            <meta content={url} property="twitter:url" />
            <meta content={url} property="og:url" />
          </>
        )}

        {description && (
          <>
            <meta content={description} name="twitter:description" />
            <meta content={description} property="og:description" />
            <meta content={description} name="description" />
          </>
        )}
        {image && (
          <>
            <meta content={image} name="image" />
            <meta content={image} name="twitter:image" />
            <meta content={image} property="og:image" />
          </>
        )}
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Flex ml={5} mr={5} mt={5}>
        <NavigationTab LinkIcon={ArrowBackIcon} href="/" text="Back" />
        <Spacer />
        <NavigationTab LinkIcon={GraphIcon} href="/stats" text="Stats" />
      </Flex>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Text fontSize="lg">
          <a
            href="https://cortlan.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            {`Built with 💖 by Cortlan`}
          </a>
        </Text>
      </footer>
      <GoogleAnalytics gaId="G-9CMV1B40XX" />
    </>
  );
};

export { Layout };
