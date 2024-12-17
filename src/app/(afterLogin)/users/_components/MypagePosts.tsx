import { CreatedTime } from "../../_components/CreatedTime";
import { FaPen } from "react-icons/fa";
import { MypageTextArea } from "./MypageTextArea";
import { CategoryTag } from "../../_components/CategoryTag";
import { AmountButton } from "../../_components/AmountButton";

export const MypagePosts = () => {
  return(
    <>
      <div className='border-b border-lineGray py-4'>
        <div className='flex items-center justify-between'>
          <CreatedTime className=''/>
          <FaPen className='fill-mainBlue' />
        </div>
        <div className='mt-2.5'>
          <MypageTextArea/>
        </div>
        <ul className='mt-2.5 flex flex-wrap gap-2'>
          <li>
            <CategoryTag/>
          </li>
        </ul>
        <ul className='mt-2.5 flex gap-2'>
          <li>
            <AmountButton type='heart' status={false}/>
          </li>
          <li>
            <AmountButton type='comment' status={false}/>
          </li>
        </ul>
      </div>
      <div className='border-b border-lineGray py-4'>
        <div className='flex items-center justify-between'>
          <CreatedTime className=''/>
          <FaPen className='fill-mainBlue' />
        </div>
        <div className='mt-2.5'>
          <MypageTextArea/>
        </div>
        <ul className='mt-2.5 flex flex-wrap gap-2'>
          <li>
            <CategoryTag/>
          </li>
        </ul>
        <ul className='mt-2.5 flex gap-2'>
          <li>
            <AmountButton type='heart' status={false}/>
          </li>
          <li>
            <AmountButton type='comment' status={false}/>
          </li>
        </ul>
      </div>
      <div className='border-b border-lineGray py-4'>
        <div className='flex items-center justify-between'>
          <CreatedTime className=''/>
          <FaPen className='fill-mainBlue' />
        </div>
        <div className='mt-2.5'>
          <MypageTextArea/>
        </div>
        <ul className='mt-2.5 flex flex-wrap gap-2'>
          <li>
            <CategoryTag/>
          </li>
        </ul>
        <ul className='mt-2.5 flex gap-2'>
          <li>
            <AmountButton type='heart' status={false}/>
          </li>
          <li>
            <AmountButton type='comment' status={false}/>
          </li>
        </ul>
      </div>
    </>
  );
}