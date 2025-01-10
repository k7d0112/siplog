// ログイン後のページレイアウト
import { Metadata } from "next";
import { Jost, Noto_Sans_JP, Barlow } from 'next/font/google';
import "@/app/globals.css";
import { NavBar } from "./_components/NavBar";

const jost = Jost({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
});

const NotoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: "Sip Log | アプリ内ページ",
  description: "Sip Logでコーヒー体験を記録してコーヒー好きとシェアしませんか？",
}

export default function AfterLoginLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return(
    <html lang="ja">
      <body
        className={`${jost.className} ${NotoSansJP.className} ${barlow.className} antialiased`}
        >
        <main className='bg-mainBgGray h-screen'>
          {children}
          <NavBar />
        </main>
      </body>
    </html>
  );
}