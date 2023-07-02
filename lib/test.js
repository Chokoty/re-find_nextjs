import { useEffect } from "react";

export default function Congrat() {
    const [congrat, setCongrat] = useState(false); // 파일 업로드를 위한 상태

    // useEffect(() => {
    //     if (author === null) return;
    //     if (author?.title === "카페 멤버에게만 공개된 게시글 입니다.")
    //         setAuthor({
    //             profURL: "NULL",
    //             title: "카페 멤버에게만 공개된 게시글 입니다.",
    //             writerURL: data.author_profile,
    //             nickname: data.author_nickname,
    //         });
    //     else if (author?.title === "삭제되었거나 없는 게시글입니다.")
    //         setAuthor({
    //             profURL: "NULL",
    //             title: "삭제되었거나 없는 게시글입니다.",
    //             writerURL: data.author_profile,
    //             nickname: data.author_nickname,
    //         });
    // }, [author]);

    // 프로필 테스트용
    useEffect(() => {
        // fetchAuthorProfile("11379038");
        // fetchAuthorProfile("11379754");
        // fetchAuthorProfile("11251877"); // 0004 로그인 필요 401에러
        // fetchAuthorProfile("10532685"); // 4003 게시글이 존재하지 않습니다 404에러 // 삭제되었거나 없는 게시글입니다.
    }, []);

    return;
}
