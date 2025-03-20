import { UserPost } from "@/app/_types/Post"

// ユーザーマイページのユーザー情報取得時の型
export type GetUserInfo = {
  userId: string,
  userName: string,
  content?: string,
  thumbnailImageKey: string,
  postCount: number,
}

// ユーザーマイページでユーザー情報更新時のモーダルで使用する型
export type UserEditModalProps = {
  isOpen: boolean,
  onClose: () => void,
  token: string | null,
  user: GetUserInfo | null,
  onUpdateUser: (updatedUser: GetUserInfo) => void,
}

// ユーザーマイページでユーザー情報更新時のモーダルで使用する型
export type UserPostEditModalProps = {
  isOpen: boolean,
  onClose: () => void,
  token: string | null,
  userPost: UserPost | null,
  onUpdateUserPost: (updateUserPost: UserPost) => void,
}