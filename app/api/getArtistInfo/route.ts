import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const nickname = req.nextUrl.searchParams.get('nickname');

  console.log(nickname);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/author_name2info?name=${nickname}`
    );
    // console.log(response.data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
