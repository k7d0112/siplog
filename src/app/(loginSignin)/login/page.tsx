'use client'

import { supabase } from '@/app/_libs/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { InputArea } from '../_components/Input';
import { FormButton } from '../_components/Button';
import Image from 'next/image';

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
    </div>
  );
}