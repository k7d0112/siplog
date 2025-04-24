'use client'

import { supabase } from '@/app/_libs/supabase'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputArea } from '../_components/Input';
import { FormButton } from '../_components/Button';
import { useRouter } from 'next/navigation';
import { IoLogInOutline } from "react-icons/io5";
import { SignupValidationSchema } from '../utils/SignupValidationSchema';
import { SignupForm } from '../_types/SignupForm';

export default function Page () {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(SignupValidationSchema),
  })

  const onSubmit = async ({ userName, email, password}: SignupForm) => {
    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
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
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 w-full max-w-[300px] mt-10'
      >
        <InputArea
          label='ユーザー名'
          type='text'
          placeholder='ユーザー名'
          { ...register('userName')}
          error={errors.userName?.message}
        />
        <InputArea
          label='メールアドレス'
          type='email'
          placeholder='hogehoge@gmail.com'
          { ...register('email')}
          error={errors.email?.message}
        />
        <InputArea
          label='パスワード'
          type='password'
          placeholder='････････'
          { ...register('password')}
          error={errors.password?.message}
        />

        <FormButton
          type='submit'
          label={isSubmitting ? 'サインアップ中...' : 'サインアップ'}
          disabled={isSubmitting}
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