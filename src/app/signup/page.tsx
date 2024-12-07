'use client'

import { supabase } from '@/app/_libs/supabase'
import { useState } from 'react'

export default function Page () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000`,
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

  return (
    <div className='flex justify-center pt-[240px]'>
      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-[400px]'>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium'
          >
            メールアドレス
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='name@company.com'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium'
          >
            パスワード
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='・・・・・・・'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            登録
          </button>
        </div>
      </form>
    </div>
  )
}