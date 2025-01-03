'use client'

import { supabase } from '@/app/_libs/supabase'
import Image from 'next/image';
import { useState } from 'react'
import { InputArea } from '../_components/Input';
import { FormButton } from '../_components/Button';

export default function Page () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/users`,
      },
    });

    if ( error || !authUser || !authUser.user ) {
      alert('登録に失敗しました。再度お試しください');
      throw new Error('Failed to sign up user');
    } else {
      setEmail('')
      setPassword('')
      alert('確認メールを送信しました。');
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
      }),
    });

    if ( !response.ok ) {
      throw new Error('Failed to save user information');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  return (
    <div className='max-w-80 mx-auto px-3 pt-20'>
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
        {/* <InputArea
          label='ユーザー名'
          type='text'
          name='userName'
          value={userName}
          onChange={handleChange}
          placeholder='ユーザー名'
        /> */}
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
    </div>
  );
}