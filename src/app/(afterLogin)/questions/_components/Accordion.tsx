'use client'

import { useState } from "react";

export const Accordion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return(
    <>
      <div className='mt-2'>
        <div className='bg-white py-2 px-7 relative shadow-md'>
          <h1 className='font-noto font-bold text-base text-mainBlack'>
            <span
              className='text-mainBlue font-noto text-lg font-medium absolute top-[5.5px] left-2'
            >
              Q.
            </span>
            テキストテキストテキストテキスト
          </h1>
          <button
            className='absolute top-0 right-0 w-7 h-10'
            onClick={handleClick}
          >
            <span className='inline-block w-5 h-0.5 bg-mainBlue absolute top-1/2 left-0 translate-y-[-50%]'></span>
            <span className={`inline-block w-5 h-0.5 bg-mainBlue absolute top-1/2 left-0 translate-y-[-50%] transition-transform
              ${isOpen ? 'rotate-0' : 'rotate-90'}`}
              >
            </span>
          </button>
        </div>
        <div className={`bg-white pl-7 pr-2 relative transition-all overflow-hidden ${isOpen ? 'max-h-[500px] py-2' : 'max-h-0 py-0'}`}>
          <span className='text-mainBlue font-noto text-lg font-medium absolute top-[5.5px] left-[10px]'>A.</span>
          <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキステキストテキスト</p>
        </div>
      </div>
    </>
  );
}