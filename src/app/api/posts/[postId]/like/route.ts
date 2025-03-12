// app/api/posts/[id]/like/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/app/_libs/supabase';

const prisma = new PrismaClient();

export const POST = async (
  request: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: '認証トークンがありません' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ message: 'ユーザー認証に失敗しました' }, { status: 401});
    }

    const postIdNumber = Number(params.postId);
    if (isNaN(postIdNumber)) {
      return NextResponse.json({ message: '不正な投稿IDです' }, { status: 400 });
    }

    const existingLike = await prisma.goods.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postIdNumber,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: '既にこの投稿にいいねしています' }, { status: 400 });
    }

    await prisma.goods.create({
      data: {
        userId: user.id,
        postId: postIdNumber,
      },
    });

    const totalGoods = await prisma.goods.count({
      where: {
        postId: postIdNumber,
      },
    });

    return NextResponse.json({ message: 'いいね完了しました', goodAmount: totalGoods }, { status: 200 });
  } catch (error: any) {
    console.error('高評価処理エラー:', error.message);
    return NextResponse.json({ message: '高評価の処理に失敗しました:' }, { status: 500 });
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { postId: string }}
) => {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: '認証トークンがありません' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (!user || authError) {
      return NextResponse.json({ message: 'ユーザー認証に失敗しました' }, { status: 401 });
    }

    const postIdNum = Number(params.postId);
    if (isNaN(postIdNum)) {
      return NextResponse.json({ message: '不正な投稿IDです' }, { status: 400 });
    }

    const existingLike = await prisma.goods.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postIdNum,
        },
      },
    });
    if (!existingLike) {
      return NextResponse.json({ message: '既にいいねは取り消されています' }, { status: 400 });
    }

    await prisma.goods.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postIdNum,
        },
      },
    });

    const totalGoods = await prisma.goods.count({
      where: {
        postId: postIdNum,
      },
    });

    return NextResponse.json({ message: 'いいねを取り消しました', goodAmount: totalGoods });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: `いいねの取り消しに失敗しました: ${error.message}` }, { status: 500 });
  }
}