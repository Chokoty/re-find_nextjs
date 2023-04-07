import React from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileImage } from "react-icons/ai";

export const UploadImages = ({ getDataFromChild }) => {
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
                <div>화면을 클릭하여 이미지를 업로드</div>
                <AiOutlineFileImage className="logo" />
                <div>..또는</div>
                <div>드래그 앤 드롭으로 이미지를 업로드해주세요.</div>
            </div>
        </div>
    );
};
