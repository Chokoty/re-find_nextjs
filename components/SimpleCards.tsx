import React, { useState } from 'react';
import NextImage from 'next/image';
import {
  Flex,
  Button,
  Box,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useResponsiveLink } from '../hook/useResponsiveLink';
import { useUploadTimeDiff } from '../hook/useUploadTimeDiff';

import { HiOutlineExternalLink } from 'react-icons/hi';
const SimpleCard = ({ artwork, isFocused, onToggleFocus }) => {
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const [imageHeight, setImageHeight] = useState(null);
  const uploadTimeDiff = useUploadTimeDiff(artwork.date);

  const handleImageLoad = (e) => {
    setImageHeight(e.target.height);
  };

  return (
    <Link
      key={artwork.id}
      href={
        artwork.url === '' ? '#' : article_link + artwork.url.split('/').pop()
      }
      isExternal
      _hover={{ textDecoration: 'none' }}
      target="_blank"
      rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
    >
      <Box
        key={artwork.id}
        m="8px"
        w={['180px', '236px']}
        h={['120px', '157px']}
        alignItems="center"
        overflow="hidden"
        flexWrap="wrap"
        borderRadius="1rem"
      >
        <Box
          h={['100px', '157px']}
          borderRadius="1rem"
          //  border="2px solid #000"
          position="relative"
        >
          <Flex
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box w={['180px', '157px']} h={['150px', '157px']}>
              <NextImage
                alt={artwork.title}
                width={300}
                height={300}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  // objectPosition: 'center -2rem',
                  width: '100%',
                  height: '100%',
                }}
                src={
                  artwork.img_url === ''
                    ? 'http://via.placeholder.com/252x157'
                    : artwork.deleted
                    ? `/api/blurImage?url=${artwork.img_url}`
                    : artwork.img_url
                }
                unoptimized
              />
            </Box>
            {artwork.img_url_list.length == 1 && (
              <Flex flexDir="column" gap="0.2rem">
                <Box
                  w={['50px', '76px']}
                  h={['50px', '76px']}
                  background="#E0E0E0"
                ></Box>
                <Box
                  w={['50px', '76px']}
                  h={['50px', '76px']}
                  background="#E0E0E0"
                ></Box>
              </Flex>
            )}
            {artwork.img_url_list.length > 1 && (
              <Flex flexDir="column" gap="0.2rem">
                {artwork.img_url_list.slice(1, 3).map((imgUrl, index) => (
                  <Box
                    key={index}
                    w={['50px', '76px']}
                    h={['50px', '76px']}
                    background="#E0E0E0"
                  >
                    <NextImage
                      alt={artwork.title}
                      width={300}
                      height={300}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        // objectPosition: 'center -2rem',
                        width: '100%',
                        height: '100%',
                      }}
                      src={imgUrl}
                      unoptimized
                    />
                  </Box>
                ))}
                {artwork.img_url_list.length == 2 && (
                  <Box
                    w={['50px', '76px']}
                    h={['50px', '76px']}
                    background="#E0E0E0"
                  ></Box>
                )}
              </Flex>
            )}
          </Flex>

          <Box
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            borderRadius="1rem"
            _hover={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // 검은색의 30% 투명도
            }}
            zIndex={1}
          />
        </Box>
        <Box p="0.5rem">
          <Text
            fontSize={['sm', 'xl']}
            fontWeight="600"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="100%"
          >
            {artwork.title}
          </Text>
          <Text fontSize={['xs', 'sm']}>{artwork.board}</Text>
        </Box>
      </Box>
      <Box>
        <Text fontSize={['md', 'xl']} fontWeight={600} p="0 1rem">
          {artwork.title}
        </Text>
        <Flex p="0 1rem" gap="0.5rem">
          <Text fontSize={['xs', 'sm']} fontWeight={300}>
            팬아트 {artwork.img_url_list.length}개
          </Text>
          <Text fontSize={['xs', 'sm']} fontWeight={300}>
            {uploadTimeDiff}
          </Text>
        </Flex>
      </Box>
    </Link>
    // <Box
    //   w={widthValue}
    //   pb="16px"
    //   display="inline-block"
    //   position="relative"
    //   key={artwork.id}
    //   m="0 1rem"
    // >
    //   <Box position="relative">
    //     <Box
    //       width={widthValue}
    //       overflow="hidden"
    //       borderRadius="1rem"
    //       position="relative"
    //     >
    //       <NextImage
    //         alt={artwork.title}
    //         width={236}
    //         height={236}
    //         style={{
    //           objectFit: 'cover',
    //           objectPosition: 'center top',
    //           width: '100%',
    //           height: '100%',
    //           borderRadius: '1rem',
    //           filter: artwork.deleted ? 'blur(6px)' : 'none', // 블러 처리
    //         }}
    //         src={
    //           artwork.img_url === ''
    //             ? 'http://via.placeholder.com/236x236'
    //             : artwork.deleted
    //             ? `/api/blurImage?url=${artwork.img_url}`
    //             : artwork.img_url
    //         }
    //         unoptimized
    //         onLoad={handleImageLoad}
    //       />
    //     </Box>
    //     <Box
    //       position="absolute"
    //       top={0}
    //       right={0}
    //       bottom={0}
    //       left={0}
    //       borderRadius="1rem"
    //       zIndex={1}
    //       background={isFocused ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.0)'}
    //       onClick={() => onToggleFocus(artwork.id)}
    //       onMouseEnter={() => onToggleFocus(artwork.id)}

    //       // _hover={{
    //       //   backgroundColor: 'rgba(0, 0, 0, 0.3)', // 검은색의 30% 투명도
    //       //   cursor: 'pointer',
    //       // }}
    //     />
    //     {isFocused && (
    //       <Flex
    //         flexDir="column"
    //         position="absolute"
    //         top={0}
    //         right={0}
    //         bottom={0}
    //         left={0}
    //         borderRadius="1rem"
    //         zIndex={2}
    //         background="rgba(0, 0, 0, 0.3)"
    //         justifyContent="space-between"
    //         alignItems="center"
    //         color="white"
    //         fontSize="2rem"
    //         fontWeight="bold"
    //         cursor="pointer"
    //         p={['0.5rem ', '1rem 0']}
    //         onMouseLeave={() => onToggleFocus(null)}
    //       >
    //         <Text
    //           fontSize={['sm', 'xl']}
    //           fontWeight="600"
    //           whiteSpace="nowrap"
    //           overflow="hidden"
    //           textOverflow="ellipsis"
    //           maxWidth="100%"
    //         >
    //           {artwork.board}
    //         </Text>

    //         {imageHeight >= 200 && (
    //           <>
    //             <Text
    //               fontSize={['sm', 'xl']}
    //               fontWeight="300"
    //               whiteSpace="nowrap"
    //               overflow="hidden"
    //               textOverflow="ellipsis"
    //               maxWidth="100%"
    //               textAlign="center"
    //             >
    //               {artwork.date.split(' ')[0].slice(0, -1)}
    //             </Text>
    //             <Flex
    //               flexDir="row"
    //               justifyContent="center"
    //               alignItems="center"
    //               textAlign="center"
    //               w="90%"
    //             >
    //               <Text fontSize={['sm', 'xl']} fontWeight="300">
    //                 조회수{' '}
    //                 {artwork.view === 0
    //                   ? '0'
    //                   : artwork.view
    //                       .toString()
    //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    //               </Text>
    //               <Text fontSize={['sm', 'xl']} fontWeight="300">
    //                 좋아요{' '}
    //                 {artwork.like === 0
    //                   ? '0'
    //                   : artwork.like
    //                       .toString()
    //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    //               </Text>
    //               <Text fontSize={['sm', 'xl']} fontWeight="300">
    //                 댓글수{' '}
    //                 {artwork.comment === 0
    //                   ? '0'
    //                   : artwork.comment
    //                       .toString()
    //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    //               </Text>
    //             </Flex>{' '}
    //           </>
    //         )}
    //         {imageHeight < 200 && (
    //           <>
    //             {imageHeight > 140 && (
    //               <Text
    //                 fontSize={['xs', 'sm']}
    //                 fontWeight="300"
    //                 whiteSpace="nowrap"
    //                 overflow="hidden"
    //                 textOverflow="ellipsis"
    //                 maxWidth="100%"
    //                 textAlign="center"
    //               >
    //                 {artwork.date.split(' ')[0].slice(0, -1)}
    //               </Text>
    //             )}

    //             <Flex
    //               flexDir="row"
    //               justifyContent="center"
    //               alignItems="center"
    //               textAlign="center"
    //               w="90%"
    //             >
    //               <Text fontSize={['xs', 'sm']} fontWeight="300">
    //                 조
    //                 {artwork.view === 0
    //                   ? '0'
    //                   : artwork.view
    //                       .toString()
    //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
    //                 &nbsp;
    //               </Text>
    //               <Text fontSize={['xs', 'sm']} fontWeight="300">
    //                 좋{' '}
    //                 {artwork.like === 0
    //                   ? '0'
    //                   : artwork.like
    //                       .toString()
    //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
    //                 &nbsp;
    //               </Text>
    //               <Text fontSize={['xs', 'sm']} fontWeight="300">
    //                 댓{' '}
    //                 {artwork.comment === 0
    //                   ? '0'
    //                   : artwork.comment
    //                       .toString()
    //                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
    //                 &nbsp;
    //               </Text>
    //             </Flex>
    //           </>
    //         )}

    //         <Flex
    //           w="100%"
    //           flexDir="row"
    //           justifyContent="center"
    //           alignItems="center"
    //           // p="0 1rem"
    //           // justifyContent="flex-end"
    //           // alignItems="flex-end"
    //         >
    //           <Button
    //             as={Link}
    //             href={
    //               artwork.url === ''
    //                 ? '#'
    //                 : article_link + artwork.url.split('/').pop()
    //             }
    //             isExternal
    //             _hover={{
    //               textDecoration: 'none',
    //               cursor: 'pointer',
    //               backgroundColor: 'green.400',
    //             }}
    //             target="_blank"
    //             rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
    //             colorScheme="green"
    //             borderRadius="2rem"
    //             w="60%"
    //             // w={['100px', '150px']}
    //             h={['1.5rem', '3rem']}
    //           >
    //             <Text fontSize={['xs', 'md']}>왁물원</Text> &nbsp;
    //             <HiOutlineExternalLink />
    //           </Button>
    //         </Flex>
    //       </Flex>
    //     )}
    //   </Box>
    //   <Box>
    //     <Text fontWeight={500} p="0.5rem 0">
    //       {artwork.title}
    //     </Text>
    //   </Box>
    // </Box>
  );
};

export default SimpleCard;
