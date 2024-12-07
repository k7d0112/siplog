import React from 'react'
import { LoginButton } from './Button'

function Header() {
  return (
    <header className='px-5 py-4 border-b border-lineGray flex items-center justify-between'>
      <h1 className='text-2xl font-medium font-jost italic text-mainBlue'>Sip Log</h1>
      <LoginButton className=''/>
    </header>
  );
}

export default Header