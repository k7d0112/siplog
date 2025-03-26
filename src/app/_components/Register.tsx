'use client'

import { motion } from 'framer-motion';
import Image from "next/image";
import { SigninButton } from "./Button";

export const Register = () => {
  return(
    <section className='mt-10'>
      <div className='mx-auto py-10 px-5 bg-mainBgGray'>
        <h2 className='sectionTitle'>登録は簡単</h2>
        <p className='text-center mt-[45px] font-noto font-bold text-mainBlack text-2xl tracking-wider'>
          下記のボタンから<br/>
          新規登録して<br/>
          <span className='font-jost font-bold italic text-mainBlue text-3xl'>Sip Log</span>を始めよう！
        </p>
        <motion.div
          animate={{ scale: [1, 1.08, 1]}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="block mx-auto mt-10 text-center"
        >
          <SigninButton className=''/>
        </motion.div>
        <Image
          src='/images/register.png'
          width={200}
          height={200}
          alt='ボタンを押しているイラスト'
          className='mx-auto mt-[50px]'
        />
      </div>
    </section>
  );
}