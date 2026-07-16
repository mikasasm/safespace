/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The whole app is built from two colors plus one ink for text.
        // cream = every surface, sun = primary actions/accents, ink = all text.
        // Hairlines and muted text are ink at low opacity (e.g. ink/15, ink/70)
        // rather than new colors.
        cream: '#EBEBD3',
        sun: '#F4D35E',
        ink: '#1A1A12',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
