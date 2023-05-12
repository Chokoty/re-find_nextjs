import axios from "axios";
// import puppeteer from "puppeteer";
// import cheerio from "cheerio";
// import iconv from "iconv-lite";
// import { JSDOM } from "jsdom";

const getAuthorProfile = async (req, res) => {
    const { postId } = req.query;

    // 모르면 헤드를 도끼로 까자
    const url = `https://apis.naver.com/cafe-web/cafe-articleapi/v2.1/cafes/steamindiegame/articles/${postId}?useCafeId=false`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const temp = data.result.article.menu.name;
        const outputString = temp.replace(/&#\d+;/g, "").trim();

        const writer = {
            id: data.result.article.writer.id,
            title: data.result.article.subject,
            board: outputString,
            nickname: data.result.article.writer.nick,
            memberLevelName: data.result.article.writer.memberLevelName,
            memberKey: data.result.article.writer.memberKey,
            writerURL: `https://cafe.naver.com/ca-fe/cafes/27842958/members/${data.result.article.writer.memberKey}`,
            profURL: data.result.article.writer.image.url,
        };

        // const writerJSON = JSON.stringify(writer);
        // console.log(writer);
        // console.log(writerJSON);
        res.status(200).json(writer);
    } catch (error) {
        console.log("Error fetching data :", error);
        res.status(200).json({});
    }
};

export default getAuthorProfile;
