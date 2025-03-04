type CategoryTagProps = {
  categoryName: string,
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ categoryName }) => {
  return(
    <span className='font-noto font-normal text-white text-xs bg-mainBlue py-1 px-2.5 border border-mainBlue rounded-[60px]'>
      {categoryName}
    </span>
  );
}