import { ReportType } from '@prisma/client'

// レポートテーブルのデータ型
export type Report = {
  id: number,
  userId: string,
  type: ReportType,
  title: string,
  content: string,
  cost: number,
  bitterness: string,
  sweetness: string,
  aroma: string,
  acidity: string,
  aftertaste: string,
  roastLevel: string,
  beanOrigin?: string,
  cafeName?: string,
  createdAt: string,
  updatedAt: string,
}

// 新規レポート作成時のデータ型
export type CreateReportRequestBody = {
  userId: string,
  type: ReportType,
  title: string,
  content: string,
  cost: number,
  bitterness: string,
  sweetness: string,
  aroma: string,
  acidity: string,
  aftertaste: string,
  roastLevel: string,
  beanOrigin?: string,
  cafeName?: string,
}

// レポート更新時のデータ型
export type UpdateReportRequestBody = {
  // title: 'ハンドドリップ' | 'カフェ',
  // content: string,
  // reportCategories: { category: Category }[],
}

// useSWRのmutateで取得する際のデータ型
export type MutateReport = {
  id: number,
  userId: string,
  type: ReportType,
  title: string,
  content: string,
  cost: number,
  bitterness?: number | null,
  sweetness?: number | null,
  aroma?: number | null,
  acidity?: number | null,
  aftertaste?: number | null,
  roastLevel?: number | null,
  beanOrigin?: string | null,
  cafeName?: string | null,
  createdAt: string,
  updatedAt: string,
}

// APIレスポンス時の型定義
export type ReportsResponse = {
  status: string,
  reports: MutateReport[],
}

// 棒グラフ用の型定義
export type BarChartData = {
  month: string,
  cost: number,
}

// 円グラフ用の型定義
export type PieChartData = {
  name: string,
  value: number,
}

// レーダーチャート用の型定義
export type RadarChartData = {
  subject: string,
  value: number,
}

// レポート詳細表示用の型定義
export type ReportDetailModalProps = {
  report: MutateReport,
  onClose: () => void,
}