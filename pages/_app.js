import Head from "next/head";
import MainLayout from "../components/layout/main-layout";
import { Chakra } from "../styles/Chakra";
import { Analytics } from "@vercel/analytics/react";

import "../styles/general.scss";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>RE:FIND</title>
            </Head>
            <Chakra cookies={pageProps.cookies}>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </Chakra>
            <Analytics />
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
