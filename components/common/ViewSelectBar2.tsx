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
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  MdMoreHoriz,
  MdOutlineDashboard,
  MdOutlineGridView,
  MdOutlineKeyboardArrowDown,
  MdOutlineViewDay,
} from 'react-icons/md';

import { menuItems } from '@/data/artists';
import { useResponsive } from '@/hook/useResponsive';
import { useShowShadow } from '@/hook/useShowShadow';
import { darkMode, lightMode } from '@/styles/theme';

interface ViewSelectBarProps {
  selectedMenu: string;
  onViewChange;
  onMenuItemClick: (menuText: string) => void;
}

const Button1 = ({ activeView, id, onViewChange, children }) => {
  return (
    <Button
      variant={activeView === id ? 'solid' : 'ghost'}
      onClick={() => onViewChange(id)}
      w="4.5rem"
      h="3rem"
      bg={activeView === id ? '#FFFFFF0D' : 'none'}
      borderRadius="30px"
    >
      {children}
    </Button>
  );
};
const MenuButton1 = ({
  label,
  isSmallerThan370,
  bg,
  bg2,
  isdPick,
  onMenuItemClick,
}) => {
  return (
    <Menu>
      <MenuButton
        bg={bg2}
        maxW="116px"
        h="3rem"
        borderRadius="800px"
        variant="ghost"
        as={Button}
        rightIcon={
          !isSmallerThan370 && (
            <MdOutlineKeyboardArrowDown
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          )
        }
      >
        {!isSmallerThan370 && label}
        {isSmallerThan370 && (
          <MdOutlineKeyboardArrowDown
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        )}
      </MenuButton>
      <MenuList minWidth="110px" borderRadius="12px" bg={bg}>
        {isdPick === true &&
          menuItems
            .filter((item) => item.isdPick === true)
            .map((item, index) => (
              <MenuItem
                borderBottom={
                  index < menuItems.length - 1 ? '1px solid #FFFFFF0D' : 'none'
                }
                w="110px"
                p="0.5rem 1rem"
                key={item.id}
                onClick={() => onMenuItemClick(item.id)}
                bg={bg}
                _hover={{
                  bg: '#EF80B140',
                }}
              >
                {item.label}
              </MenuItem>
            ))}
        {isdPick === false &&
          menuItems.map((item, index) => (
            <MenuItem
              borderBottom={
                index < menuItems.length - 1 ? '1px solid #FFFFFF0D' : 'none'
              }
              w="110px"
              p="0.5rem 1rem"
              key={item.id}
              onClick={() => onMenuItemClick(item.id)}
              bg={bg}
              _hover={{
                // bg: '#EF80B140',
                color: '#EF80B1',
              }}
            >
              {item.label}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};
const PopoverButton = ({
  bg,
  isDeletedVisible,
  handleShowDeleted,
  onClose,
}) => {
  return (
    <Popover onClose={onClose} placement="bottom-end">
      <PopoverTrigger>
        <Box
          // w={isSmallerThan370 ? '40px' : '120px'}
          w="3rem"
          display="flex"
          justifyContent="flex-start"
        >
          <Button
            w="3rem"
            h="3rem"
            p="0"
            borderRadius="full"
            variant="ghost"
            bg="#FFFFFF0D"
            _hover={{
              bg: '#EF80B140',
            }}
          >
            <MdMoreHoriz size="24px" />
          </Button>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        w="248px"
        h="100px"
        borderRadius="12px"
        boxShadow="base"
        bg={bg}
      >
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
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            p="0.5rem 1rem"
          >
            <Text w="100%" textAlign="left" fontSize="lg" as="b">
              혐잘딱 게시글 보이기
            </Text>
            <Switch
              id="toggle-deleted-posts"
              size="md"
              sx={{
                '.chakra-switch__track[data-checked]:not([data-theme])': {
                  backgroundColor: '#EF80B1',
                },
              }}
              // sx={{
              //   'span.chakra-switch__track:([data-checked])': {
              //     backgroundColor: '#EF80B1',
              //   },
              // }}
              isChecked={isDeletedVisible}
              onChange={handleShowDeleted}
            />
          </Box>
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
  );
};

const ViewSelectBar2 = ({
  activeView,
  onViewChange,
  selectedMenu,
  onMenuItemClick,
  isDeletedVisible,
  handleShowDeleted,
  topOffset,
  isdPick,
}) => {
  // const isMobile = useResponsive();
  // const [topPosition, setTopPosition] = useState(0);
  // const selectedLabel = menuItems.find(
  //   (item) => item.id === selectedMenu
  // )?.label;
  // const [isOpen, setIsOpen] = useState(false);
  const [isSmallerThan370] = useMediaQuery('(max-width: 480px)');
  const [label, setLabel] = useState('알잘딱순');
  const [isSticky, setIsSticky] = useState(false);
  // const handlePopoverOpen = () => {
  //   setIsOpen(true);
  // };

  // const handlePopoverClose = () => {
  //   setIsOpen(false);
  //   handleShowDeleted();
  // };

  const { onClose } = useDisclosure();

  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자
  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);
  const showShadow = useShowShadow(386, 0);

  useEffect(() => {
    const handleScroll = () => {
      const topOffset1 = window.scrollY;
      console.log('topOffset1', topOffset1);
      if (topOffset1 >= 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('selectedMenu', selectedMenu);
    const newLabel = menuItems?.find((item) => item.id === selectedMenu)?.label;
    console.log('newLabel', newLabel);
    setLabel(newLabel);
  }, [selectedMenu]);

  return (
    <Flex // 뷰 선택 버튼
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="1rem"
      gap="2rem"
      position="sticky"
      top={`${60 + topOffset}px`}
      zIndex="90"
      w="100%"
      p="0 1rem"
      m="0 auto"
      boxShadow={showShadow ? boxShadow : 'none'}
      style={{
        // backgroundColor: bgColor,
        backgroundColor: isSticky ? bg2 : bg,
        color,
      }}
    >
      <Box>
        <Button1
          id={'masonry'}
          activeView={activeView}
          onViewChange={onViewChange}
        >
          <MdOutlineDashboard size="28px" />
        </Button1>
        <Button1
          id={'grid'}
          activeView={activeView}
          onViewChange={onViewChange}
        >
          <MdOutlineGridView size="28px" />
        </Button1>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <MenuButton1
          label={label}
          isSmallerThan370={isSmallerThan370}
          bg={bg}
          bg2={bg2}
          isdPick={isdPick}
          onMenuItemClick={onMenuItemClick}
        />
        <PopoverButton
          bg={bg}
          isDeletedVisible={isDeletedVisible}
          handleShowDeleted={handleShowDeleted}
          onClose={onClose}
        />
      </Box>
      {/* <Button
    variant={activeView === 'listView' ? 'solid' : 'ghost'}
    onClick={() => handleViewChange('listView')}
  >
    <MdOutlineViewDay size="24px" />
  </Button> */}
    </Flex>
  );
};

export default ViewSelectBar2;
