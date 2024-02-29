import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // const { nickname, type, page } = req.query;
  const nickname = req.nextUrl.searchParams.get('nickname');
  const type = req.nextUrl.searchParams.get('type');
  const page = req.nextUrl.searchParams.get('page');

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/author_artworks?name=${nickname}&type=${type}&page=${page}}`
    );
    // console.log(response.data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    NextResponse.json(
      { error: 'Error fetching artist artworks' },
      { status: 500 }
    );
  }
}
