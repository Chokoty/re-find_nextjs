import axios from "axios";

const getThumbImg = async (req, res) => {
    const { url } = req.query;
    console.log(url);
    // try {
    //     const response = await axios.get(url, { responseType: "arraybuffer" }); // image
    //     const data = Buffer.from(response.data).toString("base64");
    //     console.log(data);

    //     res.status(200).json(`data:image/jpeg;base64,${data}`);
    // } catch (error) {
    //     console.log("Error fetching data :", error);
    //     res.status(200).json({});
    // }
};

export default getThumbImg;
