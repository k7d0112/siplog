import Image from "next/image";

export const MypageUserIcon = () => {
  return (
    <Image
      src='/images/man.png'
      alt="'ユーザーアイコン"
      width={80}
      height={80}
      className='rounded-full bg-white'
    />
  );
}