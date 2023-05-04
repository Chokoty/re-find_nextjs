import HomePage from "../components/home-page";
import axios from "axios";

// import { Inter } from "@next/font/google";
// const inter = Inter({ subsets: ["latin"] });

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
        const counter = axios
            .get("https://isd-fanart.reruru.com/counter")
            .then((res) => res.data);
        const today_counter = axios
            .get("https://re-find.reruru.com/today_counter")
            .then((res) => res.data);
        const last_update_info = axios
            .get("https://re-find.reruru.com/last_update_info")
            .then((res) => res.data);

        const ret = await Promise.all([
            // wow - 병렬로 요청해서 페이지 로딩 줄임!
            counter,
            today_counter,
            last_update_info,
        ]);

        return {
            props: {
                counter: ret[0],
                today_counter: ret[1],
                last_update_info: ret[2],
            },
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
