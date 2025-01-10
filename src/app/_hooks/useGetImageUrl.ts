'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../_libs/supabase'

// UserテーブルのthumbnailImageKeyを受け取りpublicUrlを返すカスタムフック(アイコン画像取得用のカスタムフック)
export const useGetImageUrl = (
  thumbnailImageKey: string | null,
  bucketName = 'userIcon_thumbnailUrl',
  defaultImage = '/images/man.png'
) => {
  // publicUrlを保存するステート
  const [imageUrl, setImageUrl] = useState(defaultImage);

  useEffect(() => {
    // thumbnailImageKeyがnullの場合はデフォルト画像を格納
    if (!thumbnailImageKey) {
      setImageUrl(defaultImage);
      return;
    }

    // supabaseのpublicUrlを取得
    const { data: {publicUrl} } = supabase.storage
      .from(bucketName)
      .getPublicUrl(thumbnailImageKey);

    // publicUrlが取得できない場合もデフォルト画像を格納
    setImageUrl(publicUrl || defaultImage);
  }, [thumbnailImageKey]);

  return {
    imageUrl,
  };
};