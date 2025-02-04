import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // transactional code
    return NextResponse.json({});
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
