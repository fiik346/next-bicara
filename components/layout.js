import Navbar from './navbar'
import Footer from './footer'

export default function Layout ({children}) {
	return (
		<>
			<Navbar />
			<main className="container px-4 lg:px-8 mx-auto">{children}</main>
			<Footer/>
		</>
	)
}
