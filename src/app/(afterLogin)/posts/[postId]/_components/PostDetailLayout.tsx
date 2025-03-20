'use client'

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { UserIcon } from "../../../_components/UserIcon";
import { CreatedTime } from "../../../_components/CreatedTime";
import { DetailUserName } from "./DetailUserName";
import { DetailTextArea } from "./DetailTextArea";
import { CategoryTag } from "../../../_components/CategoryTag";
import { AmountButton } from "../../../_components/AmountButton";
// import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { UserPostDetailProps } from "@/app/_types/Post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { GetComment } from "@/app/_types/Comments";
import { supabase } from "@/app/_libs/supabase";

export const PostDetailLayout: React.FC<UserPostDetailProps> = ({ post }) => {
  const { session, token, isLoading } = useSupabaseSession();
  const [comments, setComments] = useState<GetComment[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // ページ読み込み時にコメントを取得
  const fetchComments = async () => {
    if (!token) return;
    try {
      const res = await fetch(`/api/comments/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'コメントの取得に失敗しました。');
      }
      const { comments } = await res.json();
      setComments(comments);
    } catch (error) {
      console.error('コメントの取得中にエラーが発生しました', error);
    }
  }

  // コメントのリアルタイム取得
  useEffect(() => {
    if (!token) return;
    fetchComments();

    const commentChannel = supabase
      .channel('realtime-comments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Comments' },
        async (payload) => {
          await fetchComments();
          // const newRecord = payload.new as Comments;
          // if (newRecord.postId === post.id) {
          // }
        }
      )
      .subscribe();

    return () => {
      commentChannel.unsubscribe();
    };
  }, [post.id, token]);

  // コメント送信
  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (!session) {
      alert('ログインが必要です');
      return;
    }
    try {
      const body = {
        text: inputText,
        postId: post.id,
        userId: session.user.id,
      };
      const res = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'コメントの作成に失敗しました');
      }
      setInputText('');
    } catch (error) {
      console.error(error);
    }
  }

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
        <div className='mt-[15px]'>
          <AmountButton
            type='heart'
            status={false}
            amount={post.goodAmount}
            postId={post.id}
            token={token}
          />
        </div>
      </div>
      {/* コメント送信者のコメント */}
      <ul className="pb-3 border-b border-lineGray">
        {comments.map((comment) => (
          // <div className='mt-5 relative before:content-[""] before:w-[1px] before:h-[50px] before:bg-lineGray before:absolute before:left-5 before:top-[-50px]'>
          <div
            key={comment.id}
            className='mt-3 pt-3 border-t border-lineGray'
          >
            <div className='flex gap-x-2 items-center justify-between'>
              <div className='flex gap-x-2 items-center'>
                <UserIcon thumbnailImageKey={comment.user.thumbnailImageKey}/>
                <DetailUserName userName={comment.user.userName}/>
              </div>
              <CreatedTime className='text-right' createdAt={new Date(comment.createdAt)}/>
            </div>
            <DetailTextArea className='mt-2.5' content={comment.text}/>
          </div>
        ))}
      </ul>

      {/* コメント送信フォーム */}
      <form onSubmit={handleSubmitComment} className='fixed bottom-[74px] left-0 px-3 w-full flex items-center gap-x-3'>
        <textarea
          className='w-full border rounded px-2 py-2 resize-none text-sm'
          rows={1}
          placeholder="コメントを入力"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type='submit'
          className='px-2 py-2.5 bg-mainBlue text-white rounded text-xs w-[80px]'
        >
          コメント
        </button>
      </form>
    </div>
  );
}