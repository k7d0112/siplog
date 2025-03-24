import Image from "next/image";

type Contents = {
  title: string,
  description: string,
  number: string,
  image: string,
  alt: string,
};

export const Content = () => {
  const contents: Contents[] = [
    {
      title: 'コーヒー体験の記録',
      description: `ハンドドリップやカフェの利用など自身のコーヒー体験を記録しましょう！<br/>
                  記録はフォーマットにしたっがて入力するだけ！<br/>
                  ハンドドリップなら豆の焙煎具合やグラム数、抽出温度、粒度、原産国を、カフェの利用ならどのカフェを利用したかを記録した内容をもとに自動でグラフに反映！<br/>
                  さらにコーヒー体験の記録によって毎月どれくらいコーヒーを淹れたかやどれだけカフェを利用したかもグラフに自動で反映！<br/>
                  自分の体験に基づいたグラフから自分の好みや趣向がわかりやすい！<br/>`,
      number: '01',
      image: '/images/mockup01.png',
      alt: 'ユーザーマイページ画面の画像',
    },
    {
      title: '一口(Sip)のコーヒー体験を<br/>シェアしよう！',
      description: `自身のコーヒー体験を他のユーザーをシェア！<br/>
                    他の人のコーヒー体験を見ることも可能！<br/>
                    コーヒー体験の投稿には👍ボタンから高評価をしたり💬ボタンからコメントも可能！<br/>
                    気になる投稿にコメントしてコーヒー体験を共有しよう！<br/>`,
      number: '02',
      image: '/images/mockup02.png',
      alt: '投稿一覧画面の画像',
    },
    // {
    //   title: 'メッセージ機能を使って<br/>さらなる情報共有を！',
    //   description: `気になる投稿をしたユーザーにメッセージを送ってさらに情報の共有をしよう！<br/>
    //                 過去の投稿も全て確認できます！<br/>
    //                 さらにサービスに関して何か質問や改善してほしいことがあればサービスの管理者にメッセージを送ることもできます！<br/>
    //                 わからないこと、聞きたいことがあればお気軽にメッセージを送りましょう！<br/>`,
    //   number: '03',
    //   image: '/images/mockup03.png',
    //   alt: 'メッセージ投稿画面',
    // },
  ];

  return(
    <section className='mt-10'>
      <div className='mx-auto px-5'>
        <h2 className='sectionTitle'>
          <span className='font-jost italic text-mainBlue font-bold pr-1'>Sip Log</span>でできること
        </h2>
        <div className='mt-[25px]'>
          {contents.map((content, index) => (
            <div className='mt-5' key={index}>
              <h3
              dangerouslySetInnerHTML={{__html: content.title}}
                className='font-jost font-bold text-mainBlue text-[28px]'
              />
              <div className='mt-2 relative'>
                <p
                  dangerouslySetInnerHTML={{ __html: content.description}}
                  className='pl-[30px] text-mainBlack font-noto font-normal text-base relative z-10 before:content-[""] before:w-5 before:h-[1px] before:bg-mainBlue before:absolute before:top-3 before:left-0'
                />
                <span className='font-barlow text-mainBlue/30 font-bold text-[200px] absolute -top-4 right-3 leading-none'>{content.number}</span>
              </div>
              <Image
                src={content.image}
                width={304}
                height={322}
                alt={content.alt}
                className='mt-2 mx-auto'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}