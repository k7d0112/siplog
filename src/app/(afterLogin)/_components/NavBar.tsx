'use client'

import Link from "next/link";
import { FaIdCard, FaListUl, FaQuestionCircle, FaPlus } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { GetIconClass, GetStringClass } from "@/app/utils/GetIconClass";
import { useEffect, useState } from "react";
import { CreateModal } from "./CreateModal";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";
import { useScrollDirection } from "@/app/_hooks/useScrollDirection";
// import { useScroll } from "motion/react";
import { supabase } from '@/app/_libs/supabase'
import { useRouter } from 'next/navigation'

// アプリ内のページ下部に固定表示するナビバーコンポーネント
export const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // モーダル表示を管理
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const { session } = useSupabaseSession();
  // userIdはsupabaseAuthから取得
  const userId = session?.user.id;
  // カテゴリー取得
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.status || 'APIエラー');
        }
        const { categories } = await res.json();
        setAllCategories(categories);
  console.log(allCategories)
      } catch (error) {
        console.error('カテゴリー取得中にエラーが発生しました:', error);
      }
    }
    fetcher();
  }, []);

  // プラスボタンでモーダルを開く
  const handleModalOpen = () => {
    setIsModalOpen(true);
  }
  // モーダル側でもキャンセルと投稿完了時にonClose()を呼ぶことでモーダルが閉じる
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  // スクロール方向によるNavBarの表示・非表示の切り替え
  const scrollDirection = useScrollDirection();
  const navBarClass = scrollDirection === 'down'
    ? 'translate-y-full opacity-0'
    : 'translate-y-0 opacity-100';

  // ログアウト
  const handleLogout = async () => {
    if(!window.confirm('ログアウトしますが、よろしいですか？')) {
      return null;
    }

    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (!userId) return null;

  return(
    <nav className={`fixed bottom-0 left-0 bg-white w-full border-t border-lineGray transition-all duration-300 ease-in-out ${navBarClass}`}>
      <ul className='flex items-center justify-between px-5 py-3'>
        <li className='w-16'>
          <Link
            href='/users'
            className='flex items-center flex-col'
          >
            <FaIdCard
              className={GetIconClass(pathname, ['/users'])}
              size={28}
            />
            <span className={GetStringClass(pathname, ['/users'])}>マイページ</span>
          </Link>
        </li>
        <li className='w-16'>
          <Link
            href='/posts'
            className='flex flex-col items-center'
          >
            {/* 投稿詳細ページでもnavbarのアイコンの色を変更する */}
            <FaListUl
              className={GetIconClass(pathname, ['/posts', ])}
              size={28}
            />
            <span className={GetStringClass(pathname, ['/posts'])}>投稿一覧</span>
          </Link>
        </li>
        {/* 投稿&レポート作成用ボタン */}
        <li className='w-16 flex justify-center items-center'>
          <button
            type='button'
            className='w-7 flex flex-col items-center'
            onClick={handleModalOpen}
          >
            <FaPlus size={28} />
            <span className='text-mainBlack text-[10px] font-noto font-normal block w-16'>新規作成</span>
          </button>
        </li>
        {/* <li className='w-7'>
          <Link
            href='/messages'
            className='w-7'
          >
            <FaMessage className={GetIconClass(pathname, ['/messages'])} />
          </Link>
        </li> */}
        <li className='w-16'>
          <Link
            href='/questions'
            className='flex flex-col items-center'
          >
            <FaQuestionCircle className={GetIconClass(pathname, ['/questions'])} />
            <span className={GetStringClass(pathname, ['/questions'])}>Q&A</span>
          </Link>
        </li>
        <li className='w-16'>
          <button
            className='flex flex-col items-center'
            onClick={handleLogout}
          >
            <IoLogOutOutline className='fill-mainBlack w-7 h-7' />
            <span className='text-mainBlack text-[10px] font-noto font-normal'>ログアウト</span>
          </button>
        </li>
      </ul>
      {/* 投稿作成&レポート作成用モーダル */}
      <CreateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userId={userId}
        allCategories={allCategories}
      />
    </nav>
  );
}