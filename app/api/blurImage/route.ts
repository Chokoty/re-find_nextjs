import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('url') as string;

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = response.data;

    const blurredImage = await sharp(imageBuffer).blur(4).toBuffer();
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    NextResponse.json(blurredImage, { status: 200, headers });
  } catch (error) {
    NextResponse.json({ error: 'Error processing image' }, { status: 500 });
  }
}
