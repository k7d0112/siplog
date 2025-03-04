// ページ毎にアイコンの色を変更する関数
export const GetIconClass = ( currentPath: string, linkPath: string[] ) => {
  if ( linkPath.includes(currentPath) ) {
    return 'fill-mainBlue w-7 h-7';
  } else {
    return 'fill-mainBlack w-7 h-7';
  }
}

// ページ毎に文字色の色を変更する編集
export const GetStringClass = ( currentPath: string, linkPath: string[] ) => {
  if ( linkPath.includes(currentPath) ) {
    return 'text-mainBlue text-[10px] font-noto font-normal';
  } else {
    return 'text-mainBlack text-[10px] font-noto font-normal';
  }
}
