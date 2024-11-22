import { Category } from './Category'

// レポートテーブルのデータ型
export type Report = {
  id: number,
  userId: string,
  title: 'ハンドドリップ' | 'カフェ',
  content: string,
  reportCategories: { category: Category }[],
  createdAt: string,
  updatedAt: string,
}

// 新規レポート作成時のデータ型
export type CreateReportRequestBody = {
  userId: string,
  title: 'ハンドドリップ' | 'カフェ',
  content: string,
  reportCategories: { category: Category }[],
}

// レポート更新時のデータ型
export type UpdateReportRequestBody = {
  title: 'ハンドドリップ' | 'カフェ',
  content: string,
  reportCategories: { category: Category }[],
}