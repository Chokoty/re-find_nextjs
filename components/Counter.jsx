import React from "react";

import { Badge, Skeleton, useColorModeValue } from "@chakra-ui/react";

import { lightMode, darkMode } from "@/styles/theme";
import CountUp from "react-countup";

const Counter = ({ counter, counterLoading }) => {
    const badge = useColorModeValue(lightMode.badge, darkMode.badge);

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
