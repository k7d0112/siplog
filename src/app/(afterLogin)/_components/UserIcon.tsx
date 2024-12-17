import Image from "next/image";

export const UserIcon =  () => {
  return(
    <Image
      src='/images/man.png'
      alt='ユーザーアイコン'
      width={40}
      height={40}
      className='rounded-full bg-white'
    />
  );
}