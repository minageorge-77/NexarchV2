

const config = {
  content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        graphite: "#14171a",
        cloud: "#8a9299",
        lightgray: "#ced1cd",
        white: "#ffffff"
      },
      fontFamily: {
        sans: ['"Archivo"', "sans-serif"],
        display: ['"Archivo Expanded"', "sans-serif"],
        mono: ['"Archivo"', "sans-serif"]
      },
      boxShadow: {
        lift: "0 20px 40px -18px rgba(20, 23, 26, 0.15)",
        card: "0 8px 30px -12px rgba(20, 23, 26, 0.08)"
      },
      transitionDelay: {
        "100": "100ms", "150": "150ms", "200": "200ms", "300": "300ms",
        "400": "400ms", "500": "500ms", "600": "600ms", "700": "700ms"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        cueBounce: {
          "0%,100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(8px)", opacity: "1" }
        }
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        cueBounce: "cueBounce 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;