/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1", // Indigo
          dark: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#8b5cf6", // Purple
          dark: "#7c3aed",
        },
        accent: {
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
        background: {
          light: "#f9fafb",
          dark: "#0f172a",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
