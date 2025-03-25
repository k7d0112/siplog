'use client'

import { Category } from '@/app/_types/Category';
import { CreateModalProps } from '@/app/_types/CreateModalProps';
import React, { useState } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { createPortal } from 'react-dom';

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen, onClose, userId, allCategories
}) => {
  // タブの状態管理
  // const [activeTab, setActiveTab] = useState<'post' | 'category'>('post');
  let activeTab = 'post';

  // 投稿フォーム用のstate
  const [postContent, setPostContent] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [postErrorMessage, setPostErrorMessage] = useState<string>('');

  // カテゴリーフォーム用のstate
  // const [newCategoryName, setNewCategoryName] = useState<string>('');
  // const [categoryErrorMessage, setCategoryErrorMessage] = useState<string>('');

  // ポータル先がクライアントで利用できるかどうかを確認するためのstate(モーダルのz-indexを管理する)
  // const [mounted, setMounted] = useState<boolean>(false);

  // カスタムフックからsupabase.authのユーザー情報を取得
  const { token } = useSupabaseSession();

  // モーダルを閉じる時に、入力状態をリセット
  const handleModalClose = () => {
    setPostContent('');
    setSelectedCategories([]);
    setPostErrorMessage('');
    // setNewCategoryName('');
    // setCategoryErrorMessage('');
    // setActiveTab('post');
    onClose();
  };

  // カテゴリー(複数)の選択・解除
  const handleSelectCategory = (category: Category) => {
    const alreadySelected = selectedCategories.some((cat) => cat.id === category.id);
    if (alreadySelected) {
      setSelectedCategories((prev) => prev.filter((cat) => cat.id !== category.id));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // 投稿作成フォーム送信
  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPostErrorMessage('');
    // ユーザーのログイン情報がなければリターン
    if (!token) return;

    // クライアントサイドにマウントされたらtrue
    // useEffect(() => {
    //   setMounted(true);
    // }, []);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          postUserId: userId,
          content: postContent,
          categories: selectedCategories.map((category) => ({ id: category.id })),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setPostErrorMessage(errorData.status || '投稿の作成に失敗しました');
        return;
      }
      handleModalClose();
    } catch  (error) {
      if (error instanceof Error) {
        setPostErrorMessage(error.message || '投稿作成時にエラーが発生しました');
      } else {
        setPostErrorMessage('投稿作成時にエラーが発生しました');
      }
    }
  };

  // カテゴリー作成フォーム送信
  // const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setCategoryErrorMessage('');

  //   try {
  //     const response = await fetch('/api/categories', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ name: newCategoryName }),
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setCategoryErrorMessage(errorData.status || 'カテゴリー作成に失敗しました');
  //       return;
  //     }
  //     handleModalClose();
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setCategoryErrorMessage(error.message || 'カテゴリー作成時にエラーが発生しました');
  //     } else {
  //       setPostErrorMessage('カテゴリー作成時にエラーが発生しました');
  //     }
  //   }
  // }

  // isOpenがfalseの場合は何も表示しない
  if (!isOpen) return null;
  // if (!mounted || !isOpen) {
  //   return null;
  // }
  // console.log(mounted);

  return createPortal(
  // return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
      <div className='bg-white p-6 rounded shadow-lg max-w-full w-11/12'>
        {/* タブの切り替え */}
        <div className='flex space-x-4 border-b mb-4'>
          <button
            type='button'
            className={`py-2 px-4 ${
              activeTab === 'post'
                ? 'border-b-2 border-mainBlue font-semibold'
                : 'text-gray-600'
            }`}
            // onClick={() => setActiveTab('post')}
          >
            投稿作成
          </button>
          {/* <button
            type='button'
            className={`py-2 px-4 ${
              activeTab === 'category'
                ? 'border-b border-mainBlue font-semibold'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('category')}
          >
            カテゴリー作成
          </button> */}
        </div>

        {/* タブ：投稿作成 */}
        {activeTab === 'post' && (
          <form
            onSubmit={handleSubmitPost}
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
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className='border p-2 w-full'
                rows={3}
              />
            </div>

            <div>
              <p className='block font-semibold mb-1'>カテゴリー選択</p>
              <div className='flex flex-wrap gap-3'>
                {allCategories.map((cat) => (
                  <label key={cat.id} className='flex items-center gap-1'>
                    <input
                      type='checkbox'
                      checked={selectedCategories.some((c) => c.id === cat.id)}
                      onChange={() => handleSelectCategory(cat)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* エラー表示 */}
            {postErrorMessage && (
              <p className='text-red-500 text-sm'>{postErrorMessage}</p>
            )}

            {/* ボタン */}
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
                投稿
              </button>
            </div>
          </form>
        )}

        {/* タブ: カテゴリー作成
        {activeTab === 'category' && (
          <form
            onSubmit={handleSubmitCategory}
            className='flex flex-col gap-4'
          >
            <div>
              <label htmlFor='categoryName' className='block font-semibold mb-1'>
                カテゴリー名
              </label>
              <input
                type='text'
                id='categoryName'
                name='categoryName'
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className='border p-2 w-full'
              />
            </div>

            エラー表示
            {categoryErrorMessage && (
              <p className='text-red-500 text-sm'>{categoryErrorMessage}</p>
            )}

            ボタン
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
                追加
              </button>
            </div>
          </form>
        )} */}

      </div>
    {/* </div> */}
    </div>,
    document.body
  );
}