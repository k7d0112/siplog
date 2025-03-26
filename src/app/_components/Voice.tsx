'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export const Voice = () => {
  return(
    <section className='mt-10'>
      <div className='mx-auto py-10 px-[30px] bg-mainBgGray'>
        <motion.h2
          className='sectionTitle'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          毎日のコーヒーライフで<br/>こんなご希望は<br/>ありませんか？
        </motion.h2>
        <div className='mt-14'>
          <div className='relative'>
            <motion.p
              className='font-noto font-bold text-base text-mainBlack p-5 bg-white rounded-2xl border-2 border-mainBlack tracking-wider'
              initial={{ scale: 0.8, opacity:0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              すでにコーヒーの記録はつけているけど少し物足りなさがある...
            </motion.p>
            <motion.div
              className='w-8 h-8 bg-white border-2 border-mainBlack rounded-full absolute top-[100px] left-[100px]'
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div
              className='w-5 h-5 bg-white border-2 border-mainBlack rounded-full absolute top-40 left-[85px]'
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <Image
              src='/images/voice01.png'
              width={200}
              height={200}
              alt='男女が話し合っているイラスト'
              className='mt-[100px]'
            />
          </div>
          <div className='mt-5 relative'>
            <motion.p
              className='font-noto font-bold text-base text-mainBlack p-5 bg-white rounded-2xl border-2 border-mainBlack tracking-wider'
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              コーヒー好きな人と情報交換をしたり他の人がどんなコーヒーを飲んでいるのか知りたい！
            </motion.p>
            <motion.div
              className='w-8 h-8 bg-white border-2 border-mainBlack rounded-full absolute top-32 right-[100px]'
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div
              className='w-5 h-5 bg-white border-2 border-mainBlack rounded-full absolute top-[198px] right-[85px]'
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <Image
              src='/images/voice02.png'
              width={200}
              height={200}
              alt='男女が話し合っているイラスト'
              className='mt-[100px] ml-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
}