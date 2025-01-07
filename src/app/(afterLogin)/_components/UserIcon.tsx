import Image from "next/image";
import { UserIconProps } from "@/app/_types/User";
import { useGetImageUrl } from "@/app/_hooks/useGetImageUrl";

export const UserIcon: React.FC<UserIconProps> =  ({thumbnailImageKey}) => {
  // カスタムフックでアイコン画像をキーから取得
  const { imageUrl } = useGetImageUrl(thumbnailImageKey, 'userIcon_thumbnailUrl', '/images/man.png');

  return(
    <Image
      src={imageUrl}
      alt='ユーザーアイコン'
      width={40}
      height={40}
      className='rounded-full bg-white'
    />
  );
}