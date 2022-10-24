import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, Navigation } from "components";
import { NextSeo } from "next-seo";
import getConfig from "next/config";

function MyApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();
  const { socials, navs, title } = publicRuntimeConfig;
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
