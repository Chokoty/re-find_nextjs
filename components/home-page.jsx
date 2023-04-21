import { useState, useEffect } from "react";
import Link from "next/link";
import UploadImages from "./UploadImages";
import Preview from "./Preview";
import CountUp from "react-countup";
import axios from "axios";

const HomePage = ({ counter, today_counter }) => {
    const [files, setFiles] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOriginalUrl = async () => {
        try {
            setError(null); // 요청이 시작 할 때에는 초기화하고
            setLoading(true); // loading 상태를 true 로 바꿉니다.
            const body = new FormData();
            body.append("file", files[0]);
            const response = await axios.post(
                "https://isd-fanart.reruru.com/receive",
                body
            );
            console.log(response.data.id);
            setData(response.data.id[0]);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (files.length > 0) {
            fetchOriginalUrl();
        }
    }, [files]);

    const getDataFromChild = (data) => {
        setFiles(data);
    };

    return (
        <div className="home_body">
            {counter === null ? (
                <div className="counter">
                    현재 서버와의 연결이 불안정합니다.
                </div>
            ) : (
                <div className="counter">
                    <CountUp end={counter} />
                    (+
                    <CountUp end={today_counter} duration={5} /> ) 개의 출처를
                    찾았습니다.
                </div>
            )}

            <div className="title">
                <Link href="/" className="content">
                    <h1 className="title-main">
                        <span className="highlight">RE: </span> FIND
                    </h1>
                </Link>
                <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>
            </div>
            {files.length === 0 && (
                <UploadImages getDataFromChild={getDataFromChild} />
            )}
            {files.length !== 0 && (
                <div>
                    {loading ? (
                        <div>검색중...</div>
                    ) : (
                        <div>
                            <a
                                href={
                                    "https://cafe.naver.com/steamindiegame/" +
                                    data
                                }
                            >
                                https://cafe.naver.com/steamindiegame/{data}
                            </a>
                            <button>새 이미지 업로드</button>
                        </div>
                    )}
                    <Preview files={files} />
                </div>
            )}
        </div>
    );
};

export default HomePage;
