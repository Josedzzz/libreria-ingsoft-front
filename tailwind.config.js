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
        "custom-salmon": "#FF7E6B",
        "pastel-pink": "#FFD1DC",
        "pastel-blue": "#AEC6CF",
        "pastel-black": "#555555",
        "pastel-button": "#FFB347",
      },
    },
  },
  plugins: [],
};
