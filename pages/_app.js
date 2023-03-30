import MainLayout from "../components/layout/main-layout";

import "@/styles/globals.css";
import "../styles/general.scss";

export default function App({ Component, pageProps }) {
    return (
        <>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    );
}
