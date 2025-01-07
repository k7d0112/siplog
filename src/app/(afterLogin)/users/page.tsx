'use client'

import { UsersLayout } from "./_components/UsersLayout";
import { useRouterGuard } from "@/app/_hooks/useRouterGuard";

export default function Page() {
  // カスタムフックを使用してログインしていないユーザーがユーザーマイページにアクセスした際にログインページに遷移させる
  useRouterGuard();

  return(
    <UsersLayout />
  );
}