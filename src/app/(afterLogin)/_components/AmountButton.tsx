'use client'

import { useState } from "react";
import { FaHeart, FaRegHeart, FaCommentDots, FaRegCommentDots } from "react-icons/fa";
import { GoodAmountProps } from "../posts/types/GoodAmount";
import { MdPostAdd } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

export const AmountButton: React.FC<GoodAmountProps> = ({ type, status }) => {
  const [clickedStatus, setClickedStatus] = useState<boolean>(status);
  if ( type === 'heart') {
    return(
      <div className='flex items-center gap-1'>
        <button
          onClick={() => setClickedStatus(!clickedStatus)}
        >
          {clickedStatus ? <FaHeart size={15} className='fill-[#ff3333]'/> : <FaRegHeart size={15} className='fill-mainBlack'/>}
        </button>
        <span className='font-jost font-medium text-sm text-mainBlack'>20</span>
      </div>
    );
  } else if ( type === 'comment') {
    return(
      <div className='flex items-center gap-1'>
        <button
          onClick={() => setClickedStatus(!clickedStatus)}
        >
          {clickedStatus ? <FaCommentDots size={15} className='fill-mainBlue'/> : <FaRegCommentDots size={15} className='fill-mainBlack'/>}
        </button>
        <span className='font-jost font-medium text-sm text-mainBlack'>20</span>
      </div>
    );
  } else if ( type === 'posts') {
    return(
      <div className='flex gap-2 items-baseline'>
        <div className='flex flex-col items-center gap-1'>
          <MdPostAdd size={20} className='fill-mainBlue' />
          <span className='text-[10px] font-noto font-normal text-mainBlack'>投稿数</span>
        </div>
        <span className='font-jost font-medium text-sm text-mainBlack'>20</span>
      </div>
    );
  } else if ( type === 'report') {
    return(
      <div className='flex gap-2 items-baseline'>
        <div className='flex flex-col items-center gap-1'>
          <BiSolidReport size={20} className='fill-mainBlue' />
          <span className='text-[10px] font-noto font-normal text-mainBlack'>レポート数</span>
        </div>
        <span className='font-jost font-medium text-sm text-mainBlack'>20</span>
      </div>
    );
  }
}