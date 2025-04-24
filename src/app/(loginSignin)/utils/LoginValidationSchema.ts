import { z } from 'zod';

export const LoginValidationSchema = z.object({
  email: z
    .string()
    .nonempty('メールアドレスは必須です')
    .email('正しいメールアドレスを入力してください'),
  password: z
    .string()
    .nonempty('パスワードは必須です')
    .min(6, '6文字以上で入力してください'),
});