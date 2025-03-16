'use client'

import { useState } from "react";
import { FaHeart, FaRegHeart, FaCommentDots, FaRegCommentDots } from "react-icons/fa";
import { GoodAmountProps } from "../posts/types/GoodAmount";
import { MdPostAdd } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export const AmountButton: React.FC<GoodAmountProps> = ({ type, status, amount, postId, token, isOwnPost }) => {
  const [count, setCount] = useState<number>(amount);
  const [liked, setLiked] = useState<boolean>(status);
  const [comment, setComment] = useState<boolean>(status);
  const [loading, setLoading] = useState<boolean>(false);
  // const { token } = useSupabaseSession();

  const handleHeartClick = async () => {
    if (isOwnPost) {
      alert('自分の投稿にいいねは押せません');
      return;
    }

    if (loading) return;

    setLoading(true);


    try {
      // let res;
      // if (!liked) {
      //   res = await fetch(`/api/posts/${postId}/like`, {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //     },
      //   });
      // } else {
      //   res = await fetch(`/api/posts/${postId}/like`, {
      //     method: 'DELETE',
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //     },
      //   });
      // }
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        let errorData: any;
        try {
          errorData = await res.json();
        } catch (err) {
          errorData = {};
        }
        const message = errorData.message || '操作に失敗しました';
        throw new Error(message);
      }

      const { goodAmount } = await res.json();
      setCount(goodAmount);
      setLiked(!liked);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <button
  //     onClick={type === 'heart' ? handleHeartClick : undefined}
  //     disabled={type === 'heart' ? liked || loading : false}
  //     className={`flex items-center gap-1 ${type === 'heart' ? (liked ? 'text-red-500' : 'text-gray-500') : 'text-blue-500'} focus:outline-none`}
  //     aria-label={type === 'heart' ? '高評価する' : 'コメントする'}
  //   >
  //     {type === 'heart' ? (liked ? <FaHeart/> : <FaRegHeart/>) : <FaCommentDots/>}
  //     <span>{count}</span>
  //   </button>
  // );

  if ( type === 'heart') {
    return(
      <div className='flex items-center gap-1'>
        <button
          onClick={handleHeartClick}
          disabled={isOwnPost || liked || loading}
          className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500'} focus:outline-none`}
          aria-label='いいね'
        >
          {liked ? <FaHeart size={15}/> : <FaRegHeart size={15}/>}
        </button>
        <span className='font-jost font-medium text-sm text-mainBlack'>{count}</span>
      </div>
    );
  } else if ( type === 'comment') {
    return(
      <div className='flex items-center gap-1'>
        <span>
          {comment ? <FaCommentDots size={15} className='fill-mainBlue'/> : <FaRegCommentDots size={15} className='fill-mainBlack'/>}
        </span>
        {/* <button
        >
          {clickedStatus ? <FaCommentDots size={15} className='fill-mainBlue'/> : <FaRegCommentDots size={15} className='fill-mainBlack'/>}
        </button> */}
        <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
      </div>
    );
  } else if ( type === 'posts') {
    return(
      <div className='flex gap-2 items-baseline'>
        <div className='flex flex-col items-center gap-1'>
          <MdPostAdd size={20} className='fill-mainBlue' />
          <span className='text-[10px] font-noto font-normal text-mainBlack'>投稿数</span>
        </div>
        <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
      </div>
    );
  } else if ( type === 'report') {
    return(
      <div className='flex gap-2 items-baseline'>
        <div className='flex flex-col items-center gap-1'>
          <BiSolidReport size={20} className='fill-mainBlue' />
          <span className='text-[10px] font-noto font-normal text-mainBlack'>レポート数</span>
        </div>
        <span className='font-jost font-medium text-sm text-mainBlack'>{amount}</span>
      </div>
    );
  }

};