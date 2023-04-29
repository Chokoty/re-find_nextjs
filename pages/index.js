import HomePage from "../components/home-page";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ counter, today_counter }) {
    return (
        <>
            <HomePage counter={counter} today_counter={today_counter} />
        </>
    );
}

export async function getServerSideProps() {
    try {
        const counter = await fetch(
            "https://isd-fanart.reruru.com/counter"
        ).then((res) => res.json());
        const today_counter = await fetch(
            "https://re-find.reruru.com/today_counter"
        ).then((res) => res.json());

        return {
            props: { counter, today_counter },
        };
    } catch (error) {
        console.log("Error fetching counter:", error);

        // Return an alternate value if the fetch fails
        return {
            props: { counter: null, today_counter: null },
        };
    }
}
