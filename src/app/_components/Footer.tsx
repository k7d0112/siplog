import React from 'react'
import { LoginButton } from './Button';

function Footer() {
  return (
    <footer className='py-4 px-5 bg-mainBlack'>
      <div className='max-w-[340px] mx-auto flex justify-between'>
        <h2 className='font-jost font-medium italic text-white text-2xl'>Sip Log</h2>
        <LoginButton className='border border-white'/>
      </div>
      <p className='font-noto text-white text-light text-xs mt-5 text-center'>&copy; Sip Log All Rights Reserved</p>
    </footer>
  );
}

export default Footer