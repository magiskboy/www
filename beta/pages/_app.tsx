import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Script from "next/script";
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
    {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="google-analytic" strategy="afterInteractive">
              {
                `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });`
              }
            </Script>
          </>
        )}
      <NextSeo title={title} description={title} />
      <Navigation socials={socials} navs={navs} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
