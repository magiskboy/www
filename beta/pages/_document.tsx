import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/base16/github.min.css" integrity="sha512-+evfh0lCceddhK7IkrvCj9metOEXRt6QNKNMWXBNINkQyLrxLkjyu7ye/g7claDFWtZHSpgJAMR7zTjo++oDPQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
