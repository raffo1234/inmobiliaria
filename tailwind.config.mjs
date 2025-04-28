/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      "inter-tight": ["Inter Tight Variable", "sans-serif"],
    },
    extend: {
      keyframes: {
        fadeOut: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
        slideUp: {
          "0%": {
            opacity: "0.5",
            transform: "translate(0, 30%)",
          },
          "50%": { opacity: 1 },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        fadeOut: "fadeOut 1s ease-in-out",
        slideUp: "slideUp .3s ease-in-out",
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
