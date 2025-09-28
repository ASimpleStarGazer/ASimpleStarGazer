/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px"
      }
    },
    extend: {
      colors: {
        background: "#040714",
        foreground: "#F4F6F8",
        primary: {
          DEFAULT: "#0B1E3D",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#6E4AFF",
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#FFD66B",
          foreground: "#0B1E3D"
        },
        muted: {
          DEFAULT: "rgba(15,28,50,0.6)",
          foreground: "#CBD5F5"
        },
        border: "rgba(64,83,118,0.4)",
        card: {
          DEFAULT: "rgba(12,22,40,0.85)",
          foreground: "#F5F7FD"
        }
      },
      backgroundImage: {
        "stars-gradient": "radial-gradient(circle at 20% 20%, rgba(110,74,255,0.35), transparent 60%), radial-gradient(circle at 80% 30%, rgba(255,214,107,0.25), transparent 55%), radial-gradient(circle at 50% 80%, rgba(29,72,190,0.45), transparent 60%)"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(4, 7, 20, 0.45)",
        ring: "0 0 0 1px rgba(110, 74, 255, 0.3)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
