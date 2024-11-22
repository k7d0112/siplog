import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// カテゴリー一覧取得用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ status: 'OK', categories }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}