type ToggleTextProps = {
  isToggle: boolean;
  setIsToggle: (value: boolean) => void;
}

// 3点リーダーの省略をON/OFfするための関数
export const toggleText = ({ isToggle, setIsToggle }: ToggleTextProps) => {
  setIsToggle(!isToggle);
}