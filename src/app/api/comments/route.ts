import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateCommentRequestBody } from '@/app/_types/Comments';
// import { supabase } from '@/app/_libs/supabase';

const prisma = new PrismaClient();

// コメント作成用APIエンドポイント
export const POST = async( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { text, postId, userId }: CreateCommentRequestBody = body;
    const createComment = await prisma.comments.create({
      data: {
        text,
        postId,
        userId,
      },
    });
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        commentAmount: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({
      status: 'OK',
      message: 'メッセージを作成しました',
      id: createComment.id,
    },{
      status: 200,
    });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}