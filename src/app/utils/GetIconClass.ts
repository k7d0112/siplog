// ページ毎にアイコンの色を変更する関数
export const GetIconClass = ( currentPath: string, linkPath: string[] ) => {
  if ( linkPath.includes(currentPath) ) {
    return 'fill-mainBlue w-8 h-8';
  } else {
    return 'fill-mainBlack w-8 h-8';
  }
}
