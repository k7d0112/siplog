// import Link from "next/link";
// import { CreatedTime } from "../_components/CreatedTime";
// import { UserIcon } from "../_components/UserIcon";
// import { UserName } from "../_components/UserName";

// export default function Page() {
//   return(
//     <>
//       {/* ページタイトル */}
//       <h1 className='mt-5 mr-5 ml-9 text-xl text-mainBlack font-noto font-bold inline-block relative accordionTitleBefore accordionTitleAfter'>メッセージ一覧</h1>
//       {/* メッセージを送ったユーザーを一覧表示 */}
//       <div className='mt-3'>
//         {/* ユーザー毎のチャット画面に移動 */}
//         <Link
//           href='messages/user1'
//           className='border-b border-mainGray py-3 px-5 flex justify-between items-center gap-2'
//         >
//           <div className='flex items-start gap-2 max-w-[250px]'>
//             <UserIcon/>
//             <div>
//               <UserName/>
//               <p className='font-noto font-normal text-xs text-mainGray max-w-[200px] truncate'>テキストテキストテキストテキストテキストテキストテキストテキスト</p>
//             </div>
//           </div>
//           <CreatedTime className=''/>
//         </Link>
//       </div>
//     </>
//   );
// }