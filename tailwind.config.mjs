/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      manrope: ["Manrope", "sans-serif"],
      cinzel: ["Cinzel Variable", "sans-serif"],
      "bebas-neue": ["Bebas Neue", "sans-serif"],
      lobster: ["Lobster", "sans-serif"],
      "nixie-one": ["Nixie One", "sans-serif"],
      inter: ["Inter Variable", "sans-serif"],
    },
    extend: {
      animation: {
        fadeOut: "fadeOut 1s ease-out forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn .4s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeInTranslate: "fadeInTranslate .4s",
      },
      keyframes: {
        fadeInTranslate: {
          "0%": { opacity: 0, transform: "translate(0, 20px)" },
          "100%": { opacity: 1, transform: "translate(0,0)" },
        },
      },
      colors: {
        yellow: {
          100: "#FEF8DD",
        },
        green: {
          800: "#004631",
        },
      },
    },
  },
  plugins: [],
};
