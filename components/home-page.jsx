import { useState, useEffect } from "react";
import UploadImages from "./UploadImages";
import Thumb from "./Thumb";
import CountUp from "react-countup";

const HomePage = ({ counter }) => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        console.log(files);
        if (files.length > 0) {
            console.log(files[0]);
            const body = new FormData();
            body.append("image", files[0]);
            fetch("https://isd-fanart.reruru.com/receive", {
                method: "POST",
                body: body,
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    }, [files]);

    const getDataFromChild = (data) => {
        setFiles(data);
    };

    return (
        <div className="home_body">
            <div className="counter">
                현재까지 &nbsp; <CountUp end={counter} />
                개의 출처를 찾았습니다.
            </div>
            <div className="title">
                <h1 className="title-main">
                    <span className="highlight">RE: </span> FIND
                </h1>
                <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>
            </div>
            <UploadImages getDataFromChild={getDataFromChild} />
            <Thumb files={files} />
        </div>
    );
};

export default HomePage;
