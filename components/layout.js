import Navbar from './navbar'
import Footer from './footer'

export default function Layout ({children}) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="container px-4 lg:px-8 mx-auto">{children}</main>
			<Footer/>
		</div>
	)
}
