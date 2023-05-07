import axios from "axios";
import puppeteer from "puppeteer";
// import cheerio from "cheerio";
// import iconv from "iconv-lite";

async function getIframeContent(url) {
    const browser = await puppeteer.launch({ headless: "new" }); // puppeteer 시작
    const page = await browser.newPage(); // 브라우저 실행

    try {
        // 웹 페이지 방문
        await page.goto(url);
        // 원하는 요소의 선택자를 사용하여 해당 요소 가져오기
        const element = await page.$("#main-area");
        const text = await page.evaluate((el) => el.innerHTML, element);
        // console.log(text);
        // console.log("!!!");
        const iframeSrc = await page.evaluate(() => {
            const iframe = document.querySelector("#main-area > iframe");
            return iframe?.src;
        });
        console.log(iframeSrc);
        const iframeElement = await page.$("#main-area > iframe");
        const frame = await iframeElement.contentFrame();
        const innerHTML = await frame.evaluate((el) => el.innerHTML, frame);

        console.log(innerHTML);
        // const iframePage = await browser.newPage();
        // await iframePage.goto(iframeSrc);
        // await iframePage.waitForNavigation(); // iframe 페이지가 로드되기를 기다립니다.

        // const element2 = await iframePage.waitForSelector(".article_writer"); // 요소가 나타날 때까지 기다립니다.

        // const element2 = await iframePage.$(".article_writer");
        // const innerHTML = await iframePage.evaluate(
        //     (el) => el.innerHTML,
        //     element2
        // );
        // console.log(innerHTML);
        console.log("!!!");
    } catch (error) {
        console.error("Error during web scraping:", error);
    } finally {
        // 브라우저 인스턴스 종료
        await browser.close();
    }
}

const getAuthorProfile = async (req, res) => {
    const { postId } = req.query;
    const url = `https://cafe.naver.com/steamindiegame/${postId}`;
    getIframeContent(url);
    console.log("!?!");

    // const response = await axios.get(url, { responseType: "arraybuffer" });
    // const html = iconv.decode(response.data, "EUC-KR").toString();
    // // console.log(html);
    // const $ = cheerio.load(html);

    // const writer = $("body").find("#cafe_main");
    // const iframe = $("body")
    //     .find("div#cafe-body")
    //     .find("div#content-area")
    //     .find("div#main-area");
    // // .extract("iframe");
    // console.log(iframe.html());
    // console.log("!!!");
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
