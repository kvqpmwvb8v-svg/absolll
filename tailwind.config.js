/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        // Deep dark palette - editorial style
        bg: {
          primary: "#0a0a0f",
          secondary: "#12121a",
          tertiary: "#1a1a24",
        },
        // Green accents - deep, editorial
        green: {
          primary: "#0f766e",
          secondary: "#1a8c7c",
          mute: "#6b9b95",
        },
        text: {
          primary: "#e8e8f0",
          muted: "#737383",
          subtle: "#5a5a6e",
        },
        // Border and subtle elements
        border: "#2a2a3a",
        "border-light": "#3a3a4a",
        // Background gradients hints (very subtle)
        accent: "#0f766e",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Large expressive typography per brief
        "display-1": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "display-3": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.4", letterSpacing: "0em" }],
        body: ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      borderRadius: {
        // Minimal rounding per brief
        none: "0",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.5rem",
      },
      transitionProperty: {
        // Delicate transitions per brief
        DEFAULT: "color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
        subtle: "color 0.3s ease, background-color 0.3s ease",
      },
      boxShadow: {
        // Subtle shadows per editorial style
        soft: "0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
        none: "none",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

module.exports = config;
