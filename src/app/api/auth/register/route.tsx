import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9180';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/auth/signup`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return NextResponse.json(response.data, { status: response.status });
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.message || 'Backend error' },
        { status: error.response.status },
      );
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
