import axios from 'axios';

const getArtistArtworks = async (req, res) => {
  const { nickname, type, page } = req.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}/author_artworks?name=${nickname}&type=${type}&page=${page}}`
    );
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artist artworks' });
  }
};

export default getArtistArtworks;
