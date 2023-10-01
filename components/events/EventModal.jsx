import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
// import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const EventModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleCloseModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      {modalIsOpen && (
        <Modal
          closeOnOverlayClick={false}
          isOpen={modalIsOpen}
          // onClose={onClose}
          onClose={handleCloseModal}
        >
          <Confetti width={2000} height={2000} />
          <ModalOverlay />
          <ModalContent>
            <div
              style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              리파인드 누적검색량 2만돌파 기념 깜짝 이벤트
            </div>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <Text>축하드립니다!</Text>
              <Text>
                팬아트 검색을 이용하신 2만 번째 이파리로 당첨되셨습니다!!!
              </Text>
              <Divider orientation="horizontal" m="2" />
              <Text color="#ef5a9a">
                이 이벤트 창은 딱 한 분에게만 보이는 페이지입니다!!
              </Text>
              <Text color="#ef5a9a">
                본 팝업창은 1회만 뜨기 때문에 실수로 새로고침하거나 닫지 않도록
                해주세요!
              </Text>
              <Divider orientation="horizontal" m="2" />
              <Text>저희 리파인드를 이용해주셔서 감사합니다.</Text>
              <Text>
                당첨되신 분께서는 현재 뜬 팝업창을 캡쳐하고 아래 숨겨진 텍스트를
                드래그하여 찾아서 메일로 보내주시면 작은 선물을 드릴 예정입니다.
              </Text>
              <br />
              드래그해서 보기:{' '}
              <span className="hidden-text">이세돌 3집 화이팅!!!</span>
              <br />
              <br />
              메일 rerurureruru@gmail.com 또는 <br />
              About의 개발자 프로필에서 왁물원 쪽지 또는 <br />
              Support의 기타문의를 통해 보내주시면 감사하겠습니다. <br />
              <Divider orientation="horizontal" m="2" />
              <Text>
                이제 왁물원에 있는 대부분의 팬아트들이 검색이 가능하여 <br />
                -왁타버스 팬아트 출처찾기-로 확장할 예정입니다.
              </Text>
              <Text>
                앞으로 팬아트를 통한 새로운 컨텐츠와 소소한 이벤트를 진행해 볼
                예정이니 많은 관심 부탁드립니다. 킹아!
              </Text>
              <Divider orientation="horizontal" m="2" />
              <Text>나가시려면 새로고침 하시면 됩니다.</Text>
            </ModalBody>

            <ModalFooter>
              {/* <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button> */}
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EventModal;
