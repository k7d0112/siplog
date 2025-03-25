type DetailTextAreaProps = {
  className?: string,
  content: string,
}

export const DetailTextArea: React.FC<DetailTextAreaProps> = ({ className, content }) => {
  return(
    <div className={`${className} p-2 rounded bg-white mt-[10px] shadow-md border border-mainBgGray relative before:content-[""] before:absolute before:left-[15px] before:-top-1 before:border-t-8 before:border-l-8 before:border-t-white before:border-l-transparent before:-rotate-45`}>
      <p className='font-noto font-normal text-sm text-mainBlack tracking-wider leading-7'>
        {content}
      </p>
    </div>
  );
}