import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ゲストログイン時にゲスト用のユーザー情報を取得
export const GET = async ( request: NextRequest ) => {
  try {
    const guestUserProfile = await prisma.user.findFirst({
      where: {
        email: 'kand10151550@gmail.com',
      },
      select: {
        userId: true,
        userName: true,
        content: true,
        thumbnailImageKey: true,
      },
    });

    if (!guestUserProfile) {
      return NextResponse.json({ message: 'guestUserProfile is not found' }, { status: 400 });
    }

    return NextResponse.json({ status: 'ok', guestUserProfile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}