'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { ClassNameProps } from '../_types/ClassName';


export const LoginButton: React.FC<ClassNameProps> = ({ className }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  }

  return(
    <button
      type='button'
      onClick={handleClick}
      className={`${className} text-xs font-noto font-medium text-white py-2 px-4 bg-mainBlack rounded-md cursor-pointer hover:opacity-80`}
    >
      ログイン
    </button>
  );
}

export const SigninButton: React.FC<ClassNameProps> = ({ className }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/signup');
  }

  return(
    <button
      type='button'
      onClick={handleClick}
      className={`${className} py-4 px-8 bg-mainBlue text-white font-noto font-bold text-2xl rounded-xl cursor-pointer relative btnOrnamentBefore btnOrnamentAfter`}
    >
      新規登録はこちら！
    </button>
  );
}