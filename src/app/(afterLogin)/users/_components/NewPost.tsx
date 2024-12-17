import { IoIosAdd } from "react-icons/io";

// アプリのページ下部に固定する新規投稿作成用のボタン
export const NewPost = () => {
  return(
      <button
        type='button'
        className='cursor-pointer fixed right-5 bottom-5 z-50'
      >
        <IoIosAdd className='w-10 h-10 fill-mainBlue bg-white rounded-full border-2 border-mainBlue align-middle' />
      </button>
  );
}