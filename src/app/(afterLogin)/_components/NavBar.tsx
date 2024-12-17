'use client'

import Link from "next/link";
import { FaIdCard, FaListUl, FaQuestionCircle  } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { GetIconClass } from "@/app/utils/GetIconClass";


// アプリ内のページ下部に固定表示するナビバーコンポーネント
export const NavBar = () => {
  const pathname = usePathname();

  return(
    <nav className='fixed bottom-0 left-0 bg-white w-full'>
      <ul className='flex items-center justify-between px-5 py-3'>
        <li className='w-8'>
          <Link
            href='/users'
            className='w-8'
          >
            <FaIdCard className={GetIconClass(pathname, ['/users'])} />
          </Link>
        </li>
        <li className='w-8'>
          <Link
            href='/posts'
            className='w-8'
          >
            {/* 投稿詳細ページでもnavbarのアイコンの色を変更する */}
            <FaListUl className={GetIconClass(pathname, ['/posts', ])} />
          </Link>
        </li>
        <li className='w-8'>
          <Link
            href='/messages'
            className='w-8'
          >
            <FaMessage className={GetIconClass(pathname, ['/messages'])} />
          </Link>
        </li>
        <li className='w-8'>
          <Link
            href='/questions'
            className='w-8'
          >
            <FaQuestionCircle className={GetIconClass(pathname, ['/questions'])} />
          </Link>
        </li>
        {/* <li>
          <Link href=''>
            <IoLogOutOutline />
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}