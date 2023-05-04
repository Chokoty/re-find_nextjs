import React from "react";
import SupportPage from "../components/support-page";
import axios from "axios";

const support = ({ counter, today_counter, last_update_info }) => {
    console.log(counter);
    console.log(today_counter);
    console.log(last_update_info);
    return (
        <>
            <SupportPage />
        </>
    );
};

export default support;

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
