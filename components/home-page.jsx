import Link from "next/link";
import Image from "next/image";
import { AiOutlineFileImage } from "react-icons/ai";
import UploadImages from "./UploadImages";
import { useState, useEffect } from "react";

import { useDropzone } from "react-dropzone";

export const HomePage = () => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const thumbsContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
    };
    const thumb = {
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
    };

    const thumbInner = {
        display: "flex",
        minWidth: 0,
        overflow: "hidden",
    };
    const img = {
        display: "block",
        width: "auto",
        height: "100%",
    };

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <Image
                    alt={file.name}
                    width={500}
                    height={500}
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    // const files = acceptedFiles.map((file) => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div className="home_body">
            <div className="counter">현재까지 00개의 출처를 찾았습니다.</div>
            <div className="title">
                <h1 className="title-main">
                    <span className="highlight">RE: </span> FIND
                </h1>
                <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>
            </div>

            <div className="uploader">
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div>화면을 클릭하여 이미지를 업로드</div>
                    <AiOutlineFileImage className="logo" />
                    <div>..또는</div>
                    <div>드래그 앤 드롭으로 이미지를 업로드해주세요.</div>
                </div>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
            {/* <div className="fileView">
                <h4>Files</h4>
                <ul>{files}</ul>

                {files.map(path => 
                <img key={path} src={path} />
                }
            </div> */}

            <div className="description">
                <p>제작자: 레루루, 초코넛밀크티 </p>
                <p>왁물원: 링크1 링크2 </p>
                <p>참고: 키워드나 문장으로 팬아트 찾기(AI검색기)</p>
                <p>카운터: 9936 (since 2023.02.16 20:15) </p>
                <p>게시판: 이세돌 팬아트 게시판</p>
                <p>통합 BEST 팬아트 게시판 금손</p>
                <p>일러레의 방(비정기적 업데이트) </p>
                <p>왁타버스 불법 AI 팬아트(비정기적 업데이트)</p>
            </div>
        </div>
    );
};
