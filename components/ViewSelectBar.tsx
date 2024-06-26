'use client';

import clsx from 'clsx';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { MdMoreHoriz, MdOutlineKeyboardArrowDown } from 'react-icons/md';

import TotalCounter from '@/app/gallery/components/TotalCounter';
import { MEMBERS } from '@/app/gallery/lib/const';
import Button from '@/components/Button';
import Menu, { MenuButton, MenuItem, MenuList } from '@/components/Menu';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover';
import { MENU_ITEMS } from '@/constants/artists';

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
  isIsdPick?: boolean;
  hasTotalCounter?: boolean;
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
  isIsdPick = false,
  hasTotalCounter = false,
}: Props) {
  const sortLabel =
    MENU_ITEMS.find((item) => item.id === selectedMenu)?.label ?? '알잘딱순';
  const memberName =
    MEMBERS.find((item) => item.value === selectedMember)?.name ?? '전체';
  const memberList = [
    { id: 1, name: '전체', value: 'isd' },
    ...MEMBERS.slice(1, 7),
  ];
  return (
    <div className="relative mb-4 flex w-full items-center justify-between px-8 py-2">
      <div className="flex gap-[5px]">
        <button
          className={clsx('h-10 rounded-full px-4 transition', {
            'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400':
              activeView === 'masonry',
            'text-blackAlpha-400 hover:bg-gray-100 active:bg-gray-200 dark:text-whiteAlpha-400 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300':
              activeView !== 'masonry',
          })}
          onClick={() => onViewChange('masonry')}
        >
          <BiSolidDashboard size="26px" />
        </button>
        <button
          className={clsx('h-10 rounded-full px-4 transition', {
            'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400':
              activeView === 'grid',
            'text-blackAlpha-400 hover:bg-gray-100 active:bg-gray-200 dark:text-whiteAlpha-400 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300':
              activeView !== 'grid',
          })}
          onClick={() => onViewChange('grid')}
        >
          <IoGrid size="24px" />
        </button>
      </div>
      {hasTotalCounter && (
        <p className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 dark:text-whiteAlpha-900 2md:block">
          <TotalCounter />
        </p>
      )}
      <div className="flex items-center justify-center gap-4">
        {isIsdPick && (
          <Menu>
            <MenuButton
              size="lg"
              rightIcon={<MdOutlineKeyboardArrowDown />}
              rightMobileIcon={<FaUser />}
            >
              {memberName}
            </MenuButton>
            <MenuList>
              {memberList.map((member) => (
                <MenuItem
                  key={member.id}
                  onClick={() => onMemberClick?.(member.value)}
                >
                  {member.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
        <Menu>
          <MenuButton
            size="lg"
            rightIcon={<MdOutlineKeyboardArrowDown />}
            rightMobileIcon={<MdOutlineKeyboardArrowDown />}
          >
            {sortLabel}
          </MenuButton>
          <MenuList>
            {isIsdPick === true &&
              MENU_ITEMS.filter((item) => item.isdPick === true).map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => onMenuItemClick(item.id)}
                >
                  {item.label}
                </MenuItem>
              ))}
            {isIsdPick === false &&
              MENU_ITEMS.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => onMenuItemClick(item.id)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        <Popover>
          <PopoverTrigger size="lg">
            <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-whiteAlpha-200">
              <MdMoreHoriz className="size-6" />
            </div>
          </PopoverTrigger>
          <PopoverContent size="sm" hasCloseButton={false}>
            <PopoverBody>
              <div className="flex flex-col items-start justify-center">
                <p className="px-4 py-2 text-sm">뷰 옵션</p>
                <Button intent="ghost-gray" onClick={handleShowDeleted}>
                  혐잘딱 게시글 {isDeletedVisible ? '가리기' : '보이기'}
                </Button>
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
