import React, { useEffect, useState } from "react";
import NextLink from "next/link";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Divider,
    Text,
    Link,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { lightMode, darkMode } from "@/styles/theme";
import { useEventStore } from "../../store/store";

const MelonVoteModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const [isOpen, setIsOpen] = useEventStore((state) => [
    //     state.isMelonVoteModalOpen,
    //     state.setIsMelonVoteModalOpen,
    // ]);

    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const [modalIsOpen, setModalIsOpen] = useState(true);
    const { colorMode, toggleColorMode } = useColorMode();

    // Theme
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    const handleCloseModal = () => {
        // setModalIsOpen(false);
        // onClose();
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        // setModalIsOpen(true);
        // onOpen();
        setIsOpen(true);
    };

    // 쿠키 설정 함수
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        // expires.setTime(expires.getTime() + minutes * 60 * 1000); // 유효 기간을 분 단위로 설정
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    // 쿠키 가져오기 함수
    const getCookie = (name) => {
        const cookieValue = document.cookie.match(
            `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
        );
        return cookieValue ? cookieValue.pop() : "";
    };

    // useEffect(() => {
    //     const isModalAlreadyOpened = localStorage.getItem(
    //         "isModalAlreadyOpened"
    //     );
    //     if (!isModalAlreadyOpened) {
    //         handleOpenModal();
    //         localStorage.setItem("isModalAlreadyOpened", true);
    //     }
    // }, []);

    useEffect(() => {
        const isModalAlreadyOpened = getCookie("isModalAlreadyOpened");
        if (!isModalAlreadyOpened) {
            handleOpenModal();
            // setCookie("isModalAlreadyOpened", "true", 365); // 쿠키 설정, 유효 기간 365일
            setCookie("isModalAlreadyOpened", "true", 1); // 쿠키 설정, 유효 기간 1일
        }
        console.log("isModalAlreadyOpened", isModalAlreadyOpened);
    }, []);

    return (
        <>
            <Button colorScheme="green" onClick={handleOpenModal}>
                멜론 주간 인기상 투표(~7/2)
            </Button>
            {/* {modalIsOpen && ( */}
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={handleCloseModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <div
                        style={{
                            padding: "16px 24px",
                            textAlign: "left",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        <Text>멜론 주간 인기상 두개재!!!</Text>
                    </div>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold">
                            멜론 주간인기상 투표해 주세요.(왁굳님 공지 돚거)
                        </Text>
                        <Divider />
                        <br />
                        <Text>
                            주간인기상에 이세돌이 후보로 올라갔다고 합니다.{" "}
                        </Text>
                        <Text>​많은 사랑 부탁드립니다.</Text>
                        <br />
                        <Text>
                            (스밍권 있으신 분들은 하루 3번 가능하다고 함)
                            <br />
                            (이용권 없어도 투표 가능) ​
                        </Text>
                        <br />

                        <Link
                            color={highlightColor}
                            href="https://into.melon.com/2023_weekaward"
                            isExternal
                        >
                            https://into.melon.com/2023_weekaward
                            <ExternalLinkIcon mx="2px" />
                        </Link>
                        <br />
                        <br />
                        {/* <Text>모바일 앱 링크</Text>
                        <Link
                            color={highlightColor}
                            href=" https://cafe.naver.com/steamindiegame/11802869"
                            isExternal
                        >
                            https://cafe.naver.com/steamindiegame/11802869
                            <ExternalLinkIcon mx="2px" />
                        </Link>
                        <Divider />
                        <br />
                        <Text>모바일 앱으로 들어가는 방법</Text>
                        <Link
                            color={highlightColor}
                            href=" https://cafe.naver.com/steamindiegame/11802869"
                            isExternal
                        >
                            https://cafe.naver.com/steamindiegame/11802869
                            <ExternalLinkIcon mx="2px" />
                        </Link> */}
                        <Text></Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleCloseModal}
                        >
                            Close
                        </Button>
                        {/* <Button variant="ghost">Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* )} */}
        </>
    );
};

export default MelonVoteModal;
