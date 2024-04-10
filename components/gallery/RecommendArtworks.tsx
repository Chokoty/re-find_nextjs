'use client';

import { Box, Button, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import RecommendList from './RecommendList';

const AP = [0.5, 1.0, 1.5];

const buttonStyle = [
  {
    background: 'rgba(135, 199, 124, 0.53)',
    border: '4px solid rgba(135, 199, 124)',
    size: '50px',
    location: 'left',
    iconSize: '16px',
  },
  {
    background: 'rgba(157, 157, 157, 0.53)',
    border: '4px solid rgba(157, 157, 157)',
    size: '38px',
    location: 'center',
    iconSize: '12px',
  },
  {
    background: 'rgba(177, 128, 239, 0.53)',
    border: '4px solid rgba(177, 128, 239)',
    size: '50px',
    location: 'right',
    iconSize: '16px',
  },
];

export default function RecommendArtworks() {
  const [paramStep, setParamStep] = useState([false, true, false]); // 대중픽, 기본픽, 나작픽
  const getAp = () => {
    return AP[paramStep.findIndex((v) => v)];
  };
  const handleButtonClick = (buttonPosition: string) => {
    if (buttonPosition === 'left') {
      setParamStep([true, false, false]);
    } else if (buttonPosition === 'center') {
      setParamStep([false, true, false]);
    } else {
      setParamStep([false, false, true]);
    }
  };
  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      mt="62px"
    >
      <Heading as="h4" size="md">
        유사 이미지 추천
      </Heading>
      <Box
        mt="1rem"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Text>관련된 추천 게시글을 주세요</Text> */}
        <Box
          display="flex"
          flexDir="row"
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip label="좋아요 패턴이 비슷한 게시글을 추천">
            <Text fontSize={['sm', 'md']}>대중픽</Text>
          </Tooltip>
          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
            gap={['1rem', '1.7rem']}
            mx={['0.5rem', '1rem']}
          >
            {AP.map((_, i) => (
              <Button
                key={i}
                padding="0"
                background={paramStep[i] ? buttonStyle[i].background : 'white'}
                border={buttonStyle[i].border}
                borderRadius="800px"
                width={buttonStyle[i].size}
                height={buttonStyle[i].size}
                onClick={() => handleButtonClick(buttonStyle[i].location)}
              >
                {paramStep[i] && <FaCheck size={buttonStyle[i].iconSize} />}
              </Button>
            ))}
          </Box>
          <Tooltip label="좋아요 패턴이 잘 안 겹치는 게시글을 추천">
            <Text fontSize={['sm', 'md']}>나작픽</Text>
          </Tooltip>
        </Box>
      </Box>
      <RecommendList getAp={getAp} />
    </Box>
  );
}
