import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "components/Navigation";
import Footer from 'components/Footer';

const socials = [
  {
    title: "Github",
    link: "https://github.com/magiskboy",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/thanh-nguyen-khac",
  },
  {
    title: "Twitter",
    link: "https://twitter.com/mag1skboy",
  },
];

const navs = [
  {
    title: "Bài viết",
    link: "/posts",
  },
  {
    title: "Bản thân",
    link: "/about",
  },
  {
    title: "Danh mục",
    link: "/categories",
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation socials={socials} navs={navs} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
