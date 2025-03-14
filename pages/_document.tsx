import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
          rel="preload"
          as="style"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="preload" 
          as="style"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet" 
        />
        <link rel="icon" type="image/png" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
