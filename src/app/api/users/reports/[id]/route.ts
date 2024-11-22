import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { supabase } from '@/utils/supabase'
import { UpdateReportRequestBody } from '@/app/_types/Report';

const prisma = new PrismaClient();

// ログインユーザー時のレポート詳細取得用API
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string }}
) => {
  const { id } = params;
  try {
    const userReport = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        reportCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ status: 'ok', report: userReport }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// ログイン済ユーザーのレポート詳細更新用APIエンドポイント
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string }}
) => {
  const { id } = params;
  const { title, content, reportCategories }: UpdateReportRequestBody = await request.json();
  try {
    const updateUserReport = await prisma.report.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });

    // 中間テーブルのデータを削除
    await prisma.reportCategory.delete({
      where: {
        id: parseInt(id),
      },
    });

    // レポートとカテゴリーの中間テーブルのレコードを生成
    for ( const category of reportCategories ) {
      await prisma.reportCategory.create({
        data: {
          reportId: updateUserReport.id,
          categoryId: category.category.id,
        },
      });
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// ログイン済ユーザーのレポート削除用APIエンドポイント
export const DELETE = async (
  request: NextRequest,
  { params }: { params : { id: string }}
) => {
  const { id } = params;
  try {
    await prisma.report.delete({
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