import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import members from '@/data/members2';
import { getStaticImage } from '@/lib/getStaticImage';
import type { Member as MemberType } from '@/types';

export default function MemberList() {
  return (
    <Flex h="100%" as="ul" display="flex" flexWrap="wrap" gap="10px">
      {members.map((member) => (
        <Member key={member.id} member={member} />
      ))}
    </Flex>
  );
}

const Member = ({ member }: { member: MemberType }) => {
  const { value, name, greetings } = member;
  const staticImage = getStaticImage(value);
  return (
    <Box
      w="140px"
      as="li"
      listStyleType="none"
      // display="flex"
      // flexDir="column"
      // gap="10px"
      // justifyContent="center"
      // alignItems="center"
    >
      <Link
        href={`/gallery/${value}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box position="relative" width="100px" height="100px">
          <Image
            src={staticImage}
            alt={name}
            fill
            sizes="(max-width: 1000px) 10vw, 15vw"
            quality={100}
            priority
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </Box>
        <Text textAlign="center">{name}</Text>
        <Text fontSize="12px">{`"${greetings}"`}</Text>
      </Link>
    </Box>
  );
};
