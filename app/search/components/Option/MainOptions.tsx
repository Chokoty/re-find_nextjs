'use client';

import React, { useState } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { FaComment, FaEye, FaThumbsUp } from 'react-icons/fa';

import type { SearchFilterState } from '@/app/search/hooks/useSearchFilter';
import { boardMap, MAX_COUNT, MIN_COUNT } from '@/app/search/lib/const';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import NumberInput from '@/components/NumberInput';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/Popover';
import Select from '@/components/Select';

export default function MainOptions({
  options,
  actions,
}: {
  options: SearchFilterState;
  actions: Record<string, (...args: any[]) => void>;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const handleChangeBoard = (value: string) => {
    // 선택 안했을 때(전체 게시판 선택) > 빈 문자열
    actions.selectBoard(value);
    if (value === 'all') {
      setCategories([]);
      return;
    }
    setCategories(boardMap[value as keyof typeof boardMap]);
  };

  const handleChangeCategory = (value: string) => {
    actions.selectCategory(value);
  };

  const handleChangePeriod = (value: string, date?: string) => {
    actions.selectDateType({ type: value, date });
  };

  const handleChangeRankType = (value: string) => {
    actions.selectRankType(value);
  };

  const handleCheckSensitiveCase = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.checkSensitive(e.target.checked);
  };

  const handleCheckTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.checkTitle(e.target.checked);
  };

  const handleCheckContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.checkContent(e.target.checked);
  };

  const handleCheckAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.checkAuthor(e.target.checked);
  };

  const handleCheckViewCountLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { min, max } = options.viewCountLimit;
    actions.checkViewCountLimit({
      check: e.target.checked,
      min,
      max,
    });
  };

  const handleCheckLikeCountLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { min, max } = options.likeCountLimit;
    actions.checkLikeCountLimit({
      check: e.target.checked,
      min,
      max,
    });
  };

  const handleCheckCommentCountLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { min, max } = options.commentCountLimit;
    actions.checkCommentCountLimit({
      check: e.target.checked,
      min,
      max,
    });
  };

  const handleChangeViewLowerCount = (_: string, valueAsNumber: number) => {
    actions.checkViewCountLimit({
      check: options.viewCountLimit.check,
      min: valueAsNumber,
      max: options.viewCountLimit.max,
    });
  };
  const handleChangeViewUpperCount = (_: string, valueAsNumber: number) => {
    actions.checkViewCountLimit({
      check: options.viewCountLimit.check,
      min: options.viewCountLimit.min,
      max: valueAsNumber,
    });
  };

  const handleChangeLikeLowerCount = (_: string, valueAsNumber: number) => {
    actions.checkLikeCountLimit({
      check: options.likeCountLimit.check,
      min: valueAsNumber,
      max: options.likeCountLimit.max,
    });
  };
  const handleChangeLikeUpperCount = (_: string, valueAsNumber: number) => {
    actions.checkLikeCountLimit({
      check: options.likeCountLimit.check,
      min: options.likeCountLimit.min,
      max: valueAsNumber,
    });
  };

  const handleChangeCommentLowerCount = (_: string, valueAsNumber: number) => {
    actions.checkCommentCountLimit({
      check: options.commentCountLimit.check,
      min: valueAsNumber,
      max: options.commentCountLimit.max,
    });
  };

  const handleChangeCommentUpperCount = (_: string, valueAsNumber: number) => {
    actions.checkCommentCountLimit({
      check: options.commentCountLimit.check,
      min: options.commentCountLimit.min,
      max: valueAsNumber,
    });
  };

  return (
    <div className="px-0 py-2">
      <div className="m-2 flex flex-col gap-2 md:m-4 md:flex-row md:gap-4">
        {/* 업로드날짜 (유튜브 참고) -> 시작 ~ 끝 */}
        <Select
          onChange={handleChangePeriod}
          selected={options.dateType.type}
          options={[
            { value: 'all', label: '전체기간', default: true },
            { value: 'day', label: '1일' },
            { value: 'week', label: '1주' },
            { value: 'mon', label: '1개월' },
            { value: 'sixMon', label: '6개월' },
            { value: 'year', label: '1년' },
            {
              value: 'custom',
              label: '기간선택',
              hasCustomDateRangePicker: true,
            },
          ]}
        />
        {/* 정렬기준 */}
        <Select
          onChange={handleChangeRankType}
          selected={options.rankType}
          options={[
            { value: 'latest', label: '최신순', default: true },
            { value: 'comment', label: '댓글순' },
            { value: 'like', label: '좋아요순' },
            { value: 'view', label: '조회순' },
            { value: 'oldest', label: '오래된순' },
          ]}
        />
      </div>
      <Divider />
      <div className="m-2 flex items-center justify-between md:m-4">
        <div className="flex gap-5">
          <Checkbox
            value="title"
            onChange={handleCheckTitle}
            defaultChecked={options.hasTitle}
          >
            제목
          </Checkbox>
          <Checkbox
            value="content"
            onChange={handleCheckContent}
            defaultChecked={options.hasContent}
          >
            본문
          </Checkbox>
          <Checkbox
            value="author"
            onChange={handleCheckAuthor}
            defaultChecked={options.hasAuthor}
          >
            작가
          </Checkbox>
        </div>
        <Popover>
          <PopoverTrigger size="lg">
            <BsFillQuestionCircleFill className="size-4 text-blackAlpha-600 dark:text-whiteAlpha-600" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>검색 도움말</PopoverHeader>
            <PopoverBody>
              전부 체크되지 않은 경우엔 제목과 본문에서만 찾습니다.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <Divider />
      <div className="m-2 flex flex-col gap-2 md:m-4 md:flex-row md:gap-4">
        {/* 각 게시판을 눌렀을 때 해당 카테고리 활성 */}
        <Select
          onChange={handleChangeBoard}
          selected={options.board}
          options={[
            { value: 'all', label: '전체 게시판', default: true },
            { value: 'isd', label: '이세돌┃팬아트' },
            { value: 'goldhand', label: '금손 작가들의 방' },
            { value: 'best', label: '통합 BEST 팬아트 게시판' },
            { value: 'wak', label: '우왁굳팬아트' },
            { value: 'gomem', label: '고멤┃팬아트' },
            { value: 'isd_behind', label: '이세돌┃작업후기' },
            { value: 'gomem_behind', label: '고멤┃작업 후기' },
            { value: 'notice', label: '전체 공지사항' },
            { value: 'ai', label: 'AI 팬아트' },
          ]}
        />
        {/* 카테고리 */}
        <Select
          disabled={categories.length === 0}
          onChange={handleChangeCategory}
          selected={options.category}
          options={[
            { value: 'all', label: '말머리', default: true },
            ...categories.map((item) => {
              return { value: item, label: item };
            }),
          ]}
        />
      </div>
      <Divider />
      <div className="m-2 flex items-center justify-between md:m-4">
        <Checkbox
          value="sensitive"
          onChange={handleCheckSensitiveCase}
          defaultChecked={options.hasSensitiveCase}
        >
          대소문자 구분
        </Checkbox>
        <Popover>
          <PopoverTrigger size="lg">
            <BsFillQuestionCircleFill className="size-4 text-blackAlpha-600 dark:text-whiteAlpha-600" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>검색 도움말</PopoverHeader>
            <PopoverBody>
              {`체크시 대소문자를 구분해줍니다. 예시) 체크 후 Over를 검색하면 True
              Lover는 검색되지 않습니다.`}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <Divider />
      <div className="m-2 flex flex-col flex-wrap gap-2 md:m-4 md:flex-row md:gap-4">
        <div className="flex items-center justify-start gap-4">
          <Checkbox
            value="viewLimit"
            onChange={handleCheckViewCountLimit}
            defaultChecked={options.viewCountLimit.check}
          >
            <FaEye className="size-4" />
          </Checkbox>
          <NumberInput
            defaultValue={options.viewCountLimit.min}
            min={MIN_COUNT}
            max={options.viewCountLimit.max}
            handleChange={handleChangeViewLowerCount}
          />
          <p>~</p>
          <NumberInput
            defaultValue={options.viewCountLimit.max}
            min={options.viewCountLimit.min}
            max={MAX_COUNT}
            handleChange={handleChangeViewUpperCount}
          />
        </div>
        <div className="flex items-center justify-start gap-4">
          <Checkbox
            value="likeLimit"
            onChange={handleCheckLikeCountLimit}
            defaultChecked={options.likeCountLimit.check}
          >
            <FaThumbsUp className="size-4" />
          </Checkbox>
          <NumberInput
            defaultValue={options.likeCountLimit.min}
            min={MIN_COUNT}
            max={options.likeCountLimit.max}
            handleChange={handleChangeLikeLowerCount}
          />
          <p>~</p>
          <NumberInput
            defaultValue={options.likeCountLimit.max}
            min={options.likeCountLimit.min}
            max={MAX_COUNT}
            handleChange={handleChangeLikeUpperCount}
          />
        </div>
        <div className="flex items-center justify-start gap-4">
          <Checkbox
            value="commentLimit"
            onChange={handleCheckCommentCountLimit}
            defaultChecked={options.commentCountLimit.check}
          >
            <FaComment className="size-4" />
          </Checkbox>
          <NumberInput
            defaultValue={options.commentCountLimit.min}
            min={MIN_COUNT}
            max={options.commentCountLimit.max}
            handleChange={handleChangeCommentLowerCount}
          />
          <p>~</p>
          <NumberInput
            defaultValue={options.commentCountLimit.max}
            min={options.commentCountLimit.min}
            max={MAX_COUNT}
            handleChange={handleChangeCommentUpperCount}
          />
        </div>
      </div>
    </div>
  );
}
