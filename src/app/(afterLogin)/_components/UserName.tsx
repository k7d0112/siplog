import { UserNameProps } from "@/app/_types/User";


export const UserName: React.FC<UserNameProps> = ({userName}) => {
  return(
    <h1
      className='font-noto font-bold text-mainBlack text-base max-w-[200px] w-full truncate'
    >
      {userName}
    </h1>
  );
}