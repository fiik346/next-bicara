import Navbar from './navbar'
import Footer from './footer'

export default function Layout ({children}) {
	return (
		<div className="text-gray-600">
			<Navbar />
			<main className="mx-auto px-4 lg:px-8 container">{children}</main>
			<Footer/>
		</div>
	)
}
