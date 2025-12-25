/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0F94B9",
        secondary: "#114E81",
        purple: "#3B096E",
        magenta: "#A20870",
        orange: "#F0580E",
        dark: "#232D36",
        darker: "#0b0f14",
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #F0580E 0%, #A20870 28%, #3B096E 58%, #0F94B9 100%)',
        'deep-space': 'radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
