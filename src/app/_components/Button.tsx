import React from 'react'

type ButtonProps = {
  className: string;
};

export const LoginButton: React.FC<ButtonProps> = ({ className }) => {
  return(
    <button
      type='button'
      className={`${className} text-xs font-noto font-medium text-white py-2 px-4 bg-mainBlack rounded-md cursor-pointer hover:opacity-80`}
    >
      ログイン
    </button>
  );
}

export const SigninButton: React.FC<ButtonProps> = ({ className }) => {
  return(
    <button
      type='button'
      className={`${className} py-4 px-8 bg-mainBlue text-white font-noto font-bold text-2xl rounded-xl cursor-pointer relative btnOrnamentBefore btnOrnamentAfter`}
    >
      新規新規登録はこちら！
    </button>
  );
}