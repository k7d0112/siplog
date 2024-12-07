import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { supabase } from '@/app/_libs/supabase'
import { CreateReportRequestBody } from '@/app/_types/Report';

const prisma = new PrismaClient();

// ユーザーマイページでのレポート取得用APIエンドポイント
export const GET = async ( request: NextRequest ) => {
  // フロントエンドから送られてきたリクエストヘッダーからトークンを取得
  const token = await request.headers.get('Authorization') ?? '';
  // supabaseに対してtokenを送る
  const { data: authUser, error } = await supabase.auth.getUser(token);
  if ( error ) {
    return NextResponse.json({ status: error.message }, { status: 400 });
  }

  try {
    const userReports = await prisma.report.findMany({
      where: {
        userId: authUser.user.id,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ status: 'ok', reports: userReports }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// ユーザーマイページレポート作成用APIエンドポイント
export const POST = async ( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { userId, title, content, reportCategories }: CreateReportRequestBody = body;
    const createUserReport = await prisma.report.create({
      data: {
        userId,
        title,
        content,
      },
    });

    for ( const category of reportCategories ) {
      await prisma.reportCategory.create({
        data: {
          reportId: createUserReport.id,
          categoryId: category.category.id,
        }
      })
    }

    return NextResponse.json({ status: 'ok', message: 'レポートを作成しました', report: createUserReport }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}