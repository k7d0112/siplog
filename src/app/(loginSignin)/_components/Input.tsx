import React, { useState } from 'react'
import { InputProps } from '../_types/Input';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

// 入力欄のinputタグ
export const InputArea: React.FC<InputProps> = ({
  label,type, name, value, onChange, placeholder
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  if (name === 'password') {
    return (
      <div className='relative'>
        <label
          htmlFor={name}
          className='block mb-2 text-sm font-medium font-noto'
        >
          {label}
        </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          required
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute bottom-3 right-4 text-mainBlack hover:text-mainBlack/80 focus:outline-none'
        >
          {passwordVisible ? (
            <IoIosEye size={20} />
          ) : (
            <IoIosEyeOff size={20} />
          )}
        </button>
      </div>
    );
  }

  return(
    <div>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium font-noto'
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
      />
    </div>
  );
}