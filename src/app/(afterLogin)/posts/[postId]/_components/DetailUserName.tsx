type DetailUserNameProps = {
  userName: string | null,
}

export const DetailUserName: React.FC<DetailUserNameProps> = ({userName}) => {
  return(
    <h1
      className='font-noto font-bold text-mainBlack text-base max-w-[300px] w-full'
    >
      {userName ? userName: '未設定ユーザー'}
    </h1>
  );
}