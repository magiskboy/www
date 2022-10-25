import "../styles/globals.scss";
import "../styles/github.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Router } from "next/router";
import { Footer, Navigation } from "components";
import { NextSeo } from "next-seo";
import getConfig from "next/config";
import * as ga from "../ga";

function MyApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();
  const { socials, navs, title } = publicRuntimeConfig;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => Router.events.off("routeChangeComplete", handleRouteChange);
  }, []);

  return (
    <>
      <NextSeo title={title} description={title} />
      <Navigation socials={socials} navs={navs} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
