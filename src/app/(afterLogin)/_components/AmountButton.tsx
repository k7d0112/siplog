'use client'

import { use, useState } from "react";
import { FaHeart, FaRegHeart, FaCommentDots, FaRegCommentDots } from "react-icons/fa";
import { GoodAmountProps } from "../posts/types/GoodAmount";
import { MdPostAdd } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

export const AmountButton: React.FC<GoodAmountProps> = ({ type, status, amount, postId }) => {
  const [count, setCount] = useState<number>(amount);
  const [liked, setLiked] = useState<boolean>(status);
  const [loading, setLoading] = useState<boolean>(false);

  const handleHeartClick = async () => {
    if (liked || loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '高評価の更新に失敗しました。');
      }

      const { goodAmount } = await res.json();
      setCount(goodAmount);
      setLiked(true);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={type === 'heart' ? handleHeartClick : undefined}
      disabled={type === 'heart' ? liked || loading : false}
      className={`flex items-center gap-1 ${type === 'heart' ? (liked ? 'text-red-500' : 'text-gray-500') : 'text-blue-500'} focus:outline-none`}
      aria-label={type === 'heart' ? '高評価する' : 'コメントする'}
    >
      {type === 'heart' ? (liked ? <FaHeart/> : <FaRegHeart/>) : <FaCommentDots/>}
      <span>{count}</span>
    </button>
  );

  // if ( type === 'heart') {
  //   return(
  //     <div className='flex items-center gap-1'>
  //       <button
  //         onClick={() => setClickedStatus(!clickedStatus)}
  //       >
  //         {clickedStatus ? <FaHeart size={15} className='fill-[#ff3333]'/> : <FaRegHeart size={15} className='fill-mainBlack'/>}
  //       </button>
  //       <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
  //     </div>
  //   );
  // } else if ( type === 'comment') {
  //   return(
  //     <div className='flex items-center gap-1'>
  //       <button
  //         onClick={() => setClickedStatus(!clickedStatus)}
  //       >
  //         {clickedStatus ? <FaCommentDots size={15} className='fill-mainBlue'/> : <FaRegCommentDots size={15} className='fill-mainBlack'/>}
  //       </button>
  //       <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
  //     </div>
  //   );
  // } else if ( type === 'posts') {
  //   return(
  //     <div className='flex gap-2 items-baseline'>
  //       <div className='flex flex-col items-center gap-1'>
  //         <MdPostAdd size={20} className='fill-mainBlue' />
  //         <span className='text-[10px] font-noto font-normal text-mainBlack'>投稿数</span>
  //       </div>
  //       <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
  //     </div>
  //   );
  // } else if ( type === 'report') {
  //   return(
  //     <div className='flex gap-2 items-baseline'>
  //       <div className='flex flex-col items-center gap-1'>
  //         <BiSolidReport size={20} className='fill-mainBlue' />
  //         <span className='text-[10px] font-noto font-normal text-mainBlack'>レポート数</span>
  //       </div>
  //       <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
  //     </div>
  //   );
  // }
};