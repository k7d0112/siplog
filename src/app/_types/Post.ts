import { Category, FrontPostCategory } from "./Category";
import { Goods } from './Goods';
import { Comments } from './Comments';

// postテーブルのデータ型
export type Post = {
  id: number,
  postUserId: string,
  content: string,
  goodAmount: number,
  commentAmount: number,
  createdAt: string,
  updateAt: string,
  postCategories: { category: Category }[],
  goods: { goods: Goods }[],
  comments: { comments: Comments }[],
}

// 記事作成時のデータ型(categoryは中間テーブルでcategoryテーブルと繋ぐから記事作成時のcategoriesはidのみで、idを中間テーブルに紐づける)
export type CreatePostRequestBody = {
  postUserId: string,
  content: string,
  categories: { id: number }[],
}

// 記事更新時のデータ型
export type UpdatePostRequestBody = {
  postUserId: string,
  content: string,
  goodAmount: number,
  commentAmount: number,
  categories: { id: number }[],
  goods: { goods: Goods }[],
  comments: { comments: Comments }[],
}

// フロントページのデータ型
export type FrontPost = {
  id: string,
  title: string,
  contents: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  categories: FrontPostCategory[],
}