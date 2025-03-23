import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
// import { supabase } from '@/app/_libs/supabase'
// import { UpdatePostRequestBody } from '@/app/_types/Post';

const prisma = new PrismaClient();

// ログイン済ユーザーのマイページでの投稿詳細取得用APIエンドポイント
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) => {
  const { id } = await params;
  try {
    const userPost = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
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
      },
    });

    if ( !userPost ) {
      return NextResponse.json({ status: 'post not found' }, { status: 400 });
    }

    const formattedUserPost = {
      id: userPost.id,
      postUserId: userPost.postUserId,
      content: userPost.content,
      goodAmmount: userPost.goods.length,
      commentAmmount: userPost.comments.length,
      categories: userPost.postCategories.map((postCategory) => ({
        id: postCategory.category.id,
        name: postCategory.category.name,
      })),
      comments: userPost.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        user: {
          id: comment.user.id,
          userId: comment.user.userId,
          name: comment.user.userName,
          thumbnailImageKey: comment.user.thumbnailImageKey,
        },
        createdAt: comment.createdAt,
      })),
      createdAt: userPost.createdAt,
    }

    return NextResponse.json({ status: 'ok', post: formattedUserPost }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// 投稿更新用APIエンドポイント
// export const PUT = async (
//   request: NextRequest,
//   { params } : { params: { id: string }}
// ) => {
//   const { id } = params;
//   const { postUserId, content, goodAmount, commentAmount, categories }: UpdatePostRequestBody = await request.json();

//   try {
//     const updateUserPost = await prisma.post.update({
//       where: {
//         id: parseInt(id),
//       },
//       data: {
//         postUserId,
//         content,
//         goodAmount,
//         commentAmount,
//       },
//     });

//     // 一旦記事とカテゴリーの中間テーブルのデータを削除
//     await prisma.postCategory.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//   // 記事とカテゴリーの中間テーブルのレコードをDBに生成
//   for ( const category of categories ) {
//     await prisma.postCategory.create({
//       data: {
//         postId: updateUserPost.id,
//         categoryId: category.id,
//       },
//     });
//   }

//     return NextResponse.json({ status: 'ok' }, { status: 200 });
//   } catch ( error ) {
//     if ( error instanceof Error ) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// }

// 投稿削除用APIエンドポイント
export const DELETE = async (
  request: NextRequest,
  { params } : { params: Promise<{ id: string }>}
) => {
  const { id } = await params;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}