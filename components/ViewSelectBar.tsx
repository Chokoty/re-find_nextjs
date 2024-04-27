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
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import clsx from 'clsx';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { MdMoreHoriz, MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { MEMBERS } from '@/app/gallery/lib/const';
import { MENU_ITEMS } from '@/constants/artists';
import { darkMode, lightMode } from '@/lib/theme';

type Props = {
  activeView: string;
  onViewChange: (view: string) => void;
  selectedMenu: string;
  selectedMember?: string;
  onMenuItemClick: (menuText: string) => void;
  isDeletedVisible: boolean;
  handleShowDeleted: () => void;
  onMemberClick?: (member: string) => void;
  topOffset: number;
  isdPick: boolean;
};

export default function ViewSelectBar({
  activeView,
  onViewChange,
  selectedMenu,
  selectedMember,
  onMenuItemClick,
  isDeletedVisible,
  handleShowDeleted,
  onMemberClick,
  isdPick,
}: Props) {
  const [isSmallerThan370] = useMediaQuery('(max-width: 480px)');
  // 현재 topbackground가 화면의 크기만큼 유동적으로 변하기 때문에 background를 상황에따라 주기 에매하다

  const { onClose } = useDisclosure();
  const popoverBg = useColorModeValue(lightMode.bg2, darkMode.bg3);
  const popoverHoverBg = useColorModeValue(
    'rgb(0 0 0 / 8%)',
    'rgb(255 255 255 / 8%)'
  );

  const sortLabel =
    MENU_ITEMS.find((item) => item.id === selectedMenu)?.label ?? '알잘딱순';
  const memberName =
    MEMBERS.find((item) => item.value === selectedMember)?.name ?? '전체';
  const memberList = [
    { id: 1, name: '전체', value: 'isd' },
    ...MEMBERS.slice(1, 7),
  ];

  return (
    <div className="mb-4 flex w-full items-center justify-between px-8 py-2">
      <div className="flex gap-[5px]">
        <button
          className={clsx('h-10 rounded-full px-4 transition', {
            'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300':
              activeView === 'masonry',
            'text-blackAlpha-400 hover:bg-gray-100 dark:text-whiteAlpha-400 dark:hover:bg-whiteAlpha-200':
              activeView !== 'masonry',
          })}
          onClick={() => onViewChange('masonry')}
        >
          <BiSolidDashboard size="26px" />
        </button>
        <button
          className={clsx('h-10 rounded-full px-4 transition', {
            'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300':
              activeView === 'grid',
            'text-blackAlpha-400 hover:bg-gray-100 dark:text-whiteAlpha-400 dark:hover:bg-whiteAlpha-200':
              activeView !== 'grid',
          })}
          onClick={() => onViewChange('grid')}
        >
          <IoGrid size="24px" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        {isdPick && (
          <Box display="flex" justifyContent="flex-end">
            <Menu>
              <MenuButton
                variant="solid"
                borderRadius="800px"
                as={Button}
                iconSpacing={isSmallerThan370 ? 'unset' : '2'}
                rightIcon={
                  isSmallerThan370 ? <FaUser /> : <MdOutlineKeyboardArrowDown />
                }
              >
                {!isSmallerThan370 && memberName}
              </MenuButton>
              <MenuList bg={popoverBg} zIndex="4">
                {memberList.map((member) => (
                  <MenuItem
                    bg={popoverBg}
                    key={member.id}
                    _hover={{
                      bg: popoverHoverBg,
                    }}
                    onClick={() => onMemberClick?.(member.value)}
                  >
                    {member.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        )}
        <Box display="flex" justifyContent="flex-end">
          <Menu>
            <MenuButton
              variant="solid"
              borderRadius="800px"
              as={Button}
              iconSpacing={isSmallerThan370 ? 'unset' : '2'}
              rightIcon={<MdOutlineKeyboardArrowDown />}
            >
              {!isSmallerThan370 && sortLabel}
            </MenuButton>
            <MenuList bg={popoverBg} zIndex="4">
              {isdPick === true &&
                MENU_ITEMS.filter((item) => item.isdPick === true).map(
                  (item) => (
                    <MenuItem
                      bg={popoverBg}
                      _hover={{
                        bg: popoverHoverBg,
                      }}
                      key={item.id}
                      onClick={() => onMenuItemClick(item.id)}
                    >
                      {item.label}
                    </MenuItem>
                  )
                )}
              {isdPick === false &&
                MENU_ITEMS.map((item) => (
                  <MenuItem
                    bg={popoverBg}
                    key={item.id}
                    _hover={{
                      bg: popoverHoverBg,
                    }}
                    onClick={() => onMenuItemClick(item.id)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </Box>
        <Popover onClose={onClose}>
          <PopoverTrigger>
            <Box w="40px">
              <Button
                w="2.5rem"
                h="2.5rem"
                p="0"
                variant="solid"
                borderRadius="full"
              >
                <MdMoreHoriz size="24px" />
              </Button>
            </Box>
          </PopoverTrigger>
          <PopoverContent w="200px" bg={popoverBg}>
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
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
