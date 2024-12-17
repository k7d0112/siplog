import { ClassNameProps } from "@/app/_types/ClassName";

export const TextArea: React.FC<ClassNameProps> = ({ className }) => {
  return(
    <div className={`${className} p-2 rounded bg-white mt-[10px] shadow-md relative before:content-[""] before:absolute before:left-[15px] before:-top-1 before:border-t-8 before:border-l-8 before:border-t-white before:border-l-transparent before:-rotate-45`}>
      <p className='font-noto font-normal text-sm text-mainBlack tracking-wider leading-7 line-clamp-3'>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </p>
    </div>
  );
}