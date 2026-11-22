// Tailwind through PostCSS: the standard setup, whose dev-server reloads pick up globals.css edits.
// (The Turbopack loader the template shipped served a stale globals.css until a restart.)
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
