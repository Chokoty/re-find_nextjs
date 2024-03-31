import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import gallery from '@/data/gallery';
import DansokGu from '@/public/단속구.gif';
import DomHwangCha from '@/public/돔황챠.png';
import SoWhat from '@/public/어쩔.png';
import { darkMode, lightMode } from '@/styles/theme';

export default function AlbumGrid() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const highlight2 = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Box
      m="0 auto"
      mt="1rem"
      w="94%"
      mb="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w={['100%', '90%']}
        minChildWidth={['150px', '200px']} // 모바일에서는 150px, 그 외에서는 200px
        spacing={['0.5rem', '0.75rem']}
        justifyContent="center"
        alignItems="center"
        placeItems="center"
        m="0 auto"
      >
        {gallery
          .filter((item) => item?.isHidden !== true)
          .slice()
          .reverse()
          .map((item, index) =>
            item.value === 'Shuko' ? (
              <Box
                p="1rem"
                m={['0', '0.5rem']}
                mb="1rem"
                w={['158px', '200px']}
                h={['158px', '200px']}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                background={item.type === 'special' ? highlight2 : bg2}
                borderRadius="1rem"
                boxShadow="md"
                _hover={{
                  background: '#ffffff29',
                  cursor: 'pointer',
                }}
                transition="all 0.2s ease-in-out"
                key={index}
                onClick={onOpen}
              >
                <Text
                  fontSize={['md', 'xl']}
                  fontWeight="bold"
                  textAlign="left"
                >
                  {item.title}
                </Text>
                {/* <Button onClick={onOpen}>Open Popup</Button> */}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <Text fontSize={['md', 'xl']} color="red">
                        잠깐!!!!!! 단속 나왔스빈다
                      </Text>
                    </ModalHeader>
                    <Box
                      m="0 auto"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={DansokGu}
                        alt="단속구"
                        width={300}
                        height={300}
                        unoptimized
                      />
                    </Box>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text
                        fontSize={['md', 'xl']}
                        fontWeight="bold"
                        textAlign="left"
                      >
                        앗 단속구를 마주쳤다! 당신의 선택은?
                      </Text>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        gap="2rem"
                        m="1rem auto"
                        w="100%"
                      >
                        <Link
                          style={{
                            background: '#e2e8f0',
                            width: '6rem',
                            height: '6rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '6px',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                          }}
                          href={'/gallery/Shuko'}
                        >
                          <Image
                            src={SoWhat}
                            alt="어쩔"
                            width={100}
                            height={100}
                            objectFit="cover"
                            unoptimized
                          />
                        </Link>
                        <Link
                          href={'/gallery/AprilFool'}
                          style={{
                            background: '#e2e8f0',
                            width: '6rem',
                            height: '6rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '6px',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                          }}
                        >
                          <Image
                            src={DomHwangCha}
                            alt="돔황챠"
                            width={100}
                            height={100}
                            objectFit="cover"
                            unoptimized
                          />
                        </Link>
                      </Box>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            ) : (
              <Link href={`/gallery/${item.value}`} key={index}>
                <Box
                  p="1rem"
                  m={['0', '0.5rem']}
                  mb=" 1rem"
                  w={['158px', '200px']}
                  h={['158px', '200px']}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  background={item.type === 'special' ? highlight2 : bg2}
                  borderRadius="1rem"
                  boxShadow="md"
                  _hover={{
                    background: '#ffffff29',
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Text
                    fontSize={['md', 'xl']}
                    fontWeight="bold"
                    textAlign="left"
                  >
                    {item.title}
                  </Text>
                </Box>
              </Link>
            )
          )}
      </SimpleGrid>
    </Box>
  );
}
