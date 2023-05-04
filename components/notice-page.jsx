import React from "react";
import OtherLayout from "./layout/other-layout";

const NoticePage = () => {
    return (
        <OtherLayout title="Notice">
            <div className="notice-content">
                <h1> 업데이트 내용</h1>
                <p>날짜: 6만 돌파하였습니다!</p>
                <p>날짜: 5만 돌파하였습니다!</p>
                <p>카운터: 9936 (since 2023.02.16 20:15) </p>
                <p>
                    2023.05.04 추가: RE:FIND를 리뉴얼 하였습니다. 많은 이용
                    부탁드립니다! 킹아!
                </p>
                <p>
                    2023.03.16 추가: 이제 금손 일러레의 방에 업로드 된 이미지도
                    검색할 수 있습니다. 비정기적으로 업데이트 됩니다.
                </p>
                <p>
                    2023.03.20 추가: AI로 그린 팬아트 검색에 대한 수요가 있는 것
                    같아서 왁타버스 불법 AI 팬아트도 추가했습니다. 비정기적으로
                    업데이트 됩니다.
                </p>
                <p>
                    2023.03.24 추가: 최적화 작업을 진행해서 속도가 약간 더
                    빨라졌습니다.
                </p>
                <p>
                    2023.04.02 추가: 잘못된 검색 결과가 나오는 경우를
                    줄였습니다. (3월 24일 이전의 속도로 다시 약간 느려짐)
                </p>
                <p>
                    2023.04.21 추가: 지난번 업데이트 이후로 누락되고 있던 ai
                    팬아트를 다시 포함시켰습니다.
                </p>
            </div>
        </OtherLayout>
    );
};

export default NoticePage;
