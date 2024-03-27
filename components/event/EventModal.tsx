import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
// import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useShallow } from 'zustand/react/shallow';
import { useImageUploadStore } from '@/store/imageUploadStore';

import { TARGET_COUNT } from '@/lib/const';

export default function EventModal() {
  const targetCountText = TARGET_COUNT.toString().slice(0, 1);
  const { isEventActive, setIsEventActive } = useImageUploadStore(
    useShallow((state) => ({
      isEventActive: state.isEventActive,
      setIsEventActive: state.setIsEventActive,
    }))
  );
  const handleCloseModal = () => {
    setIsEventActive(false);
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isEventActive}
      onClose={handleCloseModal}
    >
      <Confetti width={2000} height={2000} />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          리파인드 누적검색량 {targetCountText}만 돌파 기념 기습 이벤트
        </ModalHeader>
        <ModalBody>
          <Text>축하드립니다!</Text>
          <Text>
            팬아트 검색을 이용하신 {targetCountText}만 번째 이파리로
            당첨되셨습니다!!!
          </Text>
          <Divider orientation="horizontal" m="2" />
          <Text color="#ef5a9a">
            이 이벤트 창은 정확히 딱 한 분에게만 보이는 페이지입니다!!
          </Text>
          <Text color="#ef5a9a">
            본 팝업창은 1회만 뜨기 때문에 실수로 새로고침하거나 닫지 않도록
            해주세요!
          </Text>
          <Divider orientation="horizontal" m="2" />
          <Text>저희 리파인드를 이용해주셔서 감사합니다.</Text>
          <Text>
            당첨되신 분께서는 현재 뜬 팝업창을 캡쳐하고 아래 숨겨진 텍스트를
            드래그하여 인증해 주시면 작은 선물을 드릴 예정입니다.
          </Text>
          <br />
          드래그해서 보기:{' '}
          <span className="hidden-text">원대한 꿈이 있잖아~</span>
          <br />
          <br />
          <Text>
            <span style={{ color: '#ef5a9a' }}>rerurureruru@gmail.com</span>{' '}
            또는
            <br />
            리파인드 소개 페이지 내 초코널 밀크티 개발자 프로필에서{' '}
            <span style={{ color: '#ef5a9a' }}>왁물원 쪽지</span>
            또는
            <br /> 문의, 지원 페이지 내{' '}
            <span style={{ color: '#ef5a9a' }}>기타 문의</span>를 통해
            보내주시면 감사하겠습니다.
          </Text>
          <Divider orientation="horizontal" m="2" />
          <Text>
            저희 서비스를 이용하면서 불편했던 점이나 <br />
            개선했으면 하는 점을 같이 공유해주시면 감사하겠습니다.
          </Text>
          <Text>
            조만간 팬아트를 통한 새로운 컨텐츠와 소소한 이벤트를 진행해 볼
            예정이니 많은 관심 부탁드립니다. 킹아!
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" onClick={handleCloseModal}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
