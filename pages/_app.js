import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import '../styles/link.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
		<SessionProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	)
}

export default MyApp
