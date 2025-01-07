// コメントのデータ型
export type Comments = {
  id: number,
  text: string,
  userId: string,
  postId: string,
  createdAt: string,
  updatedAt: string,
}

// コメント作成時のデータ型
export type CreateCommentRequestBody = {
  text: string,
  postId: string,
  userId: string,
}