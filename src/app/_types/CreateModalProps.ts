import { Category } from "./Category"

// ナビバーのプラスボタンを押して開く投稿とカテゴリーを作成するモーダルに渡すpropsの型
export type CreateModalProps = {
  // モーダルが表示中かどうか
  isOpen: boolean,
  // モーダルを閉じるコールバック
  onClose: () => void,
  // supabase.autnのログインユーザーの情報
  // token: string,
  // 投稿作成ユーザーのユーザーID
  userId: string,
  allCategories: Category[];
}