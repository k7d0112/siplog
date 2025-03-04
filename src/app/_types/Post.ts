import { Category, FrontPostCategory } from "./Category";
import { Goods } from './Goods';
import { Comments } from './Comments';
import { PostUserData } from "./User";

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

// ユーザーページの投稿一覧取得時のデータ型(フォーマット後)
export type UserPost = {
  id: number;
  postUserId: string;
  content: string;
  goodAmount: number;
  commentAmount: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  user: PostUserData,
  liked: boolean,
}

// ユーザー投稿詳細ページのデータ型
export type UserPostDetailProps = {
  post: UserPostDetail,
}

// ユーザー投稿詳細のデータ型
export type UserPostDetail = {
  id: number;
  postUserId: string;
  content: string;
  goodAmount: number;
  commentAmount: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  user: PostUserData,
  comment: UserPostComment[],
  liked: boolean,
}

// ユーザー投稿詳細ページのコメント関連のデータ型
export type UserPostComment = {
  id: number,
  text: string,
  user: PostUserData,
  createdAt: Date,
}

// ユーザー投稿更新時のデータ型
export type UpdateUserPost = {
  postId: number,
  content: string,
  categories: Category[],
}