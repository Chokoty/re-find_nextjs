import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

const MemberButtonList = ({
  members,
  type,
  range,
  selected,
  setSelected,
  isdPick,
}) => {
  const router = useRouter();
  const bg4 = useColorModeValue(lightMode.bg4, darkMode.bg4);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);

  const onClick = (value) => {
    if (type === 'link') {
      onClickLink(value);
    } else if (type === 'sort') {
      onClickSort(value);
    }
  };
  const onClickLink = (value) => {
    // console.log(value);

    router.push(
      {
        pathname: `/artworks/${value}`,
        query: { subTitle: value },
      },
      `/artworks/${value}`

      // {
      //   pathname: `/artworks/${id}`,
      //   if id === 0 -> sub
      //   pathname: `/artworks/${id === 0 ? sub : id}`,
      //   query: { subTitle },
      // },
      // `/artworks/${value}`
    );
  };

  const onClickSort = (value) => {
    if (selected === value) {
      setSelected('isd');
      return;
    }
    // console.log(value);
    setSelected(value);
  };

  return (
    <Box
      m="2rem auto"
      // pl={['0.5rem', '1rem', '2rem']}
      // pl="0.5rem"
      w="94%"
      mb="2rem"
      display="flex"
      justifyContent="flex-start"
      // justifyContent={isdPick === true ? 'center' : 'flex-start'}
      alignItems="center"
      maxW="680px"
      overflowX="scroll" // 세로 스크롤 적용
      gap="0.5rem"
      as="ul"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none' /* IE and Edge */,
        'scrollbar-width': 'none' /* Firefox */,
      }}
    >
      {range &&
        members
          .slice(0, range.start)
          .map((member, index) => (
            <Box
              w="60px"
              as="li"
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Box>
          ))}
      {range &&
        members.slice(range.start, range.end).map((member, index) => (
          <Box
            as="li"
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              key={index}
              p="1rem"
              borderRadius="1rem"
              onClick={() => onClick(member.value)}
              background={selected === member.value ? member.personalColor : ''}
              color={selected === member.value ? color2 : ''}
              _hover={
                selected === member.value
                  ? {
                      background: member.personalColor,
                      color,
                    }
                  : {
                      background: bg4,
                      color: color2,
                    }
              }
              // colorScheme={
              //   selected === member.value ? : 'gray'
              // }
              variant="outline"
            >
              <Text fontSize="xl" fontWeight="bold" textAlign="left">
                {member.name}
              </Text>
            </Button>
          </Box>
        ))}
      {!range &&
        members.map((member, index) => (
          // <NextLink key={index} href={`/artworks/${member.value}`}>
          <Box
            as="li"
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              key={index}
              p="1rem"
              borderRadius="1rem"
              onClick={() => onClick(member.value)}
            >
              <Text fontSize="xl" fontWeight="bold" textAlign="left">
                {member.name}
              </Text>
            </Button>
          </Box>

          // </NextLink>
        ))}
    </Box>
  );
};

export default MemberButtonList;
