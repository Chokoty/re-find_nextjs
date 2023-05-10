import puppeteer from "puppeteer";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import axios from "axios";
import { JSDOM } from "jsdom";

async function getIframeContent(url) {
    const browser = await puppeteer.launch({ headless: "new" }); // puppeteer 시작
    await browser.userAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    );
    const page = await browser.newPage(); // 브라우저 실행

    try {
        // 웹 페이지 방문
        await page.goto(url);
        await page.waitForSelector("body");
        console.log(await page.evaluate("navigator.userAgent"));

        // 원하는 요소의 선택자를 사용하여 해당 요소 가져오기
        // const writer = await page.$("#ct>div.post_title");
        // console.log(writer);
        // const writerText = await page.evaluate((el) => el.innerHTML, writer);
        // console.log(writerText);
        const element = await page.evaluate(() => {
            const targetElement = document.querySelector("body");
            return targetElement ? targetElement.innerHTML : null;
        });
        console.log(element);

        console.log("!!!");
    } catch (error) {
        console.error("Error during web scraping:", error);
    } finally {
        // 브라우저 인스턴스 종료
        await browser.close();
    }
}

// async function getPartialContent(url, selector) {
//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.goto(url);

//     const element = await page.$(selector);
//     const content = await page.evaluate((el) => el.innerHTML, element);

//     await browser.close();

//     return content;
// }

const getAuthorProfile = async (req, res) => {
    const { postId } = req.query;
    const url = `https://cafe.naver.com/steamindiegame/${postId}`;
    // const url = `https://m.cafe.naver.com/steamindiegame/${postId}`;
    // const url = `https://m.cafe.naver.com/ca-fe/web/cafes/steamindiegame/articles/${postId}?useCafeId=false`;
    // const response = await fetch(url);
    // const html = await response.text();
    // console.log(html);
    getIframeContent(url);
    console.log("!?!");

    // const response = await axios.get(url, { responseType: "arraybuffer" });
    // const html = iconv.decode(response.data, "EUC-KR").toString();
    // console.log(html);

    // const response = await axios.get(url, { responseType: "text" });
    // const html = response.data;
    // const $ = cheerio.load(html);
    // console.log($.html());

    const author = {
        author_name: "test",
        author_url: "test",
        author_prof_url: "test",
    };
    res.status(200).json({ author });
};

export default getAuthorProfile;
