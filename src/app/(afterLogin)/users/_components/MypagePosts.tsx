'use client'

import { CreatedTime } from "../../_components/CreatedTime";
import { FaPen } from "react-icons/fa";
import { MypageTextArea } from "./MypageTextArea";
import { CategoryTag } from "../../_components/CategoryTag";
import { AmountButton } from "../../_components/AmountButton";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect, useState } from "react";
import { UserPost } from "@/app/_types/Post";
import { UserPostEditModal } from "./UserPostEditModal";

export const MypagePosts = () => {
  // 取得したユーザーの投稿一覧を格納するstate
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 編集対象の投稿を保持
  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);
  // supabase.authからログイン済ユーザーのuserIdを取得
  const { session, token } = useSupabaseSession();
  // const userId = session?.user.id;

  // ユーザー投稿一覧取得
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch('/api/posts?myPage=true', {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: token,
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.status || 'APIエラー');
        }
        const { posts } = await res.json();
        // console.log(posts);
        setUserPosts(posts);
      } catch (error) {
        console.error('ユーザー投稿一覧取得中にエラーが発生しました:', error);
      }
    }
    fetcher();
  }, [token]);

  // モーダルを開く&投稿の編集開始
  const handleModalOpen = (post: UserPost) => {
    setIsModalOpen(true);
    setSelectedPost(post);
  };

  // モーダルを非表示にする
  const handleModalClose = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedPost(null);
    }, 400);
  };

  // モーダルで更新した最新の投稿情報を取得して更新
  const handleUpdateUserPost = (updateUserPost: UserPost) => {
    setUserPosts((prevPosts) => prevPosts.map((prevPost) => prevPost.id === updateUserPost.id ? updateUserPost : prevPost));
  }

  return(
    <>
      <div className='bg-mainBgGray'>
        {userPosts.length > 0 ? (
          userPosts.map((userPost) => {
            const isOwnPost = (userPost.postUserId === session?.user.id);
            return (
              <div
                key={userPost.id}
                className='border-b border-lineGray py-4'
              >
                <div className='flex items-center justify-between'>
                  <CreatedTime className='' createdAt={userPost.createdAt} />
                  {/* 投稿編集用のペンマークボタン */}
                  <FaPen
                    onClick={() => handleModalOpen(userPost)}
                    className='fill-mainBlue'
                  />
                </div>
                <div className='mt-2.5'>
                  <MypageTextArea content={userPost.content} />
                </div>
                <ul className='mt-2.5 flex flex-wrap gap-2'>
                  {userPost.categories.map((category) => (
                    <li key={category.id}>
                      <CategoryTag categoryName={category.name}/>
                    </li>
                  ))}
                </ul>
                <ul className='mt-2.5 flex gap-2'>
                  <li>
                    <AmountButton
                      type='heart'
                      status={false}
                      amount={userPost.goodAmount}
                      postId={userPost.id}
                      isOwnPost={isOwnPost}
                      token={token}
                    />
                  </li>
                  <li>
                    <AmountButton
                      type='comment'
                      status={false}
                      amount={userPost.commentAmount}
                      postId={userPost.id}
                      token={token}
                    />
                  </li>
                </ul>
              </div>
            )
          })
        ) : (
          <p className='flex justify-center mt-20'>投稿はまだありません</p>
        )}

        {/* 投稿編集用モーダルを定義 */}
        {selectedPost && (
          <UserPostEditModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            token={token}
            userPost={selectedPost}
            onUpdateUserPost={handleUpdateUserPost}
          />
        )}
      </div>
    </>
  );
}