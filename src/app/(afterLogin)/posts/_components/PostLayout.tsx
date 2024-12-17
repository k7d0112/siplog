import Link from "next/link";
import { AmountButton } from "../../_components/AmountButton";
import { CategoryTag } from "../../_components/CategoryTag";
import { CreatedTime } from "../../_components/CreatedTime";
import { TextArea } from "./TextArea";
import { UserIcon } from "../../_components/UserIcon";
import { UserName } from "../../_components/UserName";

export const PostLayout = () => {
  return(
    <div className='border-b border-lineGray p-5'>
      <Link href='/posts/1'>
        <div className='flex items-center gap-x-3.5'>
          <UserIcon/>
          <UserName/>
          <CreatedTime className='ml-auto' />
        </div>
        <TextArea className='mt-2.5' />
        <ul className='mt-2.5 flex flex-wrap gap-2'>
          <li>
            <CategoryTag/>
          </li>
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
      </Link>
    </div>
  );
}