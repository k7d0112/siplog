'use client'

import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { GetUserInfo } from '../../users/_types/User';
import { useRouter } from 'next/navigation';

export default function Page () {
  const { session, token } = useSupabaseSession();
  const router = useRouter();
  const [user, setUser] = useState<GetUserInfo | null>(null);
  const [content, setContent] = useState<string>('');

  const [contentError, setContentError] = useState<string>('');

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.status || 'APIエラー');
        }

        const { UserProfile } = await res.json();
        setUser(UserProfile);
      } catch (error) {
        console.error('ユーザー情報の取得中にエラーが発生しました。:' ,error);
      }
    }
    fetcher();
  }, [token]);

  console.log(user);

  // バリデーション
  const validate = () => {
    let isValidate = true;
    let contentError = '';

    if (!user && !session) {
      alert('ログイン情報が正しくありません');
      return
    }

    if (!content) {
      contentError = 'お問い合わせ内容は必須です';
      isValidate = false;
    } else if ( content.length > 500) {
      contentError = 'お問い合わせ内容は500字以内で入力してください';
      isValidate = false;
    }

    setContentError(contentError);
    return isValidate;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate() || !session || !token || !user) return;

    try {
      const body = {
        userName: user.userName,
        email: session.user.email,
        content: content,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': token,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'APIエラー');
      }
      alert('お問い合わせの送信が完了しました。');
      handleClear();
      router.replace('/questions');
    } catch (error) {
      alert('お問い合わせの送信に失敗しました。再度送信してください。');
      console.error('問い合わせ送信中にエラーが発生しました:', error);
    }
  }

  const handleClear = () => {
    setContent('');
  }

  return (
    <div className='px-5 pt-5'>
      <Link
        href='/questions'
        className='hover:cursor-pointer'
      >
        <FaArrowLeft size={20} className='fill-mainBlack'/>
      </Link>
      <div className='mt-5'>
        <h2 className='text-center font-noto font-bold text-mainBlack text-2xl'>お問い合わせフォーム</h2>
        <ul className='mt-3'>
          <li className='font-noto font-medium'>・アプリ使用上の質問</li>
          <li className='font-noto font-medium'>・アプリ使用の際に改善してほしいこと</li>
          <li className='font-noto font-medium'>・アプリ使用にあたり追加してほしい機能</li>
        </ul>
        <p className='mt-2 font-noto font-medium'>
          など上記以外の内容でも構いませんので、お気軽にご相談ください。<br/>
          24時間以内にお問い合わせ内容を確認後、管理者から連絡致しますので、少々お待ちください。
        </p>
        <form
          className='mt-5'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className='block text-center font-noto font-bold'
              htmlFor='content'
            >
              お問い合わせ内容を下記に記入してください
            </label>
            <textarea
              id='content'
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className='w-full border border-gray-300 rounded-lg p-4 mt-2 resize-none'
            >
            </textarea>
            <p className="text-sm text-red-700">{contentError}</p>
            <div className='mt-2 flex items-center justify-center gap-x-3'>
              <button
                type='button'
                onClick={handleClear}
                className="bg-gray-200 font-bold py-2 px-4 rounded-lg"
              >
                クリア
              </button>
              <button
                type='submit'
                className="bg-mainBlue text-white font-bold py-2 px-4 rounded-lg mr-4"
              >
                送信
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}