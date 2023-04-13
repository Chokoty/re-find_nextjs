import { useState, useEffect } from "react";
import Link from "next/link";
import UploadImages from "./UploadImages";
import Preview from "./Preview";
import CountUp from "react-countup";

const HomePage = ({ counter }) => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        console.log(files);
        if (files.length > 0) {
            console.log(files[0]);
            const body = new FormData();
            body.append("image", files[0]);
            //     fetch("https://isd-fanart.reruru.com/receive", {
            //         method: "POST",
            //         body: body,
            //     })
            //         .then((res) => res.json())
            //         .then((data) => console.log(data));
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
                    개의 출처를 찾았습니다.
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
                    <button>새 이미지 업로드</button>
                    <Preview files={files} />
                </div>
            )}
        </div>
    );
};

export default HomePage;
