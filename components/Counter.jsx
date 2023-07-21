import React, { useState, useEffect } from "react";

import { Badge, Skeleton, useColorModeValue } from "@chakra-ui/react";

import { lightMode, darkMode } from "@/styles/theme";
import CountUp from "react-countup";
import axios from "axios";

const Counter = ({ data }) => {
    const [counter, setCounter] = useState(null);
    const [counterLoading, setCounterLoading] = useState(false);
    const badge = useColorModeValue(lightMode.badge, darkMode.badge);

    // counter 가져오기
    const fetchCounter = async () => {
        try {
            const timeout = 2000; // 2초
            setCounterLoading(true);
            const response = await axios.get(
                "https://isd-fanart.reruru.com/counter",
                { timeout }
            );
            const counter = response?.data;
            console.log(counter);
            setCounter(counter);
            setCounterLoading(false);
        } catch (err) {
            setCounterLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCounter();
    }, [data]);

    return (
        <div className="counter">
            <Skeleton isLoaded={!counterLoading} display="flex">
                {counter === null ? (
                    "현재 서버와의 연결이 불안정합니다."
                ) : (
                    <>
                        <CountUp end={counter.total_counter} />
                        &nbsp;
                        <Badge
                            style={{ backgroundColor: badge }}
                            fontSize="1em"
                        >
                            +
                            <CountUp end={counter.today_counter} duration={5} />
                        </Badge>
                        &nbsp; 개의 출처를 찾았습니다.
                    </>
                )}
            </Skeleton>
        </div>
    );
};

export default Counter;
