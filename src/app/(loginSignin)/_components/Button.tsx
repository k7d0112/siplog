import { FormButtonProps } from "../_types/Button";
import { IoLogInOutline } from "react-icons/io5";

// ログイン&サインインボタン
export const FormButton: React.FC<FormButtonProps> = ({ type, label }) => {
  return(
    <div>
      <button
        type={type}
        className='w-full text-white bg-mainBlack hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center relative'
      >
        <span>{label}</span>
        <IoLogInOutline size={20} className='absolute right-4 top-1/2 translate-y-[-50%]' />
      </button>
    </div>
  );
}