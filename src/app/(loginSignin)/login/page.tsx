'use client'

import { supabase } from '@/app/_libs/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { InputArea } from '../_components/Input';
import { FormButton } from '../_components/Button';
import Image from 'next/image';
import { IoLogInOutline } from "react-icons/io5";


export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('ログインに失敗しました。入力内容を確認し再度ログインしてください。');
    } else {
      router.replace('/users');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ( name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleRedirectSignup = () => {
    router.push('/signup');
  }

  return (
    <div className='max-w-80 mx-auto px-3 pt-20'>
      <Image
        src='/images/loginImage.png'
        alt='コーヒーを持った3人が座ってリラックスしているイラスト'
        width={250}
        height={250}
        className='mx-auto'
      />
      <form
        onSubmit={handleSubmit}
        className='space-y-5 w-full max-w-[300px] mt-10'
      >
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
          label='ログイン'
        />
      </form>
      <p className='mt-3 text-xs font-noto text-center text-mainBlack'>
        ユーザー登録がまだの方は<br/>下記ボタンからご登録ください
        </p>
      <div className='mt-3 w-full'>
        <button
          onClick={handleRedirectSignup}
          className='w-full text-white bg-mainBlue hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center relative'
        >
          <span>新規登録</span>
          <IoLogInOutline size={20} className='absolute right-4 top-1/2 translate-y-[-50%]' />
        </button>
      </div>
    </div>
  );
}