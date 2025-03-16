import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Post, UpdatePostRequestBody } from '@/app/_types/Post';

// 記事詳細取得時のAPIエンドポイント
const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: {postId: string } },
) => {
  const { postId } = params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
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
        goods: true,
        comments: {
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
        },
        user: {
          select: {
            userId: true,
            userName: true,
            thumbnailImageKey: true,
          },
        },
      },
    });

    // 投稿詳細データがなかった場合の処理
    if ( !post ) {
      return NextResponse.json({ status: 'post not found' }, { status: 400});
    }

    // postデータの整形
    const formattedPost = {
      id: post.id,
      postUserId: post.postUserId,
      content: post.content,
      goodAmount: post.goods.length,
      commentAmount: post.comments.length,
      categories: post.postCategories.map((postCategory) => ({
        id: postCategory.category.id,
        name: postCategory.category.name,
      })),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        user: {
          // id: comment.user.id,
          userId: comment.user.userId,
          userName: comment.user.userName,
          thumbnailImageKey: comment.user.thumbnailImageKey,
        },
        createdAt: comment.createdAt,
      })),
      user: {
        userId: post.user.userId,
        userName: post.user.userName,
        thumbnailImageKey: post.user.thumbnailImageKey,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }

    return NextResponse.json({ status: 'OK', post: formattedPost }, {status: 200 })
  } catch ( error ) {
    if ( error instanceof Error )
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// 記事更新用のAPIエンドポイント
export const PUT = async (
  request: NextRequest,
  { params }: { params: {id: string } },
) => {
  const { id } = params;
  const { postUserId, content, goodAmount, commentAmount, categories }: UpdatePostRequestBody = await request.json();

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        postUserId,
        content,
        goodAmount,
        commentAmount,
      },
    });

    // 一旦記事とカテゴリーの中間テーブルのレコードを削除
    await prisma.postCategory.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    // 記事とカテゴリーの中間テーブルのレコードをDBに生成
    for ( const category of categories ) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id,
        },
      });
    }

    return NextResponse.json({ status: 'OK', post: post }, { status: 400});
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// 記事削除用APIエンドポイント
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string }}
) => {
  const { id } = params;

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ status: 'OK' }, {status: 200});
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}