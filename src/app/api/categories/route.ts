import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateCategoriesRequestBody } from '@/app/_types/Category';

const prisma = new PrismaClient();

// カテゴリー一覧取得用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
      },
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

export const POST = async ( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { name }: CreateCategoriesRequestBody = body;
    const newCategory = await prisma.categories.create({
      data: {
        name,
      },
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch ( error ) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}