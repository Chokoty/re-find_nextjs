'use client';

import {
  AccordionPanel,
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaComment, FaEye, FaThumbsUp } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

import { useSearchFilterStore } from '@/app/search/store/searchFilerStore';
import HelpPopOver from '@/components/popover/HelpPopOver';
import styles from '@/styles/MainOptions.module.scss';
import { darkMode, lightMode } from '@/styles/theme';

const boardMap: Record<string, string[]> = {
  all: [],
  isd: [
    '아이네',
    '징버거',
    '릴파',
    '주르르',
    '고세구',
    '비챤',
    '기타',
    '2인 이상',
    '월페이퍼2차창작',
  ],
  best: [],
  goldhand: [],
  wak: [
    '팬아트',
    '이모티콘',
    '도네이션효과',
    '우왁끼메인',
    '방송컨텐츠용',
    '합성짤',
    '썸네일삽입용',
    '10주년기념',
  ],
  gomem: ['고멤 팬아트', '기타', '아카데미 팬아트'],
  isd_behind: [],
  gomem_behind: [],
  notice: [],
  ai: ['우왁굳', '고멤', '이세돌', '그 외 혹은 종합'],
};

const MIN_COUNT = 0;
const MAX_COUNT = 100;

export default function MainOptions() {
  const selectBg = useColorModeValue(lightMode.bg2, darkMode.bg3);
  const iconStyle = {
    width: '1rem',
    height: '1rem',
  };
  // const searchParams = useSearchParams();
  // const searchParamsObj = Object.fromEntries(searchParams.entries());
  const {
    board,
    category,
    dateType,
    rankType,
    hasSensitiveCase,
    hasTitle,
    hasContent,
    hasAuthor,
    viewCountLimit,
    likeCountLimit,
    commentCountLimit,
    selectBoard,
    selectCategory,
    selectDateType,
    selectRankType,
    checkSensitive,
    checkTitle,
    checkContent,
    checkAuthor,
    checkViewCountLimit,
    checkLikeCountLimit,
    checkCommentCountLimit,
  } = useSearchFilterStore(
    useShallow((state) => ({
      board: state.board,
      category: state.category,
      dateType: state.dateType,
      rankType: state.rankType,
      hasSensitiveCase: state.hasSensitiveCase,
      hasTitle: state.hasTitle,
      hasContent: state.hasContent,
      hasAuthor: state.hasAuthor,
      viewCountLimit: state.viewCountLimit,
      likeCountLimit: state.likeCountLimit,
      commentCountLimit: state.commentCountLimit,
      selectBoard: state.selectBoard,
      selectCategory: state.selectCategory,
      selectDateType: state.selectDateType,
      selectRankType: state.selectRankType,
      checkSensitive: state.checkSensitive,
      checkTitle: state.checkTitle,
      checkContent: state.checkContent,
      checkAuthor: state.checkAuthor,
      checkViewCountLimit: state.checkViewCountLimit,
      checkLikeCountLimit: state.checkLikeCountLimit,
      checkCommentCountLimit: state.checkCommentCountLimit,
    }))
  );
  const [categories, setCategories] = useState<string[]>([]);
  // view, like, comment up, down 이벤트는 state로 해당 컴포넌트에서 관리하고 check할 때, 비로소 store에 저장
  const [likeCount, setLikeCount] = useState({
    min: MIN_COUNT,
    max: MAX_COUNT,
  });
  const [viewCount, setViewCount] = useState({
    min: MIN_COUNT,
    max: MAX_COUNT,
  });
  const [commentCount, setCommentCount] = useState({
    min: MIN_COUNT,
    max: MAX_COUNT,
  });

  const handleChangeBoard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // 선택 안했을 때(전체 게시판 선택) > 빈 문자열
    if (val === '') {
      setCategories([]);
      selectBoard('all');
      return;
    }
    selectBoard(val);
    setCategories(boardMap[val as keyof typeof boardMap]);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      selectCategory('all');
      return;
    }
    selectCategory(val);
  };

  const handleChangeDateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      selectDateType('all');
      return;
    }
    selectDateType(val);
  };

  const handleChangeRankType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      selectRankType('latest');
      return;
    }
    selectRankType(val);
  };

  const handleCheckSensitiveCase = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkSensitive(e.target.checked);
  };

  const handleCheckTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTitle(e.target.checked);
  };

  const handleCheckContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkContent(e.target.checked);
  };

  const handleCheckAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkAuthor(e.target.checked);
  };

  const handleCheckViewCountLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { min, max } = viewCount;
    checkViewCountLimit({
      check: e.target.checked,
      min,
      max,
    });
  };

  const handleCheckLikeCountLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { min, max } = likeCount;
    checkLikeCountLimit({
      check: e.target.checked,
      min,
      max,
    });
  };

  const handleCheckCommentCountLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { min, max } = commentCount;
    checkCommentCountLimit({
      check: e.target.checked,
      min,
      max,
    });
  };

  const handleChangeViewLowerCount = (_: string, valueAsNumber: number) => {
    // setViewCountLimit({ min: valueAsNumber, max: viewCountLimit.max });
    setViewCount({ min: valueAsNumber, max: viewCount.max });
  };
  const handleChangeViewUpperCount = (_: string, valueAsNumber: number) => {
    // setViewCountLimit({ min: viewCountLimit.min, max: valueAsNumber });
    setViewCount({ min: viewCount.min, max: valueAsNumber });
  };

  const handleChangeLikeLowerCount = (_: string, valueAsNumber: number) => {
    // setLikeCountLimit({ min: valueAsNumber, max: likeCountLimit.max });
    setLikeCount({ min: valueAsNumber, max: likeCount.max });
  };
  const handleChangeLikeUpperCount = (_: string, valueAsNumber: number) => {
    // setLikeCountLimit({ min: likeCountLimit.min, max: valueAsNumber });
    setLikeCount({ min: likeCount.min, max: valueAsNumber });
  };

  const handleChangeCommentLowerCount = (_: string, valueAsNumber: number) => {
    // setCommentCountLimit({ min: valueAsNumber, max: commentCountLimit.max });
    setCommentCount({ min: valueAsNumber, max: commentCount.max });
  };

  const handleChangeCommentUpperCount = (_: string, valueAsNumber: number) => {
    // setCommentCountLimit({ min: commentCountLimit.min, max: valueAsNumber });
    setCommentCount({ min: commentCount.min, max: valueAsNumber });
  };

  return (
    <AccordionPanel pb={4} className={styles.panel}>
      <Divider />
      <Box
        display="flex"
        flexDir={['column', 'row']}
        gap="1rem"
        m="1rem"
        className={styles.row}
      >
        {/* 업로드날짜 (유튜브 참고) -> 시작 ~ 끝 */}
        <Select
          placeholder="전체기간"
          onChange={handleChangeDateType}
          defaultValue={dateType}
          sx={{
            '> option': {
              background: selectBg,
              color: 'white',
            },
          }}
        >
          <option value="day">1일</option>
          <option value="week">1주</option>
          <option value="mon">1개월</option>
          <option value="sixMon">6개월</option>
          <option value="year">1년</option>
        </Select>
        {/* 정렬기준 */}
        <Select
          placeholder="최신순"
          onChange={handleChangeRankType}
          defaultValue={rankType}
          sx={{
            '> option': {
              background: selectBg,
              color: 'white',
            },
          }}
        >
          {/* <option value="option1">최신순</option> */}
          <option value="comment">댓글수</option>
          <option value="like">좋아요</option>
          <option value="view">조회수</option>
          <option value="oldest">업로드 날짜</option>
        </Select>
      </Box>
      <Divider />
      <Box
        m="1rem"
        display="flex"
        flexDir="row"
        alignItems="center"
        // justifyContent={['space-between', 'unset']}
        justifyContent="space-between"
        className={styles.row}
      >
        <CheckboxGroup colorScheme="teal">
          <Stack
            direction="row"
            spacing={[3, 5]}
            // direction={['column', 'row']}
          >
            <Checkbox
              value="title"
              onChange={handleCheckTitle}
              defaultChecked={hasTitle}
            >
              제목
            </Checkbox>
            <Checkbox
              value="content"
              onChange={handleCheckContent}
              defaultChecked={hasContent}
            >
              본문
            </Checkbox>
            <Checkbox
              value="author"
              onChange={handleCheckAuthor}
              defaultChecked={hasAuthor}
            >
              작가
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <HelpPopOver description="전부 체크되지 않은 경우엔 제목과 본문에서만 찾습니다." />
      </Box>
      <Divider />
      <Box
        m="1rem"
        display="flex"
        flexDir="row"
        alignItems="center"
        // justifyContent={['space-between', 'unset']}
        justifyContent="space-between"
        className={styles.row}
      >
        <Checkbox
          colorScheme="teal"
          value="sensitive"
          onChange={handleCheckSensitiveCase}
          defaultChecked={hasSensitiveCase}
        >
          대소문자 구분
        </Checkbox>
        <HelpPopOver
          description={`체크시 대소문자를 구분해줍니다. 예시) 체크 후 Over를 검색하면 True Lover는 검색되지 않습니다.`}
        />
      </Box>
      <Divider />
      <Box
        display="flex"
        flexDir={['column', 'row']}
        gap="1rem"
        m="1rem"
        className={styles.row}
      >
        {/* 각 게시판을 눌렀을 때 해당 카테고리 활성 */}
        <Select
          placeholder="전체 게시판"
          onChange={handleChangeBoard}
          defaultValue={board}
          sx={{
            '> option': {
              background: selectBg,
              color: 'white',
            },
          }}
        >
          <option value="isd">이세돌┃팬아트</option>
          <option value="goldhand">금손 작가들의 방</option>
          <option value="best">BEST 유머 정보</option>
          <option value="wak">우왁굳팬아트</option>
          <option value="gomem">고멤┃팬아트</option>
          <option value="isd_behind">이세돌┃작업후기</option>
          <option value="gomem_behind">고멤┃작업 후기</option>
          <option value="notice">전체 공지사항</option>
          <option value="ai">AI 팬아트</option>
        </Select>
        {/* 카테고리 */}
        <Select
          placeholder="말머리"
          disabled={categories.length === 0}
          onChange={handleChangeCategory}
          defaultValue={category}
          sx={{
            '> option': {
              background: selectBg,
              color: 'white',
            },
          }}
        >
          {categories.map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
        </Select>
      </Box>
      {/* <Divider />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="1rem"
        m="1rem"
      >
        <Tag
          size="md"
          // key={size}
          borderRadius="full"
          variant="solid"
          colorScheme="green"
        >
          <TagLabel>징버거</TagLabel>
          <TagCloseButton />
        </Tag>
        <Tag
          size="md"
          // key={size}
          borderRadius="full"
          variant="solid"
          colorScheme="green"
        >
          <TagLabel>산타</TagLabel>
          <TagCloseButton />
        </Tag>
      </Box> */}
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flexWrap="wrap"
        gap="1rem"
        m="1rem"
        className={styles.row}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="1rem"
        >
          <Checkbox
            colorScheme="teal"
            value="viewLimit"
            onChange={handleCheckViewCountLimit}
            defaultChecked={viewCountLimit.check}
          >
            <FaEye style={iconStyle} />
          </Checkbox>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={viewCount.min}
            min={MIN_COUNT}
            max={viewCount.max}
            onChange={handleChangeViewLowerCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>~</Text>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={viewCount.max}
            min={viewCount.min}
            onChange={handleChangeViewUpperCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="1rem"
        >
          <Checkbox
            colorScheme="teal"
            value="likeLimit"
            onChange={handleCheckLikeCountLimit}
            defaultChecked={likeCountLimit.check}
          >
            <FaThumbsUp style={iconStyle} />
          </Checkbox>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={likeCount.min}
            min={MIN_COUNT}
            max={likeCount.max}
            onChange={handleChangeLikeLowerCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>~</Text>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={likeCount.max}
            min={likeCount.min}
            onChange={handleChangeLikeUpperCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="1rem"
        >
          <Checkbox
            colorScheme="teal"
            value="commentLimit"
            onChange={handleCheckCommentCountLimit}
            defaultChecked={commentCountLimit.check}
          >
            <FaComment style={iconStyle} />
          </Checkbox>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={commentCount.min}
            min={MIN_COUNT}
            max={commentCount.max}
            onChange={handleChangeCommentLowerCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>~</Text>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={commentCount.max}
            min={commentCount.min}
            onChange={handleChangeCommentUpperCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Box>
    </AccordionPanel>
  );
}
