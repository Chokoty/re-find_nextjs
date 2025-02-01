import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import { PuffLoader } from 'react-spinners';
import { useDebounce } from 'react-use';

import { useCreateCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import { useSearchResults } from '@/app/search/service/client/useSearchService';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { NotSearch } from '@/lib/images';

export default function CreateCustomAlbumModal() {
  const { hide } = useModal();
  const router = useRouter();
  const handleOnSuccess = (albumId: string) => {
    router.push(`/album/${albumId}`);
  };
  const { mutate: createCustomAlbum, status } = useCreateCustomAlbum(
    [],
    handleOnSuccess
  );
  const handleAddCustomAlbum = () => {
    createCustomAlbum();
  };

  const [input, setInput] = useState('');
  const [debounceValue, setDebounceValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClearInputText = () => {
    setInput('');
  };

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1000px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const {
    fetchNextPage,
    total,
    searchResults,
    isError,
    isFetchingNextPage,
    isLoading,
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

  const isInputNotEmpty = input.length > 0;

  return (
    <section className="m-auto size-full bg-white p-4 shadow-xl dark:bg-dark-card md:h-[291px] md:w-[430px] md:rounded-md">
      <h1 className="text-xl font-bold">앨범에 추가할 팬아트를 찾아보세요</h1>
      <div className="flex size-full flex-col items-center justify-between px-6 py-8 text-center text-sm 2xs:text-base md:py-6 lg:px-8">
        <div className="relative h-10 w-full max-w-[400px]">
          <div className="absolute left-1 top-0 z-[2] flex h-full w-10 items-center justify-center">
            <FaSearch
              className={clsx('size-5', {
                'text-green-highlight': isInputNotEmpty,
                'text-gray-600 dark:text-whiteAlpha-500': !isInputNotEmpty,
              })}
            />
          </div>
          <input
            className="relative size-full cursor-text rounded-full border border-gray-200 bg-gray-100 pl-12 pr-14 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:bg-dark-card 2xs:pr-24"
            placeholder="팬아트 제목 또는 작가명을 검색해보세요"
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
        <div className="mt-6 w-full px-6">
          {searchResults.map((item, index) => (
            // <SearchCard
            // index={index}
            // item={item}
            // searchText={q}
            // isTitleSearch={hasTitle}
            // isContentSearch={hasContent}
            // isAuthorSearch={hasAuthor}
            // key={item.id}
            // />
            <div key={item.id}>{JSON.stringify(item)}</div>
          ))}
          {isFetchingNextPage ? (
            <Loading />
          ) : (
            // Observer를 위한 div
            <div ref={ref} className="h-20 w-full" />
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button intent="ghost-gray" onClick={hide}>
            취소하기
          </Button>
          <Button onClick={handleAddCustomAlbum}>추가하기</Button>
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
