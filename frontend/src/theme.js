// Single source of truth for the palette, for inline `style={{...}}` use.
// Tailwind classes (bg-page, bg-card, text-ink, text-muted, bg-accent) come
// from tailwind.config.js and must stay in sync with this file.
//
//   #F4F7FA page   - app background
//   #FFFFFF card   - raised surfaces: cards, modals, navbar, inputs
//   #1B2A3A ink    - headings and body copy
//   #5A6B7C muted  - secondary copy, placeholders
//   #3A7CA5 accent - primary actions
//
// White text on accent is 4.56:1, which passes AA. Do not put accent text on
// page or card: at 3.4:1 it fails for body copy.
export const C = {
  page: '#F4F7FA',
  card: '#FFFFFF',
  ink: '#1B2A3A',
  muted: '#5A6B7C',
  accent: '#3A7CA5',
  line: 'rgba(27,42,58,.12)',
};

export default C;
