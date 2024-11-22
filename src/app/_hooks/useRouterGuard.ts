// アクセス制限用のカスタムhook(認可)
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useRouterGuard = () => {
  const router = useRouter();
  const { session } = useSupabaseSession();

  useEffect(() => {
    // sessionがundefinedの場合、読み込み中なので何もしない
    if (session === undefined) return;

    const fetcher = async () => {
      if (session === null) {
        router.replace('/login');
      }
    }

    fetcher();
  }, [router, session]);
}