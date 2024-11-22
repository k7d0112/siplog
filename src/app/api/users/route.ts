import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { supabase } from '@/utils/supabase'
import { CreateUserRecord } from '@/app/_types/User'

const prisma = new PrismaClient();

// ユーザーサインアップ時にsupabaseのauth.userの情報をUserテーブルにも保存
export const POST = async ( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { userId, email }: CreateUserRecord = body;

    // Prismaで新しいユーザーを作成
    const newUser = await prisma.user.create({
      data: {
        userId,
        email,
      },
    });

    return NextResponse.json({ newUser }, { status: 201});
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// ログイン済ユーザーのマイページ表示用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
  // フロントエンドから送られてきたリクエストヘッダーからtokenを取得
  const token = request.headers.get('Authorization') ?? '';

  // supabaseに対してtokenを送る
  const { data: authUser, error } = await supabase.auth.getUser(token);

  // supabaseに送ったtokenが正しくない場合、errorが返却されるため、クライアントにもエラーを返す
  if ( error ) {
    return NextResponse.json({ status: error.message }, { status: 400});
  }

  // tokenが正しい場合以下を実行
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        userId: authUser.user.id,
      },
      select: {
        userId: true,
        name: true,
        content: true,
        thumbnailUrl: true,
      },
    });

    if ( !userProfile ) {
      return NextResponse.json({ status: 'User information not found'}, { status: 400 });
    }

    const postCount = await prisma.post.count({
      where: {
        postUserId: authUser.user.id,
      }
    });

    const formattedUserProfile = {
      id: userProfile.userId,
      name: userProfile.name,
      thumbnailUrl: userProfile.thumbnailUrl,
      content: userProfile.content,
      postCount: postCount,
    }

    return NextResponse.json({ status: 'ok', UserProfile: formattedUserProfile }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}