export type Comments = {
  id: number,
  text: string,
  userId: string,
  postId: string,
  createdAt: string,
  updatedAt: string,
}

export type CreateCommentRequestBody = {
  text: string,
  postId: string,
  userId: string,
}