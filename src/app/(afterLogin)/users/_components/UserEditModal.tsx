'use client'

import react, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { supabase } from '@/app/_libs/supabase';
import { UserEditModalProps } from '../_types/User';
import { v4 as uuidv4 } from 'uuid'  // 固有IDを生成するライブラリ

export const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  token,
  user,
  onUpdateUser,
}) => {
  // フォーム入力用のステート
  const [editName, setEditName] = useState('');
  const [editContent, setEditContent] = useState('');
  // データベースに保存する「画像キー(パス)」
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(null);
  // モーダル内で即時プレビューするためのURL
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);

  // モーダルを開くたびに、現在のユーザー情報をフォームに反映
  useEffect(() => {
    if (user && isOpen) {
      setEditName(user.userName || '');
      setEditContent(user.content || '');
      setThumbnailImageKey(null);
      setThumbnailPreviewUrl(null);
    }
  }, [user, isOpen]);

  // 画像アップロード用のロジック
  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length === 0) {
      // 画像がないためreturn
      return
    }

    // 選択された画像ファイル
    const file = event.target.files[0];
    const filePath = `private/${uuidv4()}`;

    // supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('userIcon_thumbnailUrl')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    // アップロード失敗したらエラーを表示
    if (error) {
      alert(error.message);
      return;
    }

    // data.path: 'private/xxxx-uuid'のようなキー
    const uploadedKey = data?.path;
    if (!uploadedKey) {
      alert('画像キーを取得できませんでした。');
      return;
    }

    // DBに保存するようのキー
    setThumbnailImageKey(uploadedKey);
    console.log(thumbnailImageKey);

    // プレビュー用に公開URLを取得
    const { data: { publicUrl }} = supabase.storage
      .from('userIcon_thumbnailUrl')
      .getPublicUrl(uploadedKey);
    if (publicUrl) {
      setThumbnailPreviewUrl(publicUrl);
    }
  }

  // フォームをsubmitでPUTリクエストを送信
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // tokenがなければ変更不可
    if (!token) return;

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          userName: editName,
          content: editContent,
          // 新しいURLがあればそれを使用し、なければ既存のURLを維持
          thumbnailImageKey: thumbnailImageKey || user?.thumbnailImageKey || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.status || 'APIエラー');
      }

      const { updateUserInfo } = await res.json();
      // 親コンポーネントに更新結果を伝える
      onUpdateUser(updateUserInfo);
      // モーダルを閉じる
      onClose();
    } catch (error) {
      console.error('ユーザー情報の更新中にエラーが発生しました:', error);
    }
  };

  // モーダルが閉じられているときは何も描画しない
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-full w-11/12">
        <h2 className="font-bold mb-4">ユーザー情報を編集</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor='userName'
              className="block font-semibold mb-1"
            >
              ユーザー名
            </label>
            <input
              type="text"
              name='userName'
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor='content'
              className="block font-semibold mb-1"
            >
              自己紹介文
            </label>
            <textarea
              value={editContent}
              name='content'
              onChange={(e) => setEditContent(e.target.value)}
              className="border p-2 w-full"
              rows={3}
            />
          </div>
          <div>
            {/* ファイルアップロード */}
            <label
              htmlFor='thumbnailImageKey'
              className="block font-semibold mb-1"
            >
              アイコン画像
            </label>
            <input
              type="file"
              id='thumbnailImageKey'
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
            {/* アップロードされた画像をプレビュー(publicUrl) */}
            {thumbnailPreviewUrl && (
              <div className="mt-2">
                <img
                  src={thumbnailPreviewUrl}
                  alt="選択されたアイコン画像"
                  className="w-20 h-20 object-cover rounded-full border"
                />
              </div>
            )}
            {/* 既存アイコンのプレビュー (アップロード前の状態)
            {!thumbnailPreviewUrl && user?.thumbnailImageKey && (
              <div className="mt-2">
                <p>現在のサムネイル:</p>
                <img
                  src={user.thumbnailImageKey}
                  alt="Current thumbnail"
                  className="w-20 h-20 object-cover rounded-full border"
                />
              </div>
            )} */}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-mainBlue text-white px-4 py-2 rounded"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}