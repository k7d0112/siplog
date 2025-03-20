'use client'

import { useEffect, useState } from 'react'
// import { FormEvent, useEffect, useState } from 'react'
// import { AmountButton } from "../../_components/AmountButton";
import { UserName } from "../../_components/UserName";
import { FaPen } from "react-icons/fa";
import { MypageUserIcon } from "./MypageUserIcon";
import { TabComponent } from './TabComponent';
// import { toggleText } from '@/app/utils/ButtonToggle';
import { GetUserInfo } from '../_types/User';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { UserEditModal } from './UserEditModal';

export const UsersLayout: React.FC = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 取得したユーザー情報を保存
  const [user, setUser] = useState<GetUserInfo | null>(null);

  // カスタムフックからsupabase.authのユーザー情報を取得
  const { session, token } = useSupabaseSession();

  // マイページに表示するユーザー情報を取得するためのfetch処理 (GET)
  useEffect(() => {
    // useSupabaseSession()が非同期処理のためtokenが渡されるまでfecth処理は行わない、かつtokenがnullの場合、headersに渡すとエラーが出るのでその対策
    if (!token) return;
    // デバック用
    // console.log(token);
    // console.log(session)

    const fetcher = async () => {
      try {
        // token がある場合、"Bearer " を付けて送信
        const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            ...authHeader,
          },
        });
        // レスポンスがエラー(400など)の場合は throw する
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.status || 'APIエラー');
        }
        const { status, UserProfile } = await res.json();
        // console.log('取得したデータ', { status, UserProfile });
        // ここでUserProfileをsetUserに格納
        setUser(UserProfile);
      } catch (error) {
        console.error('ユーザー情報取得中にエラーが発生しました:', error);
      }
    }
    fetcher();
  }, [token]);

  // 3点リーダーの省略をON/OFfするための関数
  const toggleText = () => {
    setIsToggle(!isToggle);
  }

  // モーダルを表示させる関数&ユーザー情報の編集開始
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // モーダルを非表示にさせる関数
  const handleModalClose = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 400);
  };

  // モーダルから受け取った最新のユーザー情報をsetUserで置き換え
  const handleUpdateUser = (updatedUser: GetUserInfo) => {
    setUser(updatedUser);
  }

  return(
    session ? (
      user ? (
        <div className='flex flex-col'>
          <div className='p-5 bg-white'>
            <div className='flex justify-between items-start gap-x-2'>
              <div className='flex items-center gap-x-2'>
                <MypageUserIcon thumbnailImageKey={user.thumbnailImageKey}/>
                <div className=''>
                  <UserName
                    userName={user.userName}
                  />
                  <ul className='flex items-center gap-x-2 mt-2'>
                    <li>
                      {/* <AmountButton type='posts' status={false} amount={user.postCount}/> */}
                    </li>
                    <li>
                      {/* <AmountButton type='report' status={false} amount={0}/> */}
                    </li>
                  </ul>
                </div>
              </div>
              <FaPen
                className='fill-mainBlue mt-6 cursor-pointer'
                onClick={handleModalOpen}
              />
            </div>
            <button
              onClick={toggleText}
            >
              <p className={`text-sm text-mainBlack font-noto font-regular mt-3 tracking-wider leading-5 text-left ${isToggle ? 'line-clamp-none' : 'line-clamp-3'}`}>
                {user?.content}
              </p>
            </button>
          </div>
          {/* <div className='flex-1 overflow-y-scroll'> */}
          {/* タブ */}
          <TabComponent/>
          {/* </div> */}
          {/* モーダルコンポーネント(編集フォーム)を呼び出す */}
          <UserEditModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            token={token}
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )
    ) : (
      <p>Loading...</p>
    )
  );
}