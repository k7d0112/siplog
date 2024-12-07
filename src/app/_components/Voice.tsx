import Image from "next/image";

export const Voice = () => {
  return(
    <section className='mt-10'>
      <div className='mx-auto py-10 px-[30px] bg-mainBgGray'>
        <h2 className='sectionTitle'>毎日のコーヒーライフで<br/>こんなご希望は<br/>ありませんか？</h2>
        <div className='mt-14'>
          <div className='relative'>
            <p className='font-noto font-bold text-base text-mainBlack p-5 bg-white rounded-2xl border-2 border-mainBlack tracking-wider'>すでにコーヒーの記録はつけているけど少し物足りなさがある...</p>
            <div className='w-8 h-8 bg-white border-2 border-mainBlack rounded-full absolute top-[100px] left-[100px]'></div>
            <div className='w-5 h-5 bg-white border-2 border-mainBlack rounded-full absolute top-40 left-[85px]'></div>
            <Image
              src='/images/voice01.png'
              width={200}
              height={200}
              alt='男女が話し合っているイラスト'
              className='mt-[100px]'
            />
          </div>
          <div className='mt-5 relative'>
            <p className='font-noto font-bold text-base text-mainBlack p-5 bg-white rounded-2xl border-2 border-mainBlack tracking-wider'>コーヒー好きな人と情報交換をしたり他の人がどんなコーヒーを飲んでいるのか知りたい！</p>
            <div className='w-8 h-8 bg-white border-2 border-mainBlack rounded-full absolute top-32 right-[100px]'></div>
            <div className='w-5 h-5 bg-white border-2 border-mainBlack rounded-full absolute top-[198px] right-[85px]'></div>
            <Image
              src='/images/voice02.png'
              width={200}
              height={200}
              alt='男女が話し合っているイラスト'
              className='mt-[100px] ml-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
}