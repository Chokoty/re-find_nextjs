import axios from 'axios';

const getArtistInfo = async (req, res) => {
  const { nickname } = req.query;
  console.log(nickname);
  try {
    const response = await axios.get(
      `https://re-find.reruru.com/author_name2info?name=${nickname}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

export default getArtistInfo;
