export type GoodAmountProps = {
  type: 'heart' | 'comment' | 'posts' | 'report';
  status: boolean;
  amount: number;
  postId: number;
}