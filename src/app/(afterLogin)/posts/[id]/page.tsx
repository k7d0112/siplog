'use client'

import { useParams } from "next/navigation";
import { PostDetailLayout } from "./_components/PostDetailLayout";
import { useEffect, useState } from "react";
import { UserPostDetail } from "@/app/_types/Post";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const [post, setPost] = useState<UserPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetcher = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
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
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>記事が見つかりませんでした</div>;
  }

  return(
    <PostDetailLayout post={post}/>
  );
}