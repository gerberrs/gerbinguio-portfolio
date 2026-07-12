/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Archivo', 'sans-serif'],
				display: ['"Archivo Black"', 'sans-serif'],
				serif: ['"Bodoni Moda"', 'serif'],
			},
			colors: {
				// Tailwind's opacity-modifier pattern: rgb(var(--x) / <alpha-value>).
				// The CSS variables themselves are redefined per theme in index.css
				// (:root = light, .dark = dark), so every utility built from these
				// tokens is theme-reactive without per-component edits.
				white: 'rgb(var(--fg-tint) / <alpha-value>)',
				base: {
					950: 'rgb(var(--bg) / <alpha-value>)',
					900: 'rgb(var(--surface-1) / <alpha-value>)',
					800: 'rgb(var(--surface-2) / <alpha-value>)',
				},
				sand: {
					50: 'rgb(var(--fg-tint) / 0.07)',
					100: 'rgb(var(--fg-tint) / 0.05)',
					200: 'rgb(var(--fg-tint) / 0.04)',
					300: 'rgb(var(--fg-tint) / 0.10)',
					400: 'rgb(var(--fg-tint) / 0.20)',
				},
				ink: {
					900: 'rgb(var(--ink) / <alpha-value>)',
					700: 'rgb(var(--ink-muted) / <alpha-value>)',
					500: 'rgb(var(--ink-faint) / <alpha-value>)',
				},
				blue: {
					DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
					dark: 'rgb(var(--accent-dark) / <alpha-value>)',
					deep: 'rgb(var(--accent-deep) / <alpha-value>)',
					soft: 'rgb(var(--accent-soft) / 0.14)',
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
