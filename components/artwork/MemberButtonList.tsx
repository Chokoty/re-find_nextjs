import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import members from '@/data/members';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  type: string;
  range: { start: number; end: number };
  selected: string | null;
  setSelected: ((value: string) => void) | null;
  isdPick: boolean;
};

export default function MemberButtonList({
  type,
  range,
  selected,
  setSelected,
}: Props) {
  const bg4 = useColorModeValue(lightMode.bg4, darkMode.bg4);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);

  const onClickSort = (value: string) => {
    if (!setSelected) return;
    if (selected === value) {
      setSelected('isd');
      return;
    }
    // console.log(value);
    setSelected(value);
  };

  // const getButtonBackground = (member) => {
  //   if (selected === member.memberValue) {
  //     return member.personalColor;
  //   }
  //   return '';
  // };

  // const getButtonColor = (member) => {
  //   if (selected === member.memberValue) {
  //     return color2;
  //   }
  //   return color;
  // };

  // const getButtonHoverStyles = (member) => {
  //   if (selected === member.memberValue) {
  //     return {
  //       background: member.personalColor,
  //       color: color2,
  //     };
  //   }
  //   return {
  //     background: bg4,
  //     color: color2,
  //   };
  // };

  return (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="center"
      paddingY="2rem"
      paddingX="1rem"
      width="100%"
    >
      <Box
        // m="2rem auto"
        // mb="2rem"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        // w="100%"
        // maxW="680px"
        gap="0.5rem"
        as="ul"
        overflowX="scroll" // 가로 스크롤 적용
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
              {type === 'link' ? (
                <Link href={`/gallery/${member.value}`} key={index}>
                  <Box
                    whiteSpace="nowrap"
                    py="0.4rem"
                    px="0.9rem"
                    border="1px solid #ffffff29"
                    borderRadius="1rem"
                    transition="all 0.2s ease-in-out"
                    background={
                      selected === member.value ? member.personalColor : ''
                    }
                    color={selected === member.value ? color2 : ''}
                    _hover={
                      selected === member.value
                        ? {
                            background: member.personalColor,
                            color,
                          }
                        : {
                            background: member.personalColor2,
                            color: color2,
                          }
                    }
                    // variant="outline"
                  >
                    <Text
                      fontSize={['md', 'xl']}
                      fontWeight="bold"
                      textAlign="left"
                    >
                      {member.name}
                    </Text>
                  </Box>
                </Link>
              ) : (
                <Button
                  key={index}
                  p="1rem"
                  borderRadius="1rem"
                  onClick={() => onClickSort(member.value)}
                  background={
                    selected === member.value ? member.personalColor : ''
                  }
                  color={selected === member.value ? color2 : ''}
                  // _hover={getButtonHoverStyles(member)}
                  _hover={
                    selected === member.value
                      ? {
                          background: member.personalColor,
                          color,
                        }
                      : {
                          background: member.personalColor2,
                          color: color2,
                        }
                  }
                  variant="outline"
                >
                  <Text
                    fontSize={['md', 'xl']}
                    fontWeight="bold"
                    textAlign="left"
                  >
                    {member.name}
                  </Text>
                </Button>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
}
