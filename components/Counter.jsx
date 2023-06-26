import React, { useState, useEffect } from "react";

import { Badge, Skeleton, useColorModeValue } from "@chakra-ui/react";

import { lightMode, darkMode } from "@/styles/theme";
import CountUp from "react-countup";
import axios from "axios";

const Counter = () => {
    const [counter, setCounter] = useState(null);
    const [counterLoading, setCounterLoading] = useState(false);
    const badge = useColorModeValue(lightMode.badge, darkMode.badge);

    // counter 가져오기
    const fetchCounter = async () => {
        try {
            setCounterLoading(true);
            const response = await axios.get(
                "https://isd-fanart.reruru.com/counter"
            );
            const counter = response.data;
            setCounter(counter);
            setCounterLoading(false);
        } catch (err) {
            setCounterLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCounter();
    }, []);

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
