import axios from "axios";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import puppeteer from "puppeteer";
// const puppeteer = require('puppeteer');

async function getIframeContent(url) {
    const browser = await puppeteer.launch({ headless: "new" }); // puppeteer 시작
    const page = await browser.newPage(); // 브라우저 실행

    await page.goto(url); // 해당 페이지로 이동
    const writer = await page.$("h1");
    console.log(writer);
    await browser.close(); // 브라우저 종료
}

const getAuthorProfile = async (req, res) => {
    const { postId } = req.query;
    const url = `https://cafe.naver.com/steamindiegame/${postId}`;
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const html = iconv.decode(response.data, "EUC-KR").toString();
    // console.log(html);
    const $ = cheerio.load(html);

    // const writer = $("body").find("#cafe_main");
    const iframe = $("body")
        .find("div#cafe-body")
        .find("div#content-area")
        .find("div#main-area")
        .extract("iframe");
    console.log(iframe.html());
    console.log("!!!");
    getIframeContent(url);
    // const $2 = cheerio.load(iframe);
    // console.log($2.html());
    // console.log($2("h1").text());

    const author = {
        author_name: "test",
        author_url: "test",
        author_prof_url: "test",
    };
    res.status(200).json({ author });
};

export default getAuthorProfile;
