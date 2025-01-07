import { IconType } from "react-icons";

// ユーザーマイページのタブに関する型
export type TabProps = {
  id: string;
  label: IconType;
  content: React.ReactElement;
}