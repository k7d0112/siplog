import { Accordion } from './_components/Accordion';

export default function Page() {
  return(
    <div className='p-5'>
      <h2 className='text-xl text-mainBlack font-noto font-bold inline-block relative accordionTitleBefore accordionTitleAfter ml-3'>よくある質問</h2>
      <p className='text-sm text-mainBlack font-noto font-normal tracking-wider leading-5 mt-3 p-4 bg-white rounded-lg shadow-md'>
        下記にユーザー様から頂いた質問で、かつ多くのユーザー様にも役に立ちそうなものをまとめました。<br/>
        アプリのご利用にあたり不明な点がある場合に、参考になればと思います。<br/>
        こちらを参照しても不明点が解決しない場合はお気軽に運営までご相談ください。
      </p>
      <div className='mt-5'>
        <Accordion/>
        <Accordion/>
      </div>
    </div>
  );
}