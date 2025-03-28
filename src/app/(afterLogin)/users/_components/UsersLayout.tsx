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
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const UsersLayout: React.FC = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 取得したユーザー情報を保存
  const [user, setUser] = useState<GetUserInfo | null>(null);

  // カスタムフックからsupabase.authのユーザー情報を取得
  const { session, token } = useSupabaseSession();

  console.log('session:', session?.user);
  // マイページに表示するユーザー情報を取得するためのfetch処理 (GET)
  useEffect(() => {
    // ゲストユーザーの場合
    const fetchUserData = async () => {
      try {
        if (!session) return;

        // 匿名ユーザーかどうか判定
        // const isAnonymous = session.user?.app_metadata?.provider === 'anonymous' || session.user?.identities?.[0]?.provider === 'anonymous';
        const isAnonymous = session.user.is_anonymous;
        console.log(isAnonymous)

        if (isAnonymous) {
          const res = await fetch('/api/guest');
          if (!res.ok) {
            throw new Error('ゲストユーザーの情報取得に失敗しました。');
          }
          const { guestUserProfile } = await res.json();
          setUser(guestUserProfile);
        } else {
          // useSupabaseSession()が非同期処理のためtokenが渡されるまでfecth処理は行わない、かつtokenがnullの場合、headersに渡すとエラーが出るのでその対策
          if (!token) return;
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
          const { UserProfile } = await res.json();
          // console.log('取得したデータ', { status, UserProfile });
          // ここでUserProfileをsetUserに格納
          setUser(UserProfile);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('ユーザー情報取得中にエラーが発生しました：',error.message);
        }
      }
    };
    fetchUserData();
  }, [session ,token]);

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
        <>
          <div className='flex flex-col'>
            <div className='p-5 bg-white'>
              <div className='flex justify-between items-start gap-x-2'>
                <div className='flex items-center gap-x-2'>
                  <Skeleton circle width={36} height={36} />
                  <Skeleton width={100} height={20} />
                </div>
                <Skeleton width={60} height={20} />
              </div>
              <div className='mt-2.5'>
                <Skeleton height={60} />
              </div>
            </div>
          </div>
          <div className='flex'>
            <Skeleton width='50%' height={40} />
            <Skeleton width='50%' height={40} />
          </div>
          <div className='px-3 pt-4'>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className='py-4 border-b border-lineGray'
              >
                <div className='flex items-center justify-between'>
                  <Skeleton width={60} height={20} />
                  <Skeleton circle width={16} height={16} />
                </div>
                <div className='mt-2.5'>
                  <Skeleton height={100} />
                </div>
                <div className='mt-2.5 flex items-center gap-x-2.5'>
                  <Skeleton width={80} height={20} />
                  <Skeleton width={80} height={20} />
                </div>
                <div className='mt-2.5 flex items-center gap-x-2.5'>
                  <Skeleton width={30} height={20} />
                  <Skeleton width={30} height={20} />
                </div>
              </div>
            ))}
          </div>
        </>
      )
    ) : (
      <>
        <div className='flex flex-col'>
          <div className='p-5 bg-white'>
            <div className='flex justify-between items-start gap-x-2'>
              <div className='flex items-center gap-x-2'>
                <Skeleton circle width={36} height={36} />
                <Skeleton width={100} height={20} />
              </div>
              <Skeleton width={60} height={20} />
            </div>
            <div className='mt-2.5'>
              <Skeleton height={60} />
            </div>
          </div>
        </div>
        <div className='flex'>
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className='py-4 border-b border-lineGray'
          >
            <div className='flex items-center justify-between'>
              <Skeleton width={60} height={20} />
              <Skeleton circle width={16} height={16} />
            </div>
            <div className='mt-2.5'>
              <Skeleton height={100} />
            </div>
            <div className='mt-2.5 flex items-center gap-x-2.5'>
              <Skeleton width={80} height={20} />
              <Skeleton width={80} height={20} />
            </div>
            <div className='mt-2.5 flex items-center gap-x-2.5'>
              <Skeleton width={30} height={20} />
              <Skeleton width={30} height={20} />
            </div>
          </div>
        ))}
      </>
    )
  );
}