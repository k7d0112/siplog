import { formatCreatedAt } from "@/app/_libs/day";
import { CreatedAtProps } from "../users/_types/CreatedAt";

export const CreatedTime: React.FC<CreatedAtProps> = ({ className, createdAt }) => {
  return(
    <span className={`${className} font-noto font-bold text-xs text-mainBlack/50 w-[70px]`}>
      {formatCreatedAt(createdAt)}
    </span>
  );
}