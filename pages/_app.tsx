import "@styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MainLayout } from "@layouts/Main";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Licenses App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
