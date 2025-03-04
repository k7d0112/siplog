'use client'

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { UserIcon } from "../../../_components/UserIcon";
import { CreatedTime } from "../../../_components/CreatedTime";
import { DetailUserName } from "./DetailUserName";
import { DetailTextArea } from "./DetailTextArea";
import { CategoryTag } from "../../../_components/CategoryTag";
import { AmountButton } from "../../../_components/AmountButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserPost, UserPostDetailProps } from "@/app/_types/Post";
// import { useSession } from 'next-auth/react';

export const PostDetailLayout: React.FC<UserPostDetailProps> = ({ post }) => {
  // const { data: session } = useSession();

  return(
    <div
      className='px-5 pt-5'
    >
      <div
        className='flex items-center justify-between'
        key={post.id}
      >
        {/* 投稿一覧に戻るボタン */}
        <Link
          href='/posts'
          className='hover:cursor-pointer'
        >
          <FaArrowLeft size={20} className='fill-mainBlack'/>
        </Link>
        <CreatedTime className='' createdAt={post.createdAt} />
      </div>
      {/* 投稿者の投稿 */}
      <div className='mt-2.5'>
        <div className='flex gap-x-2 items-start'>
          <UserIcon thumbnailImageKey={post.user.thumbnailImageKey}/>
          <DetailUserName userName={post.user.userName} />
        </div>
        <DetailTextArea className='mt-2.5' content={post.content} />
        <ul className='mt-2.5 flex flex-wrap gap-2'>
          {post.categories.map((category) => (
            <li key={category.id}>
              <CategoryTag categoryName={category.name}/>
            </li>
          ))}
        </ul>
        <div className='mt-[15px] ml-10'>
          <AmountButton
            type='heart'
            status={false}
            amount={post.goodAmount}
            postId={post.id}
          />
        </div>
      </div>
      {/* コメント送信者のコメント */}
      {/* <div className='mt-5 relative before:content-[""] before:w-[1px] before:h-[50px] before:bg-lineGray before:absolute before:left-5 before:top-[-50px]'>
        <div className='flex gap-x-2 items-center justify-between'>
          <div className='flex gap-x-2 items-center'>
            <UserIcon/>
            <DetailUserName/>
          </div>
          <CreatedTime className='text-right'/>
        </div>
        <DetailTextArea className='mt-2.5'/>
      </div> */}
    </div>
  );
}