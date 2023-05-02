import React from "react";
import { Text } from "@chakra-ui/react";
import OtherLayout from "./layout/other-layout";

const SupportPage = () => {
    return (
        <OtherLayout title="Support">
            <Text>버그 제보: 여기를 클릭하세요</Text>
            <Text>기타 문의: 여기를 클릭하세요</Text>
        </OtherLayout>
    );
};

export default SupportPage;
