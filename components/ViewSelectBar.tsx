import React from 'react';

import {
  Text,
  Box,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdOutlineDashboard,
  MdOutlineGridView,
  MdMoreHoriz,
  MdOutlineViewDay,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

import { useShowShadow } from '../hook/useShowShadow';
import { lightMode, darkMode } from '@/styles/theme';

interface ViewSelectBarProps {
  selectedMenu: string;
  onViewChange;
  onMenuItemClick: (menuText: string) => void;
}

const ViewSelectBar = ({
  activeView,
  onViewChange,
  selectedMenu,
  onMenuItemClick,
  isDeletedVisible,
  handleShowDeleted,
}) => {
  const [isSmallerThan370] = useMediaQuery('(max-width: 400px)');

  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자
  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);

  const showShadow = useShowShadow(386, 0);

  return (
    <Flex // 뷰 선택 버튼
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      h="60px"
      // mt="2rem"
      p="0.5rem 1rem"
      mb="1rem"
      gap="0.5rem"
      position="sticky"
      top="64px"
      zIndex="90"
      w="100%"
      boxShadow={showShadow ? boxShadow : 'none'}
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
    >
      <Box
        w={isSmallerThan370 ? '40px' : '120px'}
        display="flex"
        justifyContent="flex-start"
      >
        <Menu>
          <MenuButton
            variant="ghost"
            as={Button}
            rightIcon={<MdOutlineKeyboardArrowDown />}
          >
            {!isSmallerThan370 && selectedMenu}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => onMenuItemClick('최신순')}>
              최신순
            </MenuItem>
            <MenuItem onClick={() => onMenuItemClick('업로드순')}>
              업로드순
            </MenuItem>
            <MenuItem onClick={() => onMenuItemClick('좋아요순')}>
              좋아요순
            </MenuItem>
            <MenuItem onClick={() => onMenuItemClick('조회수순')}>
              조회수순
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Button
          variant={activeView === 'masonryView' ? 'solid' : 'ghost'}
          onClick={() => onViewChange('masonryView')}
        >
          <MdOutlineDashboard size="24px" />
        </Button>
        <Button
          variant={activeView === 'gridView' ? 'solid' : 'ghost'}
          onClick={() => onViewChange('gridView')}
        >
          <MdOutlineGridView size="24px" />
        </Button>
      </Box>
      <Popover>
        <PopoverTrigger>
          <Box
            w={isSmallerThan370 ? '40px' : '120px'}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              w="2.5rem"
              h="2.5rem"
              p="0"
              borderRadius="full"
              variant="ghost"
            >
              <MdMoreHoriz size="24px" />
            </Button>
          </Box>
        </PopoverTrigger>
        <PopoverContent w="180px">
          <PopoverBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Text p="0.5rem" fontSize="sm">
              뷰 옵션
            </Text>

            {/* <Button colorScheme="gray" w="100%" variant="ghost">
          <Text w="100%" textAlign="left">
            Button
          </Text>
        </Button> */}
            <Button
              w="100%"
              variant="ghost"
              textAlign="left"
              onClick={handleShowDeleted}
            >
              <Text w="100%" textAlign="left">
                삭제된 게시글 {isDeletedVisible ? '숨기기' : '보이기'}
              </Text>
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {/* <Button
    variant={activeView === 'listView' ? 'solid' : 'ghost'}
    onClick={() => handleViewChange('listView')}
  >
    <MdOutlineViewDay size="24px" />
  </Button> */}
    </Flex>
  );
};

export default ViewSelectBar;
