/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,css}",
    "./src/pages/**/*.{js,ts,jsx,tsx,css}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A1A2F",
        electric: "#1E90FF",
        teal: "#4FD1C5",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      animation: {
        glow: "glow 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(79, 209, 197, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(30, 144, 255, 0.4)" },
          "100%": { boxShadow: "0 0 10px rgba(79, 209, 197, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};

