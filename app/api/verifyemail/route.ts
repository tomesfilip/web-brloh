import { db } from '@/app/configs/db.config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;
    console.log(token);

    const user = await db.user.update({
      where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gte: new Date(),
        },
      },
      data: {
        verifyToken: null,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email verified', success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
