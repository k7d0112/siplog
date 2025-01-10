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
  userName: string,
}

// ユーザーマイページでアイコン表示時の型
export type UserIconProps = {
  thumbnailImageKey: string | null,
}