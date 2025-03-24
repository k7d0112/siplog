import Link from 'next/link';
import { Accordion } from './_components/Accordion';
import { FaArrowRight } from "react-icons/fa";

export default function Page() {
  return(
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl text-mainBlack font-noto font-bold inline-block relative accordionTitleBefore accordionTitleAfter ml-3'>よくある質問</h2>
        <Link
          href='/questions/contact'
          className='flex items-center gap-x-1'
        >
          <span>お問い合わせ</span>
          <FaArrowRight size={20} className='fill-mainBlack' />
        </Link>
      </div>
      <p className='text-sm text-mainBlack font-noto font-normal tracking-wider leading-5 mt-3 p-4 bg-white rounded-lg shadow-md'>
        下記にユーザー様から頂いた質問で、かつ多くのユーザー様にも役に立ちそうなものをまとめました。<br/>
        アプリのご利用にあたり不明な点がある場合に、参考になればと思います。<br/>
        こちらを参照しても不明点が解決しない場合はお気軽に運営までご相談ください。
      </p>
      <div className='mt-5'>
        <Accordion/>
      </div>
    </div>
  );
}