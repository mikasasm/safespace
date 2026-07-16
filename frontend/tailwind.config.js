/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Names describe the role, not the hue, so swapping the palette again
        // means editing this block and src/theme.js and nothing else.
        page: '#F4F7FA',   // app background
        card: '#FFFFFF',   // raised surfaces: cards, modals, navbar, inputs
        ink: '#1B2A3A',    // headings and body copy
        muted: '#5A6B7C',  // secondary copy, placeholders
        accent: '#3A7CA5', // primary actions; always pairs with white text
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
