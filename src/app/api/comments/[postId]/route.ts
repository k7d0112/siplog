import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { CreateCommentRequestBody } from '@/app/_types/Comments';
import { supabase } from '@/app/_libs/supabase';

const prisma = new PrismaClient();

// コメント一覧取得用APIエンドポイント
export async function GET(
  request: NextRequest,
) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: '認証トークンがありません' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (!user || authError) {
      return NextResponse.json({ message: 'ユーザー認証に失敗しました' }, { status: 401 });
    }

    const url = new URL(request.url);
    const pathnames = url.pathname.split('/');
    const postId = pathnames[pathnames.length - 1];
    const postIdNumber = Number(postId);
    if (isNaN(postIdNumber)) {
      return NextResponse.json({ message: '不正な投稿IDです' }, { status: 400 });
    }

    const comments = await prisma.comments.findMany({
      where: {
        postId: postIdNumber,
      },
      include: {
        user: {
          select: {
            id: true,
            userId: true,
            userName: true,
            thumbnailImageKey: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return NextResponse.json({ status: 'OK', comments }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}