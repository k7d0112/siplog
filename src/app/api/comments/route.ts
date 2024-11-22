import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateCommentRequestBody } from '@/app/_types/Comments';

const prisma = new PrismaClient();

// コメント作成用APIエンドポイント
export const POST = async( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { text, postId, userId }: CreateCommentRequestBody = body;
    const data = await prisma.comments.create({
      data: {
        text,
        postId,
        userId,
      },
    });
    return NextResponse.json({
      status: 'OK',
      message: 'メッセージを作成しました',
      id: data.id,
    },{
      status: 200,
    });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// コメント一覧取得用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
  try {
    const comments = await prisma.comments.findMany({
      include: {
        user: {
          select: {
            id: true,
            userId: true,
            name: true,
            thumbnailUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ status: 'OK', comments: comments }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}