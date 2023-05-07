import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import CountUp from "react-countup";
import { lightMode, darkMode } from "@/styles/theme";
import { Skeleton } from "@chakra-ui/react";

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
