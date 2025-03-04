// app/api/posts/[id]/like/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ status: 'Error', message: '無効な投稿IDです。' }, { status: 400 });
  }

  // セッションからユーザーを取得
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  if (!userId) {
    return NextResponse.json({ status: 'Error', message: '認証が必要です。' }, { status: 401 });
  }

  try {
    // ユーザーが既に高評価をしているか確認
    const existingLike = await prisma.goods.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      return NextResponse.json({ status: 'Error', message: '既に高評価をしています。' }, { status: 400 });
    }

    // 高評価の追加
    await prisma.goods.create({
      data: {
        userId,
        postId,
      },
    });

    // 投稿の高評価数をインクリメント
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { goodAmount: { increment: 1 } },
    });

    return NextResponse.json({ status: 'OK', goodAmount: updatedPost.goodAmount }, { status: 200 });
  } catch (error: any) {
    console.error('高評価処理エラー:', error.message);
    return NextResponse.json({ status: 'Error', message: '高評価の処理に失敗しました。' }, { status: 500 });
  }
}