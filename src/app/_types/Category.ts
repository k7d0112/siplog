// カテゴリーテーブルのデータ型
export type Category = {
  id: number,
  name: string,
  createdAt: string,
  updateAt: string,
}

// フロントページのニュースカテゴリー
export type FrontPostCategory = {
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
}