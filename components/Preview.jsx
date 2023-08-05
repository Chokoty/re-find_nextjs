import React from "react";
import Image from "next/image";

const Preview = ({ files }) => {
    const file = files[0];

    const previewContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
        marginBottom: 30,
    };
    const img = {
        display: "flex",
        height: "100%",
        borderRadius: "1rem",
    };

    return (
        <div style={previewContainer} className="preview">
            <Image
                alt={file.name}
                width={475}
                height={475}
                style={img}
                src={file.preview}
                // Revoke data uri after image is loaded
                onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                }}
                unoptimized
            />
        </div>
    );
};

export default Preview;
