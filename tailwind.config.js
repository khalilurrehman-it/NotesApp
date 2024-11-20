/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)', // Main color (blue)
        secondary: 'var(--secondary-color)', // Secondary color (lighter blue)
        background: 'var(--background-color)', // Background color (white/black)
        textPrimary: 'var(--text-primary)', // Main text color (black/white)
        textSecondary: 'var(--text-secondary)', // Secondary text color (gray/white)
        border: 'var(--border-color)', // Border color (gray)
        buttonHover: 'var(--button-hover)', // Hover color for buttons (dark gray)

        // Additional colors
        blue: '#1E40AF', // Blue (for bg-blue-600, etc.)
        black: '#000000', // Black (for dark text, backgrounds, etc.)
        white: '#FFFFFF', // White (for light backgrounds, text, etc.)
        red: '#EF4444', // Red (for error states, buttons, etc.)
      },
    },
  },
  plugins: [],
}
