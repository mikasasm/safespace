// Single source of truth for the app's palette, for inline `style={{...}}` use.
// Tailwind classes (bg-cream, bg-sun, text-ink) come from tailwind.config.js and
// must stay in sync with this file.
//
// Two colors only, plus one ink so text is actually readable:
//   #EBEBD3 cream  - every surface (page and cards)
//   #F4D35E sun    - primary actions, accents, highlights
//   #1A1A12 ink    - all text
//
// Cards do not get their own fill; they sit on the cream page and are separated
// by an ink hairline. Anything that looks like a third color here is ink at
// reduced opacity, never a new hue.
export const C = {
  cream: '#EBEBD3',
  sun: '#F4D35E',
  ink: '#1A1A12',
  line: 'rgba(26,26,18,.14)',
  muted: 'rgba(26,26,18,.62)',
};

export default C;
