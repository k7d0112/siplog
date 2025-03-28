'use client'

import { supabase } from '@/app/_libs/supabase'
import Image from 'next/image';
import { useState } from 'react'
import { InputArea } from '../_components/Input';
import { FormButton } from '../_components/Button';
import { useRouter } from 'next/navigation';
import { IoLogInOutline } from "react-icons/io5";

export default function Page () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // 本番環境では、メールアドレス認証後に該当ページにリダイレクトさせる
        emailRedirectTo: `https://siplog.vercel.app/users`,
        data: {
          userName: userName,
        },
      },
    });

    if ( error || !authUser || !authUser.user ) {
      alert('登録に失敗しました。再度お試しください');
      throw new Error('Failed to sign up user');
    } else {
      setUserName('')
      setEmail('')
      setPassword('')
      alert('確認メールを送信しました。メールアドレス認証後、アプリ内ページに移動します。');
    }

    // APIエンドポイントを呼び出して、supabaseのauth.userの情報をUserテーブルに保存
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: authUser.user.id,
        email: authUser.user.email,
        userName: userName,
      }),
    });

    if ( !response.ok ) {
      throw new Error('Failed to save user information');
    }

    // テスト環境のみメールアドレス認証前にユーザーページに遷移
    // router.push('/users');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleAnonymousLogin = async () => {
    const { error } = await supabase.auth.signInAnonymously();

    if (error instanceof Error) {
      alert('ゲストログインに失敗しました。お手数ですが再度お試し下さい。');
      throw new Error(error.message);
    }

    router.push('/users');
  }

  return (
    <div className='max-w-80 mx-auto px-3 pt-10'>
      <Image
        src='/images/signinImage.png'
        alt='コーヒーを持った男女がハンモックでくつろいでいるイラスト'
        width={250}
        height={250}
        className='mx-auto'
      />
      <form
        onSubmit={handleSubmit}
        className='space-y-5 w-full max-w-[300px] mt-10'
      >
        <InputArea
          label='ユーザー名'
          type='text'
          name='userName'
          value={userName}
          onChange={handleChange}
          placeholder='ユーザー名'
        />
        <InputArea
          label='メールアドレス'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          placeholder='hogehoge@gmail.com'
        />
        <InputArea
          label='パスワード'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          placeholder='････････'
        />

        <FormButton
          type='submit'
          label='サインアップ'
        />
      </form>
      <p className='mt-3 text-xs font-noto text-center text-mainBlack'>または</p>
      <div className='mt-3 w-full'>
        <button
          onClick={handleAnonymousLogin}
          className='w-full text-white bg-mainBlue hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center relative'
        >
          <span>ゲストユーザーとしてログイン</span>
          <IoLogInOutline size={20} className='absolute right-4 top-1/2 translate-y-[-50%]' />
        </button>
      </div>
    </div>
  );
}