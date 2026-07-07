/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Outfit', 'sans-serif'],
				display: ['"Archivo Black"', 'sans-serif'],
			},
			colors: {
				base: {
					950: '#050507',
					900: '#0A0A0F',
					800: '#12121A',
				},
				sand: {
					50: 'rgba(255,255,255,0.07)',
					100: 'rgba(255,255,255,0.05)',
					200: 'rgba(255,255,255,0.04)',
					300: 'rgba(255,255,255,0.10)',
					400: 'rgba(255,255,255,0.20)',
				},
				ink: {
					900: '#F4EFE7',
					700: '#CFC6B8',
					500: '#8E8471',
				},
				blue: {
					DEFAULT: '#D4A574',
					dark: '#C08F5D',
					deep: '#E3BE8F',
					soft: 'rgba(212,165,116,0.14)',
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
