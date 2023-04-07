import React from "react";
import Image from "next/image";

const Thumb = ({ files }) => {
    const thumbsContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
        marginBottom: 30,
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
    let thumbs = null;

    if (files.length > 0) {
        thumbs = files.map((file) => (
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
    } else {
        thumbs = <div></div>;
    }

    return <aside style={thumbsContainer}>{thumbs}</aside>;
};

export default Thumb;
