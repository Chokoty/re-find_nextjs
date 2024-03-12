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
import { ChangeEvent, useState } from 'react';

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

export default function MainOptions() {
  const iconStyle = {
    width: '1rem',
    height: '1rem',
  };

  const [category, setCategory] = useState<string[]>([]);
  const [selected, setSelected] = useState({
    board: '',
    category: '',
  });

  const handleBoardChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    console.log(val, typeof val);
    // 선택 안했을 때(전체 게시판 선택)
    if (val === '') {
      setCategory([]);
      return;
    }
    setCategory(boardMap[val as keyof typeof boardMap]);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
    }
    console.log(val, typeof val);
  };

  return (
    <AccordionPanel pb={4}>
      <Divider />
      <Box display="flex" flexDir={['column', 'row']} gap="1rem" m="1rem">
        {/* 업로드날짜 (유튜브 참고) -> 시작 ~ 끝 */}
        <Select placeholder="전체기간">
          <option value="option2">1일</option>
          <option value="option3">1주</option>
          <option value="option3">1개월</option>
          <option value="option3">6개월</option>
          <option value="option3">1년</option>
        </Select>
        {/* 정렬기준 */}
        <Select placeholder="최신순">
          {/* <option value="option1">최신순</option> */}
          <option value="option2">댓글수</option>
          <option value="option3">좋아요</option>
          <option value="option3">조회수</option>
          <option value="option3">업로드 날짜</option>
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
            <Checkbox value="title">제목</Checkbox>
            <Checkbox value="content">본문</Checkbox>
            <Checkbox value="author">작가</Checkbox>
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
        <Checkbox colorScheme="teal" value="sensitive">
          대소문자 구분
        </Checkbox>
        <HelpPopOver
          description={`체크시 대소문자를 구분해줍니다. 예시) 체크 후 Over를 검색하면 True Lover는 검색되지 않습니다.`}
        />
      </Box>
      <Divider />
      <Box display="flex" flexDir={['column', 'row']} gap="1rem" m="1rem">
        {/* 각 게시판을 눌렀을 때 해당 카테고리 활성*/}
        <Select placeholder="전체 게시판" onChange={handleBoardChange}>
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
        {category.length > 0 && (
          <Select placeholder="전체 카테고리" onChange={handleCategoryChange}>
            {category.map((item, idx) => (
              <option value={item} key={idx}>
                {item}
              </option>
            ))}
          </Select>
        )}
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
          <Checkbox>
            <FaEye style={iconStyle} />
          </Checkbox>
          <NumberInput maxW="200px" w="100%" defaultValue={0} min={0} max={500}>
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
            defaultValue={500}
            min={500}
            max={999}
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
          <Checkbox>
            <FaThumbsUp style={iconStyle} />
          </Checkbox>
          <NumberInput maxW="200px" w="100%" defaultValue={0} min={0} max={500}>
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
            defaultValue={500}
            min={500}
            max={999}
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
          <Checkbox>
            <FaComment style={iconStyle} />
          </Checkbox>
          <NumberInput maxW="200px" w="100%" defaultValue={0} min={0} max={500}>
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
            defaultValue={500}
            min={500}
            max={999}
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
