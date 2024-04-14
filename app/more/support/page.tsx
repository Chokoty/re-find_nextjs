'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import { BsChatDots } from 'react-icons/bs';
import { FaBug } from 'react-icons/fa';

import MoreLayout from '@/app/more/components/ui/Layout/MoreLayout';
import { SUPPORT_INFOS } from '@/app/more/lib/const';

export default function Support() {
  return (
    <MoreLayout title="Support">
      <Box className="toLink" pb="15rem">
        {SUPPORT_INFOS.map((info, index) => (
          <Box className="area" mt="5rem" key={index}>
            <Button
              href={info.url}
              as="a"
              target="_blank"
              boxShadow="md"
              borderWidth="1px"
              borderRadius="lg"
              width="160px"
              height="144px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              {index % 2 ? <BsChatDots size="60px" /> : <FaBug size="60px" />}
              <Text fontSize="2xl" mt="1.5rem">
                {info.title}
              </Text>
            </Button>
          </Box>
        ))}
      </Box>
    </MoreLayout>
  );
}
