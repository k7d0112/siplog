'use client'
import { useState } from 'react';
import { TabProps } from '../_types/TabProps';
import { MdPostAdd } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { MypagePosts } from './MypagePosts';
import { MypageReports } from './MypageReports';


export const TabComponent: React.FC = () => {
  const tabs: TabProps[] = [
    {
      id: 'myPosts',
      label: MdPostAdd,
      content: <MypagePosts/>
    },
    {
      id: 'myReports',
      label: BiSolidReport,
      content: <MypageReports/>
    }
  ];

  const [activeTab, setIsActiveTab] = useState(tabs[0].id);

  return(
    <div className='flex flex-col h-hull'>
      {/* タブメニュー */}
      <div className='flex h-10 sticky top-0 z-10'>
        {tabs.map((tab) => {
          const Icon = tab.label;
          return(
            <button
              key={tab.id}
              onClick={() => setIsActiveTab(tab.id)}
              className={`flex-1 text-center py-2 ${
                activeTab === tab.id
                ? 'bg-mainBgGray border-t border-lineGray'
                : 'bg-mainBlack'
              }`}
            >
              <Icon size={25} className={`m-auto ${
                activeTab === tab.id
                ? 'fill-mainBlue'
                : 'fill-white'
              }`} />
            </button>
          );
        })}
      </div>

      {/* コンテンツ */}
      <div className='px-3 flex-1'>
      {/* overflow-y-scroll */}
        {tabs.map((tab) =>
          activeTab === tab.id && (
            <div key={tab.id}>
              {tab.content}
            </div>
          )
        )}
      </div>
    </div>
  );
}