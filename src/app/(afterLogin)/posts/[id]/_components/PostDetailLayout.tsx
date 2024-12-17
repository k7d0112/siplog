import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { UserIcon } from "../../../_components/UserIcon";
import { CreatedTime } from "../../../_components/CreatedTime";
import { DetailUserName } from "./DetailUserName";
import { DetailTextArea } from "./DetailTextArea";
import { CategoryTag } from "../../../_components/CategoryTag";
import { AmountButton } from "../../../_components/AmountButton";

export const PostDetailLayout = () => {
  return(
    <div className='px-5 pt-5'>
      <div className='flex items-center justify-between'>
        {/* 投稿一覧に戻るボタン */}
        <Link
          href='/posts'
          className='hover:cursor-pointer'
        >
          <FaArrowLeft size={20} className='fill-mainBlack'/>
        </Link>
        <CreatedTime className=''/>
      </div>
      {/* 投稿者の投稿 */}
      <div className='mt-2.5'>
        <div className='flex gap-x-2 items-start'>
          <UserIcon/>
          <DetailUserName/>
        </div>
        <DetailTextArea className='mt-2.5'/>
        <ul className='mt-2.5 flex flex-wrap gap-2'>
          <li>
            <CategoryTag/>
          </li>
        </ul>
        <div className='mt-[15px] ml-10'>
          <AmountButton type='heart' status={false}/>
        </div>
      </div>
      {/* コメント送信者のコメント */}
      <div className='mt-5 relative before:content-[""] before:w-[1px] before:h-[50px] before:bg-lineGray before:absolute before:left-5 before:top-[-50px]'>
        <div className='flex gap-x-2 items-center justify-between'>
          <div className='flex gap-x-2 items-center'>
            <UserIcon/>
            <DetailUserName/>
          </div>
          <CreatedTime className='text-right'/>
        </div>
        <DetailTextArea className='mt-2.5'/>
      </div>
    </div>
  );
}