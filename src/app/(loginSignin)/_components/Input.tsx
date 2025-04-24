'use client'

import { useState, forwardRef, MouseEventHandler } from 'react'
import { InputProps } from '../_types/Input';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

// 入力欄のinputタグ
export const InputArea = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', error, className, ...rest }, ref) => {
    const isPassword = type === 'password';
    const [visible, setVisible] = useState(false);
    const toggle: MouseEventHandler<HTMLButtonElement> = () =>
      setVisible((v) => !v);

    return(
      <div className='relative w-full'>
        <label className='block mb-2 text-sm font-medium font-noto'>
          {label}
        </label>
        <input
          ref={ref}
          type={isPassword ? (visible ? 'text' : 'password') : type}
          className={`bg-gray-50 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 text-sm rounded-lg focus: ring-blue-500 focus: border-blue-500 block w-full p-2.5 pr-10 ${className ?? ''}`}
          {...rest}
        />

        {isPassword && (
          <button
            type='button'
            onClick={toggle}
            className='absolute top-[55%] right-4 text-mainBlack hover: text-mainBlack/80 focus: outline-none'
          >
            {visible ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
          </button>
        )}

        {error && (
          <p className='mt-1 text-xs text-red-500 font-noto tracking-wide'>
            {error}
          </p>
        )}
      </div>
    );
  }
);


InputArea.displayName = 'InputArea';