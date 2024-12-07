import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { ModalProps } from "../_types/Modal";
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from "@/utils/ModalVariants";

export const Modal: FC<ModalProps> = ({ isOpen, handleClose, post }) => {
  if (!isOpen) return null;

  return(
    <AnimatePresence>
      <motion.div
        className='bg-[rgba(0_0_0/0.6)] flex items-center justify-center fixed inset-0 z-50'
        onClick={handleClose}
        key={post.id}
      >
        <motion.div
          className='max-w-[90%] w-full rounded bg-mainBgGray p-5 relative'
          onClick={(e) => e.stopPropagation()}
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <button
            className='absolute top-4 right-4 cursor-pointer'
            onClick={handleClose}
          >
            <IoMdClose
              width={16}
              height={16}
              className='fill-mainBlue'
            />
          </button>
          <h2 className='font-noto font-bold text-mainBlack text-lg mt-3 pb-2 border-b border-mainGray'>{post.title}</h2>
          <div className='max-h-52 overflow-y-auto py-2 border-b border-mainGray'>
            <p className='font-noto font-normal text-mainBlack text-sm tracking-wider'>{post.contents}</p>
          </div>
          <ul className='flex items-center flex-wrap mt-2'>
            {post.categories.map((category, index) => (
              <li
                key={index}
                className='mr-2 font-noto text-medium text-white text-xs py-1 px-2 bg-mainBlue rounded'
              >
                {category.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}