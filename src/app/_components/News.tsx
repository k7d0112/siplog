'use client'

import { FaClock, FaClockRotateLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FrontPost } from "../_types/Post";
import { Modal } from '@/app/_components/Modal'
import { formatDate } from "../_libs/day";

export const News = () => {
  // microCMSから取得した記事データを保存
  const [posts, setPosts] = useState<FrontPost[]>();
  // モーダルの表示/非表示を管理
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // クリックされた記事データを保存
  const [selectPost, setSelectPost] = useState<FrontPost | null>(null);

  // microCMSから記事データを取得
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('https://n9f9t14lom.microcms.io/api/v1/news', {
        headers: {
          'X-MICROCMS-API-KEY': 'jZh56ptt8eaRWXeZ3snRxNgy71JOINYGldwT',
        },
      });
      const { contents } = await res.json();
      setPosts(contents);
    }

    fetcher();
  }, []);

  // モーダルを非表示にさせる関数
  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
      setSelectPost(null);
    }, 400);
  }

  // モーダルを表示させる関数
  const handleOpen = (post: FrontPost) => {
    setIsOpen(true);
    setSelectPost(post);
  }

  return(
    <section className='mt-10'>
      <div className='mx-auto px-5'>
        <h2 className='sectionTitle'>ニュース</h2>
        <ul className='mt-6 mx-auto rounded shadow-md p-4 border border-mainBgGray'>
          {posts?.map((post, index) => (
            <li
              key={index}
              className='border-b border-mainBgGray pb-2 mb-3'
              onClick={() => handleOpen(post)}
            >
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <FaClock className='w-3 fill-mainBlue align-middle'/>
                  <span className='text-mainBlack font-noto text-sm pl-1'>{formatDate(post.createdAt)}</span>
                </div>
                <div className='flex items-center ml-2'>
                  <FaClockRotateLeft className='w-3 fill-mainBlue align-middle'/>
                  <span className='text-mainBlack font-noto text-sm pl-1'>{formatDate(post.updatedAt)}</span>
                </div>
              </div>
              <h3 className='mt-2 font-noto font-bold text-mainBlack text-lg '>{post.title}</h3>
              <ul className='flex items-center mt-1 flex-wrap'>
                {post.categories.map((postCategory, index) => (
                  <li
                    key={index}
                    className='mr-2 font-noto font-medium text-white text-xs py-1 px-2 bg-mainBlue rounded'
                  >
                    {postCategory.name}
                  </li>
                ))}
              </ul>
            </li>
          )) || <p className='font-noto text-medium text-mainBlack text-xl'>投稿されているニュースはありません</p>}
        </ul>
      </div>

      {isOpen && selectPost && (
        <Modal isOpen={isOpen} handleClose={handleClose} post={selectPost} />
      )}
    </section>
  );
}