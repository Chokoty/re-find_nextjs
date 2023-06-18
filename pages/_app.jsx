import Head from "next/head";
import MainLayout from "../components/layout/main-layout";
import { Chakra } from "../styles/Chakra";
import { Analytics } from "@vercel/analytics/react";
// import PlausibleProvider from "next-plausible";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "../styles/general.scss";

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        router.events.on("hashChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
            router.events.off("hashChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            {/* <PlausibleProvider domain="https://re-find.xyz/"> */}
            <Head>
                <title>RE:FIND</title>
            </Head>
            <Chakra cookies={pageProps.cookies}>
                <MainLayout>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                    />
                    <Script
                        id="gtag-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${gtag.GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                    <Component {...pageProps} />
                </MainLayout>
            </Chakra>
            <Analytics />
            {/* </PlausibleProvider> */}
        </>
    );
}

// App.getInitialProps = ({ req }) => {
//     return {
//         // first time users will not have any cookies and you may not return
//         // undefined here, hence ?? is necessary
//         cookies: req?.headers?.cookie ?? "",
//     };
// };

export { getServerSideProps } from "../styles/Chakra";
