module.exports = {
  content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    {raw: '<div class="youtube"/>', extensions: 'html'}
  ],
  theme: {
    extend: {
			fontFamily: {
				"sans": "'Plus Jakarta Sans', ui-sans, sans-serif",
			}
		},
  },
  safelist: [
    'youtube'
  ],
  plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp')
	],
}
