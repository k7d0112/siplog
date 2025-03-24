import React from 'react'
import { LoginButton } from './Button';
import Link from 'next/link';
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className='py-4 px-5 bg-mainBlack'>
      <div className='max-w-[340px] mx-auto flex justify-between'>
        <h2 className='font-jost font-medium italic text-white text-2xl'>Sip Log</h2>
        <LoginButton className='border border-white'/>
      </div>
      <div className='mt-3 flex justify-center items-center gap-x-6'>
        <Link href='https://x.com/ka7de_works'>
          <FaXTwitter size={25} fill='#fff' />
        </Link>
        <Link href='https://www.instagram.com/k7d_programming/?next=%2Ftrip.com_jp%2Ffeed%2F'>
          <FaInstagram size={25} fill='#fff' />
        </Link>
      </div>
      <p className='font-noto text-white font-regular text-[10px] mt-6 text-center'>&copy; Sip Log All Rights Reserved</p>
    </footer>
  );
}

export default Footer