import HomePage from "../components/home-page";
import { Inter } from "@next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ counter, today_counter, last_update_info }) {
    return (
        <>
            <HomePage
                counter={counter}
                today_counter={today_counter}
                last_update_info={last_update_info}
            />
        </>
    );
}

export async function getServerSideProps() {
    try {
        const counter = await axios
            .get("https://isd-fanart.reruru.com/counter")
            .then((res) => res.data);
        const today_counter = await axios
            .get("https://re-find.reruru.com/today_counter")
            .then((res) => res.data);
        const last_update_info = await axios
            .get("https://re-find.reruru.com/last_update_info")
            .then((res) => res.data);

        return {
            props: { counter, today_counter, last_update_info },
        };
    } catch (error) {
        console.log("Error fetching data :", error);

        // Return an alternate value if the fetch fails
        return {
            props: {
                counter: null,
                today_counter: null,
                last_update_info: null,
            },
        };
    }
}
