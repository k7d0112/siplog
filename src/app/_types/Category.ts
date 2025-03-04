// カテゴリーテーブルのデータ型
export type Category = {
  id: number,
  name: string,
  // createdAt: string,
  // updateAt: string,
}

export type postCategory = {
  category: Category,
  createdAt: Date,
  id: number,
  updatedAt: Date,
  postId: number,
  categoryId: number,
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

// カテゴリー新規作成時の型
export type CreateCategoriesRequestBody = {
  name: string,
}