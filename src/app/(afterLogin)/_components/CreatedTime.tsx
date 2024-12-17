import { ClassNameProps } from "@/app/_types/ClassName";

export const CreatedTime: React.FC<ClassNameProps> = ({ className }) => {
  return(
    <span className={`${className} font-noto font-bold text-xs text-mainBlack/50 w-[70px]`}>
      9/6 12:00
    </span>
  );
}