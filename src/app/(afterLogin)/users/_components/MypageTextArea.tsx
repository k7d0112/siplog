'use client'

import { useState } from 'react'

export const MypageTextArea: React.FC = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  // 3点リーダーの省略をON/OFfするための関数
  const toggleText = () => {
    setIsToggle(!isToggle);
  }

  return(
    <div className='p-2 rounded bg-white'>
      <button
        onClick={toggleText}
      >
        <p
          className={`font-noto font-normal text-sm text-mainBlack tracking-wider leading-7 text-left ${
            isToggle ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
      </button>
    </div>
  );
}