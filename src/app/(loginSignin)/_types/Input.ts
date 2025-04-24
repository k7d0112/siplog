import { InputHTMLAttributes } from "react";

// ログイン&サインインフォームのinputタグのpropsの型定義
export type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;