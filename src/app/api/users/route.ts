import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { supabase } from '@/app/_libs/supabase'
import { User, CreateUserRecord, UpdateUserinfo } from '@/app/_types/User'
import { GetUserInfo } from '@/app/(afterLogin)/users/_types/User';

const prisma = new PrismaClient();

// ユーザーサインアップ時にsupabaseのauth.userの情報をUserテーブルにも保存
export const POST = async ( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { userName, userId, email }: CreateUserRecord = body;

    // Prismaで新しいユーザーを作成
    const newUser = await prisma.user.create({
      data: {
        userId,
        email,
        userName,
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
  const authHeader = request.headers.get('Authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  // デバック用
  console.log("Received token:", token);

  // supabaseに対してtokenを送る
  const { data: authUser, error } = await supabase.auth.getUser(token);

  // supabaseに送ったtokenが正しくない場合、errorが返却されるため、クライアントにもエラーを返す
  if ( error || !authUser?.user ) {
    console.log('Supabase getUser error:', error);
    return NextResponse.json({ status: 'invalid token or user not found' }, { status: 400});
  }

  // tokenが正しい場合以下を実行
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        userId: authUser.user.id,
      },
      select: {
        userId: true,
        userName: true,
        content: true,
        thumbnailImageKey: true,
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
      userId: userProfile.userId,
      userName: userProfile.userName,
      thumbnailImageKey: userProfile.thumbnailImageKey,
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

// ユーザーマイページのユーザー情報更新用APIエンドポイント
export const PUT = async (
  request: NextRequest
) => {
  // フロントから送られてくるトークンを取得し、supabaseでトークンが正しいか検証＆ユーザー情報を取得
  const token = request.headers.get('Authorization') ?? '';
  const { data: authUser, error } = await supabase.auth.getUser(token);
  if ( error ) {
    return NextResponse.json({ status: error.message }, { status: 400 })
  }

  const { userName, content, thumbnailImageKey }: UpdateUserinfo = await request.json();

  try {
    const updateUserInfo = await prisma.user.update({
      where: {
        userId: authUser.user.id,
      },
      data: {
        userName,
        content,
        thumbnailImageKey,
      },
    });

    return NextResponse.json({ status: 'ok', updateUserInfo }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}