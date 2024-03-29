import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  MdMoreHoriz,
  MdOutlineDashboard,
  MdOutlineGridView,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

import { menuItems } from '@/data/artists';
import { useShowShadow } from '@/hook/useShowShadow';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  activeView: string;
  onViewChange: (view: string) => void;
  selectedMenu: string;
  onMenuItemClick: (menuText: string) => void;
  isDeletedVisible: boolean;
  handleShowDeleted: () => void;
  topOffset: number;
  isdPick: boolean;
};

export default function ViewSelectBar({
  activeView,
  onViewChange,
  selectedMenu,
  onMenuItemClick,
  isDeletedVisible,
  handleShowDeleted,
  topOffset,
  isdPick,
}: Props) {
  // const isMobile = useResponsive();

  // const [topPosition, setTopPosition] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);
  const [isSmallerThan370] = useMediaQuery('(max-width: 480px)');
  const [label, setLabel] = useState('알잘딱순');

  // const selectedLabel = menuItems.find(
  //   (item) => item.id === selectedMenu
  // )?.label;

  // const handlePopoverOpen = () => {
  //   setIsOpen(true);
  // };

  // const handlePopoverClose = () => {
  //   setIsOpen(false);
  //   handleShowDeleted();
  // };

  const { onClose } = useDisclosure();

  const bgColor = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자
  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);

  const showShadow = useShowShadow(386, 0);

  // useEffect(() => {
  //   if (usingPage === 'gallery') {
  //     setTopPosition(0);
  //   }
  //   if (usingPage === 'artist') {
  //     if (isMobile) {
  //       setTopPosition(0);
  //     } else {
  //       setTopPosition(57);
  //     }
  //   }
  // }, [usingPage]);

  useEffect(() => {
    const newLabel =
      menuItems.find((item) => item.id === selectedMenu)?.label ?? '알잘딱순';
    setLabel(newLabel);
  }, [selectedMenu]);

  return (
    <Flex // 뷰 선택 버튼
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      p="0.5rem 1rem"
      mb="1rem"
      gap="2rem"
      position="sticky"
      // top={isMobile ? '0' : '57px'}
      top={`${topOffset}px`}
      zIndex="90"
      w="100%"
      boxShadow={showShadow ? boxShadow : 'none'}
      style={{
        backgroundColor: bgColor,
        color,
      }}
    >
      <Box
        w={isSmallerThan370 ? '40px' : '120px'}
        display="flex"
        justifyContent="flex-end"
      >
        <Menu>
          <MenuButton
            variant="ghost"
            as={Button}
            rightIcon={<MdOutlineKeyboardArrowDown />}
          >
            {!isSmallerThan370 && label}
          </MenuButton>
          <MenuList>
            {isdPick === true &&
              menuItems
                .filter((item) => item.isdPick === true)
                .map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => onMenuItemClick(item.id)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
            {isdPick === false &&
              menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => onMenuItemClick(item.id)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Button
          variant={activeView === 'masonry' ? 'solid' : 'ghost'}
          onClick={() => onViewChange('masonry')}
        >
          <MdOutlineDashboard size="24px" />
        </Button>
        <Button
          variant={activeView === 'grid' ? 'solid' : 'ghost'}
          onClick={() => onViewChange('grid')}
        >
          <MdOutlineGridView size="24px" />
        </Button>
      </Box>
      <Popover onClose={onClose}>
        <PopoverTrigger>
          <Box
            w={isSmallerThan370 ? '40px' : '120px'}
            display="flex"
            justifyContent="flex-start"
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
        <PopoverContent w="200px">
          <PopoverBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            p="0.5rem"
          >
            <Text p="0.5rem 1rem" fontSize="sm">
              뷰 옵션
            </Text>
            <Button
              w="100%"
              variant="ghost"
              textAlign="left"
              onClick={() => {
                handleShowDeleted();
              }}
            >
              <Text w="100%" textAlign="left">
                혐잘딱 게시글 {isDeletedVisible ? '가리기' : '보이기'}
              </Text>
            </Button>
            {/* <Button
              w="100%"
              variant="ghost"
              textAlign="left"
              onClick={() => {
                handleShowDeleted();
              }}
            >
              <Text w="100%" textAlign="left">
                삭제된 게시글 {isDeletedVisible ? '가리기' : '보이기'}
              </Text>
            </Button> */}
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
}
