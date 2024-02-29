import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('postId');

  // 모르면 header를 도끼로 대가리!
  // const url = `https://apis.naver.com/cafe-web/cafe-articleapi/v2.1/cafes/steamindiegame/articles/${postId}?useCafeId=false`;
  const url = `https://apis.naver.com/cafe-web/cafe-articleapi/v2.1/cafes/steamindiegame/articles/${postId}?useCafeId=false&buid=7d2dd467-2e63-4364-bff9-4ac7210c5635`;
  try {
    const response = await axios.get(url);
    const dataResult = response.data.result;

    const errorCode = dataResult?.errorCode;
    console.log(errorCode);
    // if (errorCode === "0004" || errorCode === "4001") {
    //     throw new Error(dataResult.reason);
    // }

    const temp = dataResult.article.menu.name;
    const outputString = temp.replace(/&#\d+;/g, '').trim(); // 이모지 제거

    const { writeDate } = dataResult.article; // UNIX 시간
    const currentDate = new Date(); // 현재 날짜와 시간
    // const date = new Date(writeDate);
    // 업로드 시간 차이 계산 (밀리초 단위)
    const timeDifference = currentDate.getTime() - writeDate;

    // 시간 차이를 일(day) 단위로 변환
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // 시간 차이를 시간 단위로 변환
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    let uploadText = '';

    if (daysDifference >= 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      uploadText = `${yearsDifference}년 전 업로드`;
      // console.log(`업로드된 지 ${yearsDifference}년 전`);
    } else if (daysDifference >= 30) {
      const monthsDifference = Math.floor(daysDifference / 30);
      uploadText = `${monthsDifference}달 전 업로드`;
      // console.log(`업로드된 지 ${monthsDifference}달 전`);
    } else if (daysDifference > 0) {
      uploadText = `${daysDifference}일 전 업로드`;
      // console.log(`업로드된 지 ${daysDifference}일 전`);
    } else {
      uploadText = `${hoursDifference}시간 전 업로드`;
      // console.log(`업로드된 지 ${hoursDifference}시간 전`);
    }
    // console.log(uploadText);

    const writer = {
      id: dataResult.article.writer.id,
      title: dataResult.article.subject,
      board: outputString,
      nickname: dataResult.article.writer.nick,
      memberLevelName: dataResult.article.writer.memberLevelName,
      memberKey: dataResult.article.writer.memberKey,
      writerURL: `https://cafe.naver.com/ca-fe/cafes/27842958/members/${dataResult.article.writer.memberKey}`,
      profURL: dataResult.article.writer.image.url,
      uploadText,
    };
    // console.log(writer);
    // const writerJSON = JSON.stringify(writer);
    // console.log(writerJSON);
    return NextResponse.json(writer, { status: 200 });
  } catch (error) {
    // @ts-ignore
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 에러 처리
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      // @ts-ignore
    } else if (error.response && error.response.status === 404) {
      // 404 Not Found 에러 처리
      NextResponse.json({ error: 'Not Found' }, { status: 404 });
    } else {
      NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
