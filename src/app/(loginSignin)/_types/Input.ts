import React from "react"

// ログイン&サインインフォームのinputタグのpropsの型定義
export type InputProps = {
  label: string;
  type: 'email' | 'password' | 'text';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}