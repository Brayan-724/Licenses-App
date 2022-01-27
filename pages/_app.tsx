import "@styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setIsRouteChanging(true);
    const handleRouteChangeComplete = () => setIsRouteChanging(false);

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Licenses App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isRouteChanging && <div className="loading-screen">Loading...</div>}
      {!isRouteChanging && (
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      )}
    </>
  );
}

export default MyApp;
