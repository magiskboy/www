import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "components/Navigation";
import Footer from "components/Footer";
import { NextSeo } from "next-seo";
import getConfig from "next/config";

function MyApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();
  const { socials, navs, title } = publicRuntimeConfig;
  return (
    <>
      <NextSeo title={title} />
      <Navigation socials={socials} navs={navs} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
