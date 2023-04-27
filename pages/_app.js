import Head from "next/head";
import MainLayout from "../components/layout/main-layout";
import { Chakra } from "../styles/Chakra";

import "@/styles/globals.css";
import "../styles/general.scss";
import { CSSReset } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="apple-mobile-web-app-capable" content="yes" />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
            </Head>
            <Chakra cookies={pageProps.cookies}>
                <MainLayout>
                    <CSSReset />
                    <Component {...pageProps} />
                </MainLayout>
            </Chakra>
        </>
    );
}

App.getInitialProps = ({ req }) => {
    return {
        // first time users will not have any cookies and you may not return
        // undefined here, hence ?? is necessary
        cookies: req?.headers?.cookie ?? "",
    };
};

export { getServerSideProps } from "../styles/Chakra";
