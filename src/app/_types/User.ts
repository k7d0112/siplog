import { postCategory } from "./Category"
import { Comments } from "./Comments"
import { Goods } from "./Goods"

// userテーブルのデータ型
export type User = {
  id: number,
  userId: string,
  userName: string | null,
  email: string,
  content: string | null,
  thumbnailImageKey: string | null,
  createdAt: string,
  updateAt: string,
  userGoods: { goods: Goods }[],
  userComments: { comments: Comments }[],
}

// サインアップ時にsupabaseのauth.userの情報をUserテーブルにも保存する際のuserIdとemailのデータ型
export type CreateUserRecord = {
  userId: string,
  email: string,
  userName: string,
}

// ユーザーマイページでユーザー情報を更新する際のデータ型
export type UpdateUserinfo = {
  userName?: string,
  content?: string,
  thumbnailImageKey?: string,
}

// ユーザーマイページで表示するユーザー名の型
export type UserNameProps = {
  userName: string | null,
}

// ユーザーマイページでアイコン表示時の型
export type UserIconProps = {
  thumbnailImageKey: string | null,
}

// ユーザーマイページでユーザーの投稿一覧取得用の型
// export type UserPost = {
//   content: string;
//   id: number;
//   postUserId: string;
//   goodAmount: number;
//   commentAmount: number;
//   createdAt: Date;
//   updatedAt: Date;
//   postCategories: postCategory[],
// }

// ユーザーページでユーザーの投稿懇親用の型
export type UpdateUserPost = {
  content?: string,
  postCategories? : postCategory[],
}

// 投稿一覧取得時に投稿に紐づけて取得するユーザーデータの型
export type PostUserData = {
  userId: string;
  userName: string | null;
  thumbnailImageKey: string | null;
}