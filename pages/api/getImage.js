import axios from "axios";

const getImage = async (req, res) => {
    try {
        const { imgUrl } = req.query;
        const url = imgUrl;

        const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
        });

        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while fetching the image.",
        });
    }
};

export default getImage;
