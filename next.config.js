/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	images: {
		domains: ['res.cloudinary.com', 'cdn.nurhidayat.web.id'],
	},
  async redirects() {
    return [
      {
        source: '/2020/09/distro-linux-dengan-tampilan-ui-ux-terbaik.html',
        destination: '/blog/distro-linux-dengan-tampilan-uiux-terbaik',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
