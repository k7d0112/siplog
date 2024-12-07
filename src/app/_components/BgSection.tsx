import Image from "next/image";

export const BgSection = () => {
  return(
    <div className='bg-[url("/images/bg-shop.jpg")] bg-cover bg-center bg-no-repeat'>
      <div className='py-10 px-5 bg-mainBgGray/50 '>
        <p className='text-center font-noto font-bold text-white text-3xl leading-relaxed'>
          そんなあなたは<br/>
          <span className='font-jost font-bold italic text-mainBlue text-4xl tracking-wider'>Sip Log</span><br/>
          を使ってみませんか？
        </p>
      </div>
    </div>
  );
}