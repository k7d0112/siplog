export default function NotFound() {
  return(
    <div className='relative bg-white w-[840px] -mt-10 mx-auto py-40 px-20 rounded'>
      <dl>
        <dt className='text-4xl text-center font-bold mb-6'>ページが見つかりませんでした</dt>
        <dd className='text-base text-center'>
          あなたがアクセスしようとしたページは存在しません。
          <br/>
          URLを再度ご確認ください。
        </dd>
      </dl>
    </div>
  );
}