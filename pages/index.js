import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import variables from "../styles/variables.module.scss";

import HomePage from "../components/home-page";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ counter }) {
    return (
        <>
            <HomePage counter={counter} />
        </>
    );
}

export async function getStaticProps() {
    try {
        const counter = await fetch(
            "https://isd-fanart.reruru.com/counter"
        ).then((res) => res.json());

        return {
            props: { counter },
        };
    } catch (error) {
        console.log("Error fetching counter:", error);

        // Return an alternate value if the fetch fails
        return {
            props: { counter: null },
        };
    }
}
