'use client'

import { FormEvent, useEffect, useState } from "react";
import { UserPostEditModalProps } from "../_types/User"
import { Category} from "@/app/_types/Category";

export const UserPostEditModal: React.FC<UserPostEditModalProps> = ({
  isOpen,
  onClose,
  token,
  userPost,
  onUpdateUserPost
}) => {
  // フォーム入力用のstate
  const [editContent, setEditContent] = useState<string>('');
  // 投稿が選択中のカテゴリー
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  // 作成済のカテゴリー
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  // モーダルが開いた時に投稿内容と既存カテゴリーをセット&全カテゴリー一覧を取得
  useEffect(() => {
    if (userPost && isOpen) {
      setEditContent(userPost.content);
      setSelectedCategories(userPost.categories.map((cat: Category) => cat.id));
      fetchAllCategories();
    }
  }, [userPost, isOpen]);

  // 全カテゴリーを取得してセット
  const fetchAllCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.status || 'APIエラー');
      }
      const { categories } = await res.json();
      setAllCategories(categories);
    } catch (error) {
      console.error('カテゴリー取得中にエラーが発生しました:', error);
    }
  }

  // フォームsubmitでPUTリクエストを送信
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !userPost) return;
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          postId: userPost.id,
          content: editContent,
          categories: selectedCategories.map((id) => ({ id })),
        }),
      });

      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.status || 'APIエラー');
      }

      const { updateUserPost } = await res.json();
      // 親コンポーネントに更新した投稿情報を送る
      onUpdateUserPost(updateUserPost);
      // モーダルを閉じる
      onClose();
    } catch (error) {
      console.error('投稿更新中にエラーが発生しました:', error);
    }
  };

  // モーダルを閉じる際にinput欄の内容を破棄してonCloseを実行
  const handleModalClose = () => {
    setEditContent('');
    setSelectedCategories([]);
    onClose();
  }

  // カテゴリー(複数)の選択・解除
  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        // 解除
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        // 選択
        return [...prevSelected, categoryId];
      }
    });
  };

  // モーダルが閉じられている時またはuserPostがnullの時は何も表示しない
  if (!isOpen || !userPost) return null;

  return(
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
      <div className='bg-white p-6 rounded shadow-lg max-w-full w-11/12'>
        <h2 className='font-bold mb-4'>投稿編集</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'
        >
          <div>
            <label
              htmlFor='content'
              className='block font-semibold mb-1'
            >
              投稿内容
            </label>
            <textarea
              id='content'
              name='content'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className='border p-2 w-full'
              rows={3}
              required
            />
          </div>
          <div>
            <p className='block font-semibold mb-1'>カテゴリー選択</p>
            <div className='flex flex-wrap gap-3'>
              {allCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleSelectCategory(category.id)}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={handleModalClose}
              className='bg-gray-400 text-white px-4 py-2 rounded'
            >
              キャンセル
            </button>
            <button
              type='submit'
              className='bg-mainBlue text-white px-4 py-2 rounded'
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}