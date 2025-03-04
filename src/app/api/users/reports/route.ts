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
    const { userId, type, title, content, cost, bitterness, sweetness, aroma, acidity, aftertaste, roastLevel, beanOrigin, cafeName }: CreateReportRequestBody = body;
    const createUserReport = await prisma.report.create({
      data: {
        userId,
        type,
        title,
        content,
        cost,
        // ハンドドリップの場合のみ値を登録（その他は undefined のまま）
        bitterness: type === 'HAND_DRIP' ? parseInt(bitterness, 10) : undefined,
        sweetness: type === 'HAND_DRIP' ? parseInt(sweetness, 10) : undefined,
        aroma: type === 'HAND_DRIP' ? parseInt(aroma, 10) : undefined,
        acidity: type === 'HAND_DRIP' ? parseInt(acidity, 10) : undefined,
        aftertaste: type === 'HAND_DRIP' ? parseInt(aftertaste, 10) : undefined,
        roastLevel: type === 'HAND_DRIP' ? parseInt(roastLevel, 10) : undefined,
        beanOrigin: type === 'HAND_DRIP' ? beanOrigin : undefined,
        // カフェの場合のみ
        cafeName: type === 'CAFE' ? cafeName : undefined,
      },
    });

    return NextResponse.json({ status: 'ok', message: 'レポートを作成しました', report: createUserReport }, { status: 200 });
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

// ユーザーマイページレポート更新用APIエンドポイント
export const PUT = async ( request: NextRequest ) => {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;
    const updatedReport = await prisma.report.update({
      where: {
        id: id,
      },
      data: updatedData,
    });
    return NextResponse.json({ status: 'ok', report: updatedReport }, { status: 200});
  } catch (error) {
    return NextResponse.json({ status: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}

// ユーザーマイページレポート削除用APIエンドポイント
export const DELETE = async ( request: NextRequest ) => {
  try {
    const { id } = await request.json();
    const deletedReport = await prisma.report.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ status: 'ok', report: deletedReport }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}