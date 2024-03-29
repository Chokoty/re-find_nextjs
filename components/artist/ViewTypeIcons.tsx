import { Box, Button, Text } from '@chakra-ui/react';

import { viewTypes } from '@/data/artists';

type Props = {
  selectedView: string | null;
  artist: AuthorCommon;
  component: string;
  onSelectViewType: ((viewType: string) => void) | null;
};

export default function ViewTypeIcons({
  selectedView,
  artist,
  component,
  onSelectViewType,
}: Props) {
  if (!artist) {
    // artist가 null인 경우 예외 처리
    return null;
  }
  // 모든 viewType이 0인지 확인
  const isAllZero = viewTypes.every((viewType) => artist[viewType.value] === 0);

  let align = ['center', 'center', 'center'];
  if (component === 'inIndex') {
    align = ['center', 'center', 'flex-end'];
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={align}
      // justifyContent={['center', 'center', 'flex-end']}
      w="auto"
      flexWrap="wrap"
      gap="0.5rem"
      // pl={['1rem', '0', '0']}
    >
      {isAllZero ? (
        <Text fontSize="md" color="gray.500">
          정보 없음
        </Text>
      ) : (
        viewTypes.map(
          (viewType, index) =>
            artist[viewType.value] !== 0 && (
              <Button
                key={index}
                // colorScheme="blue"
                colorScheme={viewType.colorScheme}
                variant={
                  // sortCriteria?.field === viewType.value ? 'solid' : 'outline'
                  selectedView === null || selectedView !== viewType.value
                    ? 'outline'
                    : 'solid'
                }
                size="sm"
                display="flex"
                flexDirection={['row', 'row', 'column']}
                h={['2rem', '2rem', '3rem']}
                gap={['0.5rem', '0.5rem', '0']}
                onClick={() => {
                  if (!onSelectViewType) return;
                  onSelectViewType(viewType.value);
                }}
              >
                <Text fontSize="sm">{viewType.name}</Text>
                <Text fontSize="md"> {artist[viewType.value]}</Text>
              </Button>
            )
        )
      )}
    </Box>
  );
}
