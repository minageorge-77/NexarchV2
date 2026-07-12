

const config = {
  content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        ink: "#08160F",
        primary: "#0B733D",
        "primary-deep": "#04301E",
        "primary-container": "#0F5C31",
        "on-primary": "#FFFFFF",
        "on-primary-variant": "#BEE8CE",
        surface: "#F6F9F4",
        "surface-warm": "#FBFCF8",
        "surface-container": "#E9F0E3",
        "surface-container-low": "#EFF5EA",
        "surface-container-lowest": "#FFFFFF",
        "on-surface": "#101E16",
        "on-surface-variant": "#4A5B4E",
        outline: "#8B9A8F",
        "outline-variant": "#D6E2CE",
        lime: "#78C626",
        "lime-dark": "#5FA31C"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        lift: "0 20px 40px -18px rgba(4,48,30,0.35)",
        card: "0 8px 30px -12px rgba(8,22,15,0.15)"
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