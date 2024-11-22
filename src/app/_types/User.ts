import { Comments } from "./Comments"
import { Goods } from "./Goods"

// userテーブルのデータ型
export type User = {
  id: number,
  userId: string,
  name: string,
  email: string,
  content: string,
  thumbnailURL: string,
  createdAt: string,
  updateAt: string,
  userGoods: { goods: Goods }[],
  userComments: { comments: Comments }[],
}

// サインアップ時にsupabaseのauth.userの情報をUserテーブルにも保存する際のuserIdとemailのデータ型
export type CreateUserRecord = {
  userId: string,
  email: string,
}