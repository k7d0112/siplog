import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreatePostRequestBody } from '@/app/_types/Post';

const prisma = new PrismaClient();

// 記事一覧取得用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
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
        goods: true,
        comments: true,
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
    const data = await prisma.post.create({
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
          postId: data.id,
          categoryId: category.id,
        },
      });
    }

    return NextResponse.json({
      status: 'OK ',
      message: '投稿を作成しました',
      id: data.id,
    }, {
      status: 200,
    });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}