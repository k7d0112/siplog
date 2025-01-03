'use client'

import { useState } from 'react'
import { AmountButton } from "../../_components/AmountButton";
import { UserIcon } from "../../_components/UserIcon";
import { UserName } from "../../_components/UserName";
import { FaPen } from "react-icons/fa";
import { MypageUserIcon } from "./MypageUserIcon";
import { TabComponent } from './TabComponent';
import { toggleText } from '@/app/utils/ButtonToggle';

export const UsersLayout: React.FC = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  // 3点リーダーの省略をON/OFfするための関数
  const toggleText = () => {
    setIsToggle(!isToggle);
  }

  return(
    <>
    <div className='h-screen flex flex-col'>
      <div className='p-5'>
        <div className='flex justify-between items-start gap-x-2'>
          <div className='flex items-start gap-x-2'>
            <MypageUserIcon/>
            <div className='mt-6'>
              <UserName/>
              <ul className='flex items-center gap-x-2 mt-2'>
                <li>
                  <AmountButton type='posts' status={false}/>
                </li>
                <li>
                  <AmountButton type='report' status={false}/>
                </li>
              </ul>
            </div>
          </div>
          <FaPen className='fill-mainBlue mt-6' />
        </div>
        <button
          onClick={toggleText}
        >
          <p className={`text-sm text-mainBlack font-noto font-regular mt-3 tracking-wider leading-5 text-left ${isToggle ? 'line-clamp-none' : 'line-clamp-3'}`}>
            自己紹介文表示エリア、プロフィール編集ボタンからプロフィールの変更可、3行以上の場合は3点リーダーで省略し、クリック時に全文を表示するように設定してレイアウトが崩れないようにする
          </p>
        </button>
      </div>
      {/* <div className='flex-1 overflow-y-scroll'> */}
        <TabComponent/>
      {/* </div> */}
    </div>
    </>
  );
}