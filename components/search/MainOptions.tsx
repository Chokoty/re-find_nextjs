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
} from '@chakra-ui/react';
import { FaComment, FaEye, FaThumbsUp } from 'react-icons/fa';
import HelpPopOver from './HelpPopOver';
import { ChangeEvent, useReducer, useState } from 'react';

const boardMap: Record<string, string[]> = {
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

type CountLimit = {
  check: boolean;
  min: number;
  max: number;
};

type StateType = {
  board: string;
  category: string;
  dateType: string;
  rankType: string;
  checkSensitiveCase: boolean;
  checkTitle: boolean;
  checkContent: boolean;
  checkAuthor: boolean;
  viewCountLimit: CountLimit;
  likeCountLimit: CountLimit;
  commentCountLimit: CountLimit;
};

type ActionType =
  | { type: 'select_board'; board: string }
  | {
      type: 'select_category';
      category: string;
    }
  | { type: 'select_dateType'; dateType: string }
  | { type: 'select_rankType'; rankType: string }
  | { type: 'check_sensitiveCase' }
  | { type: 'check_title' }
  | { type: 'check_content' }
  | { type: 'check_author' }
  | { type: 'check_viewCountLimit' }
  | { type: 'check_likeCountLimit' }
  | { type: 'check_commentCountLimit' }
  | { type: 'limit_viewCount'; min: number; max: number }
  | { type: 'limit_likeCount'; min: number; max: number }
  | { type: 'limit_commentCount'; min: number; max: number };

// state는 현재 선택된 옵션들을 담고 있는 객체, action은 어떤 옵션을 선택했는지, 전달 받았는지에 대한 정보를 담고 있는 객체
function optionsReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'select_board': {
      return { ...state, board: action.board };
    }
    case 'select_category': {
      return { ...state, category: action.category };
    }
    case 'select_dateType': {
      return { ...state, dateType: action.dateType };
    }
    case 'select_rankType': {
      return { ...state, rankType: action.rankType };
    }
    case 'check_sensitiveCase': {
      return { ...state, checkSensitiveCase: !state.checkSensitiveCase };
    }
    case 'check_title': {
      return { ...state, checkTitle: !state.checkTitle };
    }
    case 'check_content': {
      return { ...state, checkContent: !state.checkContent };
    }
    case 'check_author': {
      return { ...state, checkAuthor: !state.checkAuthor };
    }
    case 'check_viewCountLimit': {
      return {
        ...state,
        viewCountLimit: {
          ...state.viewCountLimit,
          check: !state.viewCountLimit.check,
        },
      };
    }
    case 'check_likeCountLimit': {
      return {
        ...state,
        likeCountLimit: {
          ...state.likeCountLimit,
          check: !state.likeCountLimit.check,
        },
      };
    }
    case 'check_commentCountLimit': {
      return {
        ...state,
        commentCountLimit: {
          ...state.commentCountLimit,
          check: !state.commentCountLimit.check,
        },
      };
    }
    case 'limit_viewCount': {
      return {
        ...state,
        viewCountLimit: {
          check: state.viewCountLimit.check,
          min: action.min,
          max: action.max,
        },
      };
    }
    case 'limit_likeCount': {
      return {
        ...state,
        likeCountLimit: {
          check: state.likeCountLimit.check,
          min: action.min,
          max: action.max,
        },
      };
    }
    case 'limit_commentCount': {
      return {
        ...state,
        commentCountLimit: {
          check: state.commentCountLimit.check,
          min: action.min,
          max: action.max,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

const initialOptions = {
  board: 'all',
  category: '',
  dateType: 'all',
  rankType: 'latest',
  checkSensitiveCase: false,
  checkTitle: false,
  checkContent: false,
  checkAuthor: false,
  viewCountLimit: {
    check: false,
    min: 0,
    max: 100,
  },
  likeCountLimit: {
    check: false,
    min: 0,
    max: 100,
  },
  commentCountLimit: {
    check: false,
    min: 0,
    max: 100,
  },
};

const MIN_COUNT = 0;
const MAX_COUNT = 100;

export default function MainOptions() {
  const iconStyle = {
    width: '1rem',
    height: '1rem',
  };

  const [category, setCategory] = useState<string[]>([]);
  const [state, dispatch] = useReducer(optionsReducer, initialOptions);

  const handleChangeBoard = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // 선택 안했을 때(전체 게시판 선택) > 빈 문자열
    if (val === '') {
      setCategory([]);
      dispatch({ type: 'select_board', board: 'all' });
      // dispatch({ type: 'select_category', board: '' }); > (request 로직에서 처리) TODO: reqeust 보낼 때 category가 all이라면 board를 비워줘야함
      return;
    }
    dispatch({ type: 'select_board', board: val });
    setCategory(boardMap[val as keyof typeof boardMap]);
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // 전체 카테고리 선택시 빈 문자열이 들어옴
    dispatch({ type: 'select_category', category: val });
  };

  const handleChangeDateType = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      dispatch({ type: 'select_dateType', dateType: 'all' });
      return;
    }
    dispatch({ type: 'select_dateType', dateType: val });
  };

  const handleChangeRankType = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      dispatch({ type: 'select_rankType', rankType: 'latest' });
      return;
    }
    dispatch({ type: 'select_rankType', rankType: val });
  };

  const handleCheckSensitiveCase = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_sensitiveCase' });
  };

  const handleCheckTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_title' });
  };

  const handleCheckContent = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_content' });
  };

  const handleCheckAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_author' });
  };

  const handleCheckViewCountLimit = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_viewCountLimit' });
  };

  const handleCheckLikeCountLimit = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_likeCountLimit' });
  };

  const handleCheckCommentCountLimit = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'check_commentCountLimit' });
  };

  const handleChangeViewLowerCount = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    dispatch({
      type: 'limit_viewCount',
      min: valueAsNumber,
      max: state.viewCountLimit.max,
    });
  };
  const handleChangeViewUpperCount = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    dispatch({
      type: 'limit_viewCount',
      min: state.viewCountLimit.min,
      max: valueAsNumber,
    });
  };

  const handleChangeLikeLowerCount = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    dispatch({
      type: 'limit_likeCount',
      min: valueAsNumber,
      max: state.likeCountLimit.max,
    });
  };
  const handleChangeLikeUpperCount = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    dispatch({
      type: 'limit_likeCount',
      min: state.likeCountLimit.min,
      max: valueAsNumber,
    });
  };

  const handleChangeCommentLowerCount = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    dispatch({
      type: 'limit_commentCount',
      min: valueAsNumber,
      max: state.commentCountLimit.max,
    });
  };

  const handleChangeCommentUpperCount = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    dispatch({
      type: 'limit_commentCount',
      min: state.commentCountLimit.min,
      max: valueAsNumber,
    });
  };

  console.log(state);

  return (
    <AccordionPanel pb={4}>
      <Divider />
      <Box display="flex" flexDir={['column', 'row']} gap="1rem" m="1rem">
        {/* 업로드날짜 (유튜브 참고) -> 시작 ~ 끝 */}
        <Select placeholder="전체기간" onChange={handleChangeDateType}>
          <option value="day">1일</option>
          <option value="week">1주</option>
          <option value="mon">1개월</option>
          <option value="sixMon">6개월</option>
          <option value="year">1년</option>
        </Select>
        {/* 정렬기준 */}
        <Select placeholder="최신순" onChange={handleChangeRankType}>
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
      >
        <CheckboxGroup colorScheme="teal">
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox value="title" onChange={handleCheckTitle}>
              제목
            </Checkbox>
            <Checkbox value="content" onChange={handleCheckContent}>
              본문
            </Checkbox>
            <Checkbox value="author" onChange={handleCheckAuthor}>
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
      >
        <Checkbox
          colorScheme="teal"
          value="sensitive"
          onChange={handleCheckSensitiveCase}
        >
          대소문자 구분
        </Checkbox>
        <HelpPopOver
          description={`체크시 대소문자를 구분해줍니다. 예시) 체크 후 Over를 검색하면 True Lover는 검색되지 않습니다.`}
        />
      </Box>
      <Divider />
      <Box display="flex" flexDir={['column', 'row']} gap="1rem" m="1rem">
        {/* 각 게시판을 눌렀을 때 해당 카테고리 활성*/}
        <Select placeholder="전체 게시판" onChange={handleChangeBoard}>
          <option value="isd">이세돌┃팬아트</option>
          <option value="goldhand">금손 작가들의 방</option>
          <option value="best">BEST 유머 정보</option>
          <option value="wak">우왁굳팬아트</option>
          <option value="gomem">고멤┃팬아트</option>
          <option value="isd_behind">이세돌┃작업후기</option>
          <option value="gomem_behind">고멤┃작업 후기</option>
          <option value="notice">이세돌 공지글</option>
          <option value="ai">AI 팬아트</option>
        </Select>
        {/* 카테고리 */}
        <Select
          placeholder="전체 카테고리"
          disabled={category.length === 0}
          onChange={handleChangeCategory}
        >
          {category.map((item, idx) => (
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
          >
            <FaEye style={iconStyle} />
          </Checkbox>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={MIN_COUNT}
            min={MIN_COUNT}
            max={state.viewCountLimit.max}
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
            defaultValue={MAX_COUNT}
            min={state.viewCountLimit.min}
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
          >
            <FaThumbsUp style={iconStyle} />
          </Checkbox>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={MIN_COUNT}
            min={MIN_COUNT}
            max={state.likeCountLimit.max}
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
            defaultValue={MAX_COUNT}
            min={state.likeCountLimit.min}
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
          >
            <FaComment style={iconStyle} />
          </Checkbox>
          <NumberInput
            maxW="200px"
            w="100%"
            defaultValue={MIN_COUNT}
            min={MIN_COUNT}
            max={state.commentCountLimit.max}
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
            defaultValue={MAX_COUNT}
            min={state.commentCountLimit.min}
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
