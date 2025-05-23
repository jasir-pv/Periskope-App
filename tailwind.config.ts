import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f0f0f5",
        foreground: "#111b21",
        primary:'#0008069',
        primaryLight: '#dcf8c6',
        secondary: "#e1e1e1",
        accent:'#25d366',
        muted: '#67717A',
        sidebar: "#FFFFFF",
        highlight: "#E9F5F2",
        danger: "#EA4335",
       
      },
    },
  },
  plugins: [],
} satisfies Config;
