import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import { PuffLoader } from 'react-spinners';
import { useDebounce } from 'react-use';

import { ussAddFanartsInToCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import { useSearchResults } from '@/app/search/service/client/useSearchService';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { NotSearch } from '@/lib/images';

import SearchItemRow from './SearchItemRow';

export default function AddFanartToAlbumFinderModal(
  props: Record<string, unknown>
) {
  const { hide } = useModal();
  const onClose = () => {
    hide();
  };
  const id = props.id as string;
  const refreshAlbumArtworks = props.refreshAlbumArtworks as () => void;

  const [input, setInput] = useState('');
  const [debounceValue, setDebounceValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClearInputText = () => {
    setInput('');
  };

  const [selected, setSelected] = useState<number[]>([]);
  const { mutate: addFanartsIntoCustomAlbum, isPending } =
    ussAddFanartsInToCustomAlbum({
      albumId: id,
      items: selected,
      handleOnSuccess: () => {
        refreshAlbumArtworks();
        toast.success('새로운 팬아트가 앨범에 추가되었습니다.');
        onClose();
      },
      handleOnError: onClose,
    });
  const handleAddToCustomAlbum = () => {
    if (!selected) return;
    addFanartsIntoCustomAlbum();
  };

  const {
    fetchNextPage,
    total,
    searchResults,
    isError,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useSearchResults({
    q: debounceValue,
    board: 'all',
    category: 'all',
    rankType: 'latest',
    sensitive: false,
    dateType: { type: 'all', date: null },
    title: false,
    content: false,
    author: false,
    viewCountLimit: { check: false, min: 0, max: 20000 },
    likeCountLimit: { check: false, min: 0, max: 20000 },
    commentCountLimit: { check: false, min: 0, max: 20000 },
  });

  useDebounce(
    () => {
      setDebounceValue(input);
    },
    600,
    [input]
  );

  useEffect(() => {
    if (debounceValue.length > 0) {
      refetch(); // 검색어가 있을 때 수동으로 쿼리 실행
    }
  }, [debounceValue, refetch]);

  const isInputNotEmpty = input.length > 0;

  return (
    <section className="m-auto flex h-[80vh] w-[90%] flex-col rounded-2xl bg-white dark:bg-dark-card md:w-full md:max-w-[760px]">
      <h1 className="px-3 py-8 text-xl font-bold 2xs:px-6">
        앨범에 추가할 팬아트를 찾아보세요
      </h1>
      <div className="flex size-full flex-col items-center justify-between px-3 pb-8 text-center text-sm 2xs:px-6 2xs:text-base md:max-w-[500px] md:pb-6 lg:px-8">
        <div className="relative h-10 w-full">
          <div className="absolute left-1 top-0 z-[2] flex h-full w-10 items-center justify-center">
            <IoSearchOutline
              className={clsx('size-5', {
                'text-green-highlight': isInputNotEmpty,
                'text-gray-600 dark:text-whiteAlpha-500': !isInputNotEmpty,
              })}
            />
          </div>
          <input
            className="relative size-full cursor-text rounded-full border border-gray-200 bg-gray-100 pl-12 pr-14 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:bg-dark-card"
            placeholder="팬아트 제목 또는 작가명"
            value={input}
            onChange={handleSearch}
          />
          <div className="absolute right-0 top-0 z-[2] flex h-full items-center justify-end pr-4">
            {isInputNotEmpty ? (
              <button
                type="button"
                className="flex size-6 items-center justify-center"
                onClick={handleClearInputText}
              >
                <IoIosCloseCircle className="size-5 text-gray-600 dark:text-whiteAlpha-700" />
              </button>
            ) : (
              //   <Popover>
              //     <PopoverTrigger>
              //       <BsFillQuestionCircleFill className="size-4 text-blackAlpha-600 dark:text-whiteAlpha-600" />
              //     </PopoverTrigger>
              //     <PopoverContent size="sm" hasCloseButton={false}>
              //       <PopoverBody>대소문자는 구분됩니다.</PopoverBody>
              //     </PopoverContent>
              //   </Popover>
              <></>
            )}
          </div>
        </div>
        {input === '' ? (
          <div className="flex size-full flex-col items-center justify-center py-8">
            <Image
              src={NotSearch}
              alt="검색 전 안내"
              width={202}
              height={172}
              priority
              unoptimized
            />
            <h3 className="my-6 text-center">검색어를 입력해 주세요.</h3>
          </div>
        ) : (
          <Contents
            artworks={searchResults}
            total={total}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            isError={isError}
            isLoading={isLoading}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button intent="ghost-gray" onClick={onClose} disabled={isPending}>
            취소하기
          </Button>
          <Button
            onClick={handleAddToCustomAlbum}
            disabled={isPending || selected.length === 0}
          >{`추가하기(${selected.length})`}</Button>
        </div>
      </div>
    </section>
  );
}

const Loading = () => (
  <div className="flex size-full min-h-[370px] items-center justify-center">
    <PuffLoader color="#01BFA2" />
  </div>
);

type Props = {
  artworks?: SearchItem[];
  total?: number;
  isFetchingNextPage: boolean;
  fetchNextPage: any;
  isLoading: boolean;
  isError: boolean;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

const Contents = ({
  artworks: searchResults,
  total,
  isFetchingNextPage,
  fetchNextPage,
  isLoading,
  isError,
  selected,
  setSelected,
}: Props) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1000px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const toggleSelection = (id: number) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        // 이미 선택된 경우, 배열에서 제거
        return prevSelected.filter((selectedId) => selectedId !== id);
      }
      // 선택되지 않은 경우, 배열에 추가
      return [...prevSelected, id];
    });
  };
  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert />;
  }

  if (!searchResults || searchResults.length === 0 || (total ?? 0) === 0) {
    return (
      <div className="flex size-full flex-col items-center justify-center py-8">
        <Image
          src={NotSearch}
          alt="찾을 수 없음을 표시"
          width={202}
          height={172}
          priority
          unoptimized
        />
        <h3 className="my-6 text-center">
          검색 결과가 없습니다. <br /> 다른 닉네임으로 검색해 보세요.
        </h3>
      </div>
    );
  }

  return (
    // 80vh-(92px+40px+40px)
    <div className="mt-6 max-h-[calc(80vh-280px)] w-full overflow-y-auto px-1.5">
      {searchResults.map((item) => (
        <SearchItemRow
          item={item}
          key={item.id}
          toggleSelection={toggleSelection}
          isSelected={selected.includes(item.id)}
        />
      ))}
      {isFetchingNextPage ? (
        <Loading />
      ) : (
        // Observer를 위한 div
        <div ref={ref} className="h-20 w-full" />
      )}
    </div>
  );
};
