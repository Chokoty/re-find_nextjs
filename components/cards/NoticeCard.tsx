import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Card,
  CardFooter,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

interface NoticeCardProps {
  date: string;
  type?: string;
  content: string;
  directLink?: string;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  date,
  type,
  content,
  directLink,
}) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);

  return (
    <Card
      width="100%"
      maxW="608px"
      p="1rem"
      boxShadow="2xl"
      background={color2}
      borderRadius="0.75rem"
    >
      <Text textAlign="left" p="0" fontSize="sm">
        {type} {content}
      </Text>
      <CardFooter mt="0.5rem" p="0">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" textAlign="left">
            {date}
          </Text>
          {directLink && (
            <Link
              className="link-to-wakzoo"
              href={directLink}
              isExternal
              color={highlightColor}
            >
              <Text fontSize="sm" textAlign="left">
                링크 <ExternalLinkIcon mx="2px" />
              </Text>
            </Link>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default NoticeCard;
