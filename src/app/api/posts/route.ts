import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreatePostRequestBody, UpdateUserPost } from '@/app/_types/Post';
import { supabase } from '@/app/_libs/supabase';

const prisma = new PrismaClient();

// 記事一覧取得用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ status: 'Error', message: '認証トークンが必要です' }, { status: 401 });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ status: 'Error', message: '認証に失敗しました。' }, { status: 401 });
  }

  const userId = user.id;

  try {
    const posts = await prisma.post.findMany ({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        goods: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
        comments: true,
        user: {
          select: {
            userId: true,
            userName: true,
            thumbnailImageKey: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // postsデータの整形
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      postUserId: post.postUserId,
      content: post.content,
      goodAmount: post.goods.length,
      commentAmount: post.comments.length,
      categories: post.postCategories.map((postCategory) => ({
        id: postCategory.category.id,
        name: postCategory.category.name,
      })),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        userId: post.user.userId,
        userName: post.user.userName,
        thumbnailImageKey: post.user.thumbnailImageKey,
      },
      liked: post.goods.length > 0,
    }));

    return NextResponse.json({ status: 'OK', posts: formattedPosts }, { status: 200 })
  } catch (error) {
    if ( error instanceof Error )
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// 記事新規作成用APIエンドポイント
export const POST = async ( request: NextRequest, context: any) => {
  try {
    const body = await request.json();
    const { postUserId, content, categories }: CreatePostRequestBody = body;
    const newPost = await prisma.post.create({
      data: {
        postUserId,
        content,
        goodAmount: 0,
        commentAmount: 0,
      },
    });

    // 記事とカテゴリーの中間テーブルのレコードをDBに生成
    for ( const category of categories) {
      await prisma.postCategory.create({
        data: {
          postId: newPost.id,
          categoryId: category.id,
        },
      });
    }

    return NextResponse.json({
      status: 'OK ',
      message: '投稿を作成しました',
      id: newPost.id,
    }, {
      status: 200,
    });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// ユーザー投稿更新用APIエンドポイント
export const PUT = async (request: NextRequest) => {
  try {
    const token = await request.headers.get('Authorization') ?? '';
    const { data: authUser, error } = await supabase.auth.getUser(token);
    if ( error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    const { postId, content, categories }: UpdateUserPost = await request.json();
    if (!postId) {
      return NextResponse.json({ status: '更新対象の投稿IDが見つかりません' }, { status: 400 });
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    // 該当投稿が存在するか&認証ユーザーの投稿かを確認
    if (!existingPost) {
      return NextResponse.json({ status: '指定された投稿が存在しません' }, { status: 404 });
    }
    if (existingPost.postUserId !== authUser.user.id) {
      return NextResponse.json({ status: 'この投稿を編集する権限がありません' }, { status: 403 });
    }

    // 記事を更新&postCategoriesを一度削除してから、選択されたカテゴリーを再度追加
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content,
        updatedAt: new Date(),
        postCategories: {
          // 既存のカテゴリーを削除
          deleteMany: {},
          create: categories.map((cat) => ({
            categoryId: cat.id,
          })),
        },
      },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
        goods: true,
        comments: true,
      },
    });

    // レスポンス用に整形
    const formattedPost = {
      id: updatePost.id,
      postUserId: updatePost.postUserId,
      content: updatePost.content,
      goodAmount: updatePost.goods.length,
      commentAmount: updatePost.comments.length,
      categories: updatePost.postCategories.map((postCategory) => ({
        id: postCategory.category.id,
        name: postCategory.category.name,
      })),
      createdAt: updatePost.createdAt,
      updatePost: updatePost.updatedAt,
    }

    return NextResponse.json({ status: 'ok', updateUserPost: formattedPost }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}