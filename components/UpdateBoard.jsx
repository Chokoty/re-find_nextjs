import React, { useState } from "react";
import { Heading, Text } from "@chakra-ui/react";

import UpdateCard from "./UpdateCard";

const UpdateBoard = ({ last_update_info, color }) => {
    return (
        <div
            className="update-info"
            style={{
                marginTop: "3em",
                display: "grid",
                // display: "flex", -> ios14 아래 지원 안됨
                // flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                placeItems: "center",
                gridGap: "1em",
                gap: "1em",
            }}
        >
            <Heading
                as="h1"
                size="md"
                mb="20px"
                textTransform="uppercase"
                color={color}
            >
                현재 아래 게시글까지 반영되었어요!
            </Heading>
            {last_update_info.map((update, index) => (
                <UpdateCard key={index} update={update} />
            ))}
            <Text whiteSpace="normal">
                명시된 게시판에 있는 원본만 찾을 수 있습니다.
            </Text>
        </div>
    );
};

export default UpdateBoard;
