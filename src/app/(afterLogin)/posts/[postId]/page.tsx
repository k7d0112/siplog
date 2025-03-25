'use client'

import { useParams } from "next/navigation";
import { PostDetailLayout } from "./_components/PostDetailLayout";
import { useEffect, useState } from "react";
import { UserPostDetail } from "@/app/_types/Post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Page() {
  const params = useParams();
  const { postId } = params;
  const [post, setPost] = useState<UserPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, isLoading } = useSupabaseSession();

  useEffect(() => {
    if(isLoading) return;

    if (!postId || !token) {
      setLoading(false);
      return;
    };

    const fetcher = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.status || 'APIエラー');
        }
        const { post } = await res.json();
        setPost(post);
      } catch (error) {
        console.error('投稿詳細取得中にエラーが発生しました', error);
      } finally {
        setLoading(false);
      }
    }
    fetcher();
  }, [postId, token, isLoading]);

  if (loading) {
    return (
      <div className='px-5 pt-5'>
        <div className='flex items-center justify-between'>
          <Skeleton circle width={36} height={36} />
          <Skeleton width={60} height={20} />
        </div>
        <div className='mt-2.5'>
          <Skeleton circle width={36} height={36} />
          <Skeleton width={100} height={20} />
        </div>
        <div className='mt-2.5'>
          <Skeleton height={80} />
        </div>
        <div className='mt-2.5 flex gap-2'>
          <Skeleton width={70} height={24} />
          <Skeleton width={70} height={24} />
        </div>
        <div className='mt-2.5'>
          <Skeleton width={35} height={24} />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div>記事が見つかりませんでした</div>;
  }

  return(
    <PostDetailLayout post={post}/>
  );
}