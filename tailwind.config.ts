import type { Config } from "tailwindcss";

const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // googlefont'Jost'の追加
        jost: ['Jost', ...fontFamily.sans],
        // googlefont'Noto Sans JP'の追加
        noto: ['"Noto Sans JP"', ...fontFamily.sans],
      },
      colors: {
        mainBlue: '#1664C0',
        mainBlack: '#333',
        mainGray: '#B4B4B4',
        lineGray: 'D9D9D9',
        mainBgGray: '#EEEFF3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
export default config;
