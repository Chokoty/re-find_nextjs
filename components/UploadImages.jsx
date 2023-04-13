import React from "react";
import { useDropzone } from "react-dropzone";
// import { TbCloudUpload } from "react-icons/tb";
import { SlCloudUpload } from "react-icons/sl";
// import { FiUpload } from "react-icons/fi";

const UploadImages = ({ getDataFromChild }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
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
        <div className="uploader">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <SlCloudUpload className="logo" />
                <div>
                    여기로 이미지를 드래그하거나 화면을 클릭하여 파일을&nbsp;
                    <span className="underline">업로드</span>하세요.
                </div>
            </div>
        </div>
    );
};

export default UploadImages;
