import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Jost, Noto_Sans_JP, Barlow } from 'next/font/google';
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
  title: "Sip Log",
  description: "Sip Logでコーヒー体験を記録してコーヒー好きとシェアしませんか？",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${jost.className} ${NotoSansJP.className} ${barlow.className} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
