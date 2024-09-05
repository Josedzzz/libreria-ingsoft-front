/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#131515",
        "custom-black": "#0A0B0B",
        "custom-gray": "#D6D6D6",
        "custom-dark-translucent": "rgba(19, 21, 21, 0.5)",
        "custom-white": "#F0F0F0",
        "custom-rose": "#B3A8AC",
        "custom-yellow": "#F3CC91",
        "pastel-pink": "#FFD1DC",
        "custom-blue": "#83A2C3",
        "pastel-black": "#555555",
        "pastel-button": "#FFB347",
      },
    },
  },
  plugins: [],
};
