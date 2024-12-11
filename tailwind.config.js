/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'moving-border': {
          '0%': {
            'border-image-source': 'linear-gradient(45deg, #f06, #0ff)',
          },
          '50%': {
            'border-image-source': 'linear-gradient(45deg, #0ff, #f06)',
          },
          '100%': {
            'border-image-source': 'linear-gradient(45deg, #f06, #0ff)',
          },
        },
      },
      animation: {
        'moving-border': 'moving-border 2s linear infinite',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dracula", "winter"],
  },
};
