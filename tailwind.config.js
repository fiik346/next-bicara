module.exports = {
  content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			fontFamily: {
				"sans": "'Plus Jakarta Sans', ui-sans, sans-serif",
			}
		},
  },
  plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp')
	],
}
