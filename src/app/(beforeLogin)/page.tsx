import Image from "next/image";
import { FirstView } from "../_components/FirstView";
import { Voice } from "../_components/Voice"
import { BgSection } from "../_components/BgSection"
import { Content } from "../_components/Content";
import { Register } from "../_components/Register"
import { News } from "../_components/News";

export default function Home() {
  return (
    <main>
      <FirstView/>
      <Voice/>
      <BgSection/>
      <Content/>
      <News/>
      <Register/>
    </main>
  );
}
