// コメントのデータ型
export type Comments = {
  id: number,
  text: string,
  userId: string,
  postId: number,
  createdAt: string,
  updatedAt: string,
}

// コメント作成時のデータ型
export type CreateCommentRequestBody = {
  text: string,
  postId: number,
  userId: string,
}

// コメント取得時のデータ型
export type GetComment = {
  id: number,
  text: string,
  userId: string,
  postId: number,
  createdAt: string,
  updatedAt: string,
  user: {
    thumbnailImageKey: string | null;
    id: number;
    userName: string | null;
    userId: string;
  },
}