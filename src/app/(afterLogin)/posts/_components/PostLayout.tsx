'use client'

import Link from "next/link";
import { AmountButton } from "../../_components/AmountButton";
import { CategoryTag } from "../../_components/CategoryTag";
import { CreatedTime } from "../../_components/CreatedTime";
import { TextArea } from "./TextArea";
import { UserIcon } from "../../_components/UserIcon";
import { UserName } from "../../_components/UserName";
import { useEffect, useState } from "react";
import { UserPost } from "@/app/_types/Post";
import { supabase } from "@/app/_libs/supabase";
// import { PostgrestPayload } from '@supabase/supabase-js';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export const PostLayout = () => {
  // 投稿一覧取得用のstate
  const [allPosts, setAllPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { session, token, isLoading } = useSupabaseSession();

  // 初回表示時に既存データを取得
  useEffect(() => {
    const fetcher = async () => {
      if (isLoading) return;
      if (!session) {
        setError('ログインが必要です');
        setLoading(false);
        return;
      }

      try{
        const res = await fetch('/api/posts', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            // 'Content-Type': 'application/json',
            // Authorization: token,
          }
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.status || 'APIエラー');
        }
        const { posts } = await res.json();
        setAllPosts(posts);
      } catch (error: any) {
        console.error('投稿一覧取得中にエラーが発生しました:', error);
        setError('投稿一覧の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    }
    fetcher();
    // Supabaseのリアルタイム購読を設定
    const postChannel = supabase.channel('realtime-posts')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'Post' },
      async (payload) => {
        console.log('Post table changed!', payload);
        await fetcher();
      }
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'Goods' },
      async (payload) => {
        console.log('INSERT into Goods', payload.new);
        await fetcher();
      }
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'Comments'},
      async (payload) => {
        console.log('INSERT into Comments', payload.new);
        await fetcher();
      }
    )
    // .on(
    //   'postgres_changes',
    //   { event: 'DELETE', schema: 'public', table: 'Goods' },
    //   async (payload) => {
    //     console.log('DELETE into Goods', payload.old);
    //     await fetcher();
    //   }
    // )
    .subscribe()

    return () => {
      postChannel.unsubscribe();
    }
  }, [session, isLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return(
    <div>
      {allPosts.map((post) => {
        const isOwnPost =(post.postUserId === session?.user.id);
        return(
          <div
            key={post.id}
            className='border-b border-lineGray p-5 bg-white'
          >
            {/* <div> */}
              <Link href={`/posts/${post.id}`}>
                <div className='flex items-center gap-x-3.5'>
                  <UserIcon thumbnailImageKey={post.user.thumbnailImageKey}/>
                  <UserName userName={post.user.userName}/>
                  <CreatedTime className='ml-auto' createdAt={post.createdAt} />
                </div>
                <TextArea className='mt-2.5' content={post.content} />
                <ul className='mt-2.5 flex flex-wrap gap-2'>
                  {post.categories.map((category) => (
                    <li key={category.id}>
                      <CategoryTag categoryName={category.name}/>
                    </li>
                  ))}
                </ul>
              </Link>
              <ul className='mt-2.5 flex gap-2'>
                <li>
                  <AmountButton
                    type='heart'
                    status={post.liked}
                    amount={post.goodAmount}
                    postId={post.id}
                    token={token}
                    isOwnPost={isOwnPost}
                  />
                </li>
                <li>
                  <AmountButton
                    type='comment'
                    status={post.commentAmount > 0 ? true : false}
                    amount={post.commentAmount}
                    postId={post.id}
                    token={token}
                  />
                </li>
              </ul>
            {/* </div> */}
          </div>
        );
      })}
    </div>
  );
}