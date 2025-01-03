import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  return(
    <>
      <div className="p-5">
        {/* ユーザー一覧画面に戻るボタン */}
        <Link
          href='/messages'
          className='hover:cursor-pointer'
        >
          <FaArrowLeft size={20} className='fill-mainBlack'/>
        </Link>
      </div>
      {/* チャットエリア */}
      <div>
        {/* 相手側 */}
        <div></div>
        {/* 自分側 */}
        <div></div>
      </div>
    </>
  );
}