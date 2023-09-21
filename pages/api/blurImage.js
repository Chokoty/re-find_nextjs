import axios from 'axios';
import sharp from 'sharp';

const blurImage = async (req, res) => {
  const imageUrl = req.query.url;

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = response.data;

    const blurredImage = await sharp(imageBuffer).blur(4).toBuffer();
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(blurredImage);
  } catch (error) {
    res.status(500).send('Error processing image');
  }
};

export default blurImage;
