import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";

const UploadImages = ({ getDataFromChild }) => {
    const acceptedFiles = useCallback((files) => {
        // 이미지 파일만 받기 위해서는 files 배열에서 type이 image인 것만 필터링합니다.
        const images = files.filter((file) => file.type.startsWith("image/"));
        console.log(images);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
            // maxSize: 1048576, // 1MB
        },
        onDrop: (acceptedFiles) => {
            // console.log(acceptedFiles);
            getDataFromChild(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    return (
        <div className={`uploader ${isDragActive ? "active" : ""}`}>
            <div
                {...getRootProps({
                    className: "dropzone",
                })}
            >
                <input {...getInputProps()} />
                <SlCloudUpload className="logo" />
                <div>
                    {isDragActive ? (
                        <p>이미지를 여기에 드롭하세요!</p>
                    ) : (
                        <p>
                            {" "}
                            이미지를 여기로 드래그하거나 화면을 클릭하여
                            파일을&nbsp;
                            <span className="underline">업로드</span>하세요.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadImages;
