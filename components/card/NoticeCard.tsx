import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Card,
  CardFooter,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  date: string;
  type?: string;
  content: string;
  directLink?: string;
};

export default function NoticeCard({ date, type, content, directLink }: Props) {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  return (
    <Card
      width="100%"
      maxW="700px"
      p="1rem"
      background={bg2}
      borderRadius="0.75rem"
    >
      <Text textAlign="left" p="0" fontSize="md">
        {type} {content}
      </Text>
      <CardFooter mt="0.5rem" p="0">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" textAlign="left">
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
}
