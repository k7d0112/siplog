import Image from "next/image";
import { SigninButton } from "./Button";

export const FirstView = () => {
  return(
    <div className='pt-2.5 px-5 mx-auto'>
      <h2 className='font-noto font-bold text-mainBlack text-3xl leading-[46px]'>
        <span className='font-jost italic text-mainBlue text-[40px] pr-2'>Sip Log</span>で<br/>
        コーヒー体験を記録して<br/>
        コーヒー好きとシェアしませんか？
      </h2>
      <SigninButton className='block mx-auto mt-10'/>
      <Image
        src='/images/firstview.png'
        width={250}
        height={250}
        alt='ファーストビュー画像'
        className='mt-[50px] mx-auto'
      />
    </div>
  );
}