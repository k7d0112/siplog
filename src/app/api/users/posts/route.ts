import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { supabase } from '@/app/_libs/supabase'

const prisma = new PrismaClient();

// ユーザーマイページの自身の投稿一覧取得用のAPIエンドポイント
export const GET = async ( request: NextRequest ) => {
  const token = await request.headers.get('Authorization') ?? '';
  const { data: authUser, error } = await supabase.auth.getUser(token);
  if ( error  ) {
    return NextResponse.json({ status: error.message }, { status: 400 });
  }

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        postUserId: authUser.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ status: 'ok', posts: userPosts }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}