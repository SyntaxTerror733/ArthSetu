/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-card': 'var(--color-bg-card)',
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        danger: 'var(--color-danger)',
        success: 'var(--color-success)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
