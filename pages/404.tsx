import Image from "next/image";
import { Text, Heading } from "@chakra-ui/react";
export default function Custom404() {
    return (
        <div
            style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                width: "80%",
            }}
        >
            <Heading as="h1" size="md" mb="20px">
                404 - Page Not Found
            </Heading>

            <Image
                src="/404-박쥐단.gif"
                alt="404-박쥐단"
                width={400}
                height={400}
                unoptimized
            />
        </div>
    );
}
