'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { SigninButton } from "./Button";

const containerVariants = {
  hidden: {
    opacity: 1
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const textArray = [
  {
    text: "Sip Log",
    className: "font-jost italic text-mainBlue text-[40px] pr-2",
  },
  {
    text: "で\nコーヒー体験を記録して\nコーヒー好きとシェアしませんか？",
    className: "",
  },
];

export const FirstView = () => {
  return(
    <div className='pt-2.5 px-5 mx-auto'>
      {/* タイプライター風アニメーション */}
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="font-noto font-bold text-mainBlack text-3xl leading-[46px]"
      >
        {textArray.map((item, index) => (
          <span
            key={index}
            className={item.className}
          >
            {item.text.split('').map((char, i) => {
              if (char === "\n") {
                return <br key={`br-${i}`} />;
              }
              return (
                <motion.span
                  key={i}
                  variants={childVariants}
                  style={{ whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.h2>
      {/* <h2 className='font-noto font-bold text-mainBlack text-3xl leading-[46px]'>
        <span className='font-jost italic text-mainBlue text-[40px] pr-2'>Sip Log</span>で<br/>
        コーヒー体験を記録して<br/>
        コーヒー好きとシェアしませんか？
      </h2> */}

      {/* パルスアニメーションするボタン */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className='block mx-auto mt-10 text-center'
      >
        <SigninButton className=''/>
      </motion.div>
      <p className='text-center mt-5'>
        上のボタンからユーザー登録なしの<br/>テストユーザーとしてログインすることもできます！
      </p>

      {/* 下からフェードイン */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-[50px] mx-auto"
      >
        <Image
          src='/images/firstview.png'
          width={250}
          height={250}
          alt='ファーストビュー画像'
          className='mt-[50px] mx-auto'
        />
      </motion.div>
    </div>
  );
};