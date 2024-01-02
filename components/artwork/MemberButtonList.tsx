import { Box, Button, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const MemberButtonList = ({ members, type, range, selected, setSelected }) => {
  const router = useRouter();

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
      return;
    }
    // console.log(value);
    setSelected(value);
  };

  return (
    <Box
      m="2rem auto"
      w="94%"
      mb="2rem"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      maxW="540px"
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
              colorScheme={selected === member.value ? 'green' : 'gray'}
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
