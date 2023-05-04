import axios from "axios";
import cheerio from "cheerio";
import iconv from "iconv-lite";

const getAuthorProfile = async (req, res) => {
    const { postId } = req.query;
    const url = `https://cafe.naver.com/steamindiegame/${postId}`;
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = iconv.decode(response.data, "EUC-KR").toString();
    const $ = cheerio.load(data);
    console.log("!!!!!!" + $("div#app"));
    const author_name = $(".article_writer").find(".user").text();
    const author_url = $(".article_writer").find("a").attr("href");
    const author_prof_url = $(".article_writer")
        .find("a")
        .find("img")
        .attr("src");

    console.log(author_name);
    console.log(author_url);
    console.log(author_prof_url);

    res.status(200).json({ author_name, author_url, author_prof_url });
};

export default getAuthorProfile;
