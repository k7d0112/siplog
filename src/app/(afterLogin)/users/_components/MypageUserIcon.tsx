import { UserIconProps } from "@/app/_types/User";
import Image from "next/image";
import { useGetImageUrl } from "@/app/_hooks/useGetImageUrl";

export const MypageUserIcon: React.FC<UserIconProps> = ({thumbnailImageKey}) => {
  // アイコン画像取得用のカスタムフック(useGetImageUrl())を呼び出してアイコン画像を取得
  const { imageUrl } = useGetImageUrl(thumbnailImageKey, 'userIcon_thumbnailUrl', '/images/man.png');

  return (
    <Image
      src={imageUrl}
      alt="'ユーザーアイコン"
      width={80}
      height={80}
      className='rounded-full bg-white aspect-square'
    />
  );
}